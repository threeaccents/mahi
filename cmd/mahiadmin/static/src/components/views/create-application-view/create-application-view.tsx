import {Component, ComponentInterface, h, Host, Prop, State} from '@stencil/core';
import {RouterHistory} from '@stencil/router';
import {initialNewApplicationModel, NewApplicationModel} from '../../../models/application';
import ApplicationService, {ApplicationResponse, CreateApplicationRequest} from '../../../api/application';
import {ApiError} from '../../../api/base';
import toastr from '../../../libs/toastr';
import {TaMultiSelectOption} from '../../elements/ta-multi-select/interface';
import {AWSRegions, DoRegions, WasabiRegions} from '../../../models/storage';

interface FormError {
    nameErr: string;
    deliveryUrlErr: string;
    storageSecretKeyErr: string;
    storageRegionErr: string;
    storageAccessKeyErr: string;
    error: string;
}

const initialFormErr: FormError = {
    nameErr: '',
    storageSecretKeyErr: '',
    storageAccessKeyErr: '',
    storageRegionErr: '',
    deliveryUrlErr: '',
    error: '',
}

@Component({
    tag: 'create-application-view',
    styleUrl: 'create-application-view.css',
    shadow: true,
})
export class CreateApplicationView implements ComponentInterface {
    @State() newApplication: NewApplicationModel = initialNewApplicationModel;
    @State() formErr: FormError = initialFormErr;
    @State() creatingApplication: boolean = false;
    @State() spaceUsersOptions: TaMultiSelectOption[] = [];

    @Prop() history: RouterHistory;

    private onSubmit = (e: UIEvent) => {
        e.preventDefault();

        this.validate()
            .then(this.createApplication)
            .catch(this.handleValidationErrors)
    }

    private handleValidationErrors = (errs: FormError) => {
        this.formErr = errs;
    }

    private createApplication = () => {
        this.creatingApplication = true;

        const payload: CreateApplicationRequest = this.newApplication;

        ApplicationService()
            .create(payload)
            .then(this.onCreateApplicationSuccess)
            .catch(this.handleError)
            .finally(() => this.creatingApplication = false)
    }


    private onCreateApplicationSuccess = (resp: ApplicationResponse) => {
        toastr().success('Application was created!');
        this.resetForm()
        this.history.push(`/applications/${resp.data.id}`)
    }

    // add better error handling per use case
    private handleError = (err: ApiError) => {
        if (!err.error) {
            this.formErr.error = 'Oops! Something went wrong. Please refresh and try again';
            return console.log(err);
        }

        const msg = err.error
        if (msg.includes('application name is taken')) {
            this.formErr = {...this.formErr, nameErr: 'Application name is taken'}
            return;
        }

        if (msg.includes('connection')) {
            this.formErr.error = 'Error with connection. Please double check your credentials are correct';
            return console.log(err);
        }
        toastr().danger(msg)
    }

    private validate = (): Promise<void> => {
        const {newApplication} = this;
        let errors: FormError = {} as FormError;
        if (newApplication.name === '') {
            errors = {...errors, nameErr: 'Name is required'};
        }
        if (newApplication.deliveryUrl === '') {
            errors = {...errors, deliveryUrlErr: 'CDN url is required'};
        }
        if (newApplication.storageAccessKey === '') {
            errors = {...errors, storageAccessKeyErr: 'Access key is required'};
        }
        if (newApplication.storageSecretKey === '') {
            errors = {...errors, storageSecretKeyErr: 'Secret key is required'};
        }
        if (newApplication.storageEngine !== 'b2' && newApplication.storageRegion === '') {
            errors = {...errors, storageRegionErr: 'Bucket region is required'};
        }
        return Object.keys(errors).length === 0 ? Promise.resolve() : Promise.reject(errors);
    }

    private updateNewApplication = (key: string, value: string | boolean | string[]) => {
        this.formErr = initialFormErr;
        this.newApplication = {...this.newApplication, [key]: value}
    }

    private handleClose = () => {
        const pathname = this.history.location.pathname
        this.resetForm()
        this.history.push(pathname)
    }

    private resetForm = () => {
        this.newApplication = initialNewApplicationModel;
        this.formErr = initialFormErr
    }

    private getStorageRegions() {
        switch (this.newApplication.storageEngine) {
            case 'digital_ocean':
                return DoRegions
            case 's3':
                return AWSRegions
            case 'wasabi':
                return WasabiRegions
            default:
                return []
        }
    }

    private getCustomFormFields = () => {
        const {newApplication, formErr} = this;
        const {storageRegionErr, storageSecretKeyErr, storageAccessKeyErr} = formErr;
        return (
            <span>
        <custom-storage-engine-input
            value={newApplication.storageEngine}
            onTaSelect={(e: CustomEvent) => this.updateNewApplication('storageEngine', e.detail)}
        />
                <span>
            <ta-input
                value={newApplication.storageAccessKey}
                label="API Access Key"
                onTaInput={(e: CustomEvent) => this.updateNewApplication('storageAccessKey', e.detail)}
                error={storageAccessKeyErr}
            />
            <ta-input
                type="password"
                value={newApplication.storageSecretKey}
                label="API Secret Key"
                onTaInput={(e: CustomEvent) => this.updateNewApplication('storageSecretKey', e.detail)}
                error={storageSecretKeyErr}
            />
                    {newApplication.storageEngine !== 'b2' ?
                        <ta-select
                            value={newApplication.storageRegion}
                            onTaSelect={(e: CustomEvent) => this.updateNewApplication('storageRegion', e.detail)}
                            placeholder="Select Bucket Region"
                            error={storageRegionErr}>
                            {this.getStorageRegions().map((item) => (
                                <ta-select-option value={item} label={item.toUpperCase()}></ta-select-option>
                            ))}
                        </ta-select>
                        : null}
          </span>
      </span>
        )
    }


    render() {
        const {newApplication, formErr} = this;
        const {nameErr, error, deliveryUrlErr} = formErr;
        return (
            <Host>
                <div class="header">
                    <div class="close-icon" onClick={this.handleClose}>
                        <ta-icon icon="close"/>
                    </div>
                </div>
                <ta-form onTaSubmit={(e: CustomEvent) => this.onSubmit((e as any))}>
                    <label>Create Application</label>
                    <ta-input
                        value={newApplication.name}
                        label="Application Name"
                        onTaInput={(e: CustomEvent) => this.updateNewApplication('name', e.detail)}
                        error={nameErr}
                    />
                    <ta-input
                        value={newApplication.deliveryUrl}
                        label="CDN Url"
                        onTaInput={(e: CustomEvent) => this.updateNewApplication('deliveryUrl', e.detail)}
                        error={deliveryUrlErr}
                    />
                    <ta-textarea
                        value={newApplication.description}
                        label="Description"
                        onTaInput={(e: CustomEvent) => this.updateNewApplication('description', e.detail)}
                    />
                    <label>Storage Details</label>
                    {this.getCustomFormFields()}
                    <ta-error error={error}/>
                    <ta-button
                        loading={this.creatingApplication}
                        onTaClick={(e: CustomEvent) => this.onSubmit((e as any))}>
                        Create Application
                    </ta-button>
                    <ta-button
                        color="white"
                        onTaClick={this.handleClose}>
                        Cancel
                    </ta-button>
                </ta-form>
            </Host>
        );
    }

}