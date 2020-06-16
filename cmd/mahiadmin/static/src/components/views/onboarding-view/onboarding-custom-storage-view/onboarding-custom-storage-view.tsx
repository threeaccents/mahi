import {Component, h, Prop, State} from '@stencil/core';
import {AWSRegions, DoRegions, WasabiRegions} from '../../../../models/storage'
import toastr from '../../../../libs/toastr';
import StorageService, {TestStorageRequest} from '../../../../api/storage';
import {ApiError} from '../../../../api/base';
import {RouterHistory} from '@stencil/router';
import SpaceService, {SetSpaceStorageRequest} from '../../../../api/space';

interface FormError {
  storageSecretKeyErr: string;
  storageBucketErr: string;
  storageRegionErr: string;
  storageAccessKeyErr: string;
  error: string;
}

const initialFormErr: FormError = {
  storageSecretKeyErr: '',
  storageBucketErr: '',
  storageAccessKeyErr: '',
  storageRegionErr: '',
  error: '',
}

const initialTestStorageReq: TestStorageRequest = {
  storageEngine: null,
  storageSecretKey: '',
  storageBucket: '',
  storageRegion: '',
  storageAccessKey: '',
}

@Component({
  tag: 'onboarding-custom-storage-view',
  styleUrl: 'onboarding-custom-storage-view.css',
  shadow: true
})
export class OnboardingCustomStorageView {
  @State() testStorageReq: TestStorageRequest = initialTestStorageReq;
  @State() storageConnectionSuccess: boolean = false;
  @State() formErr: FormError = initialFormErr;
  @State() testingConnection: boolean = false;
  @State() settingStorage: boolean = false;
  @State() hasVerifiedConnection: boolean = false;

  @Prop() history: RouterHistory;

  private updateTestStorageReq = (key: string, value: string | boolean | string[]) => {
    this.formErr = initialFormErr;
    this.testStorageReq = {...this.testStorageReq, [key]: value}
  }

  private onSubmit = (e: UIEvent) => {
    e.preventDefault();

    const apiAction = this.hasVerifiedConnection ?
      this.setStorage : this.testConnection

    this.validate()
      .then(apiAction)
      .catch(this.handleValidationErrors)
  }

  private handleValidationErrors = (errs: FormError) => {
    this.formErr = errs;
  }

  private setStorage = () => {
    this.settingStorage = true;

    const payload: SetSpaceStorageRequest = this.testStorageReq;

    SpaceService()
      .setStorage(payload)
      .then(this.onSetStorageSuccess)
      .catch(this.handleError)
      .finally(() => this.settingStorage = false)
  }

  private onSetStorageSuccess = () => {
    this.history.push(`/dashboard`)
    toastr().success('Welcome to Oriio!');
  }

  private testConnection = () => {
    this.testingConnection = true;

    StorageService()
      .testStorage(this.testStorageReq)
      .then(this.onTestStorageSuccess)
      .catch(this.handleError)
      .finally(() => this.testingConnection = false)
  }

  private handleError = (err: ApiError) => {
    if (!err.error) {
      this.formErr.error = 'Oops! Something went wrong. Please refresh and try again';
      return console.log(err);
    }
    const msg = err.error

    if (msg.includes('could not upload file')) {
      this.formErr.error = 'Error with connection. Please double check your credentials are correct';
      return console.log(err);
    }
    this.formErr.error = msg
  }

  private onTestStorageSuccess = () => {
    this.history.push(`/onboarding/congratulations`)
    toastr().success('Connection is verified!');
  }

  private validate = (): Promise<void> => {
    const {testStorageReq} = this;
    const isNotDefaultEngine = testStorageReq.storageEngine !== 'oriio';
    let errors: FormError = {} as FormError;
    if (isNotDefaultEngine) {
      if (testStorageReq.storageAccessKey === '') {
        errors = {...errors, storageAccessKeyErr: 'Access key is required'};
      }
      if (testStorageReq.storageSecretKey === '') {
        errors = {...errors, storageSecretKeyErr: 'Secret key is required'};
      }
      if (testStorageReq.storageBucket === '') {
        errors = {...errors, storageBucketErr: 'Bucket name is required'};
      }
      if (testStorageReq.storageEngine !== 'b2' && testStorageReq.storageRegion === '') {
        errors = {...errors, storageRegionErr: 'Bucket region is required'};
      }
    }
    return Object.keys(errors).length === 0 ? Promise.resolve() : Promise.reject(errors);
  }

  private getStorageRegions() {
    switch (this.testStorageReq.storageEngine) {
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

  private getStorageDetailsForm() {
    const {testStorageReq, formErr} = this;
    const {storageAccessKeyErr, storageSecretKeyErr, storageBucketErr, storageRegionErr} = formErr;
    if (!testStorageReq.storageEngine) return
    return (
      <span>
                <ta-input
                  value={testStorageReq.storageAccessKey}
                  label="API Access Key"
                  onTaInput={(e: CustomEvent) => this.updateTestStorageReq('storageAccessKey', e.detail)}
                  error={storageAccessKeyErr}
                />
                <ta-input
                  type="password"

                  value={testStorageReq.storageSecretKey}
                  label="API Secret Key"
                  onTaInput={(e: CustomEvent) => this.updateTestStorageReq('storageSecretKey', e.detail)}
                  error={storageSecretKeyErr}
                />
                <ta-input
                  value={testStorageReq.storageBucket}
                  label="Bucket Name"
                  onTaInput={(e: CustomEvent) => this.updateTestStorageReq('storageBucket', e.detail)}
                  error={storageBucketErr}
                />
        {testStorageReq.storageEngine !== 'b2' ?
          <ta-select
            value={testStorageReq.storageRegion}
            onTaSelect={(e: CustomEvent) => this.updateTestStorageReq('storageRegion', e.detail)}
            placeholder="Select Bucket Region"
            error={storageRegionErr}>
            {this.getStorageRegions().map((item) => (
              <ta-select-option value={item} label={item.toUpperCase()}></ta-select-option>
            ))}
          </ta-select>
          : null}
            </span>
    )
  }

  render() {
    return (
      <onboarding-container>
        <onboarding-left-side
          mainTitle="Thank you for joining!"
          subTitle="Please complete the onboarding process to get started."/>
        <onboarding-right-side
          mainTitle="Storage Settings"
          description="If you need help please check the documentation of your chosen storage, to get details on how to fill out the required field.">
          <div class="onboarding-custom-storage-form">
            <custom-storage-engine-input
              exceptions={['oriio']}
              value={this.testStorageReq.storageEngine}
              onTaSelect={(e: CustomEvent) => this.updateTestStorageReq('storageEngine', e.detail)}
            />
            {this.getStorageDetailsForm()}
            {!!this.testStorageReq.storageEngine ?
              <div>
                <ta-error error={this.formErr.error}/>
                <ta-button
                  loading={this.testingConnection}
                  onTaClick={(e: CustomEvent) => this.onSubmit((e as any))}>
                  {this.hasVerifiedConnection ? 'Set Storage' : 'Test Connection'}
                </ta-button>
              </div>
              : null
            }
          </div>
        </onboarding-right-side>
      </onboarding-container>
    );
  }
}
