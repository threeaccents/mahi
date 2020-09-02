import { Component, ComponentInterface, Host, h, State, Prop, Event, EventEmitter } from '@stencil/core';
import { TaMultiSelectOption } from '../../elements/ta-multi-select/interface';
import { RouterHistory } from '@stencil/router';
import UserService, { UsersResponse } from '../../../api/user';
import { UserModel } from '../../../models/user';
import toastr from '../../../libs/toastr';
import { ApiError } from '../../../api/base';
import ApplicationService, { ApplicationResponse, UpdateApplicationRequest } from '../../../api/application';
import { UpdateApplicationModel } from '../../../models/application';

interface FormError {
  name: string;
  error: string;
}

const initialFormErr: FormError = {
  name: '',
  error: '',
}

@Component({
  tag: 'edit-application-view',
  styleUrl: 'edit-application-view.css',
  shadow: true,
})
export class EditApplicationView implements ComponentInterface {
  @State() fetchingApplication: boolean = false;
  @State() application: UpdateApplicationModel = null;
  @State() fetchingUsers: boolean = true;
  @State() spaceUsersOptions: TaMultiSelectOption[] = [];
  @State() formErr: FormError = initialFormErr;
  @State() updatingApplication: boolean = false;

  @Prop() history: RouterHistory;

  @Event() taApplicationWasUpdated: EventEmitter;

  applicationId = this.history.location.query.applicationId
  initialApplication: UpdateApplicationModel;

  componentWillLoad() {
    this.loadUsers()
    this.getApplicationState()
  }

  private getApplicationState = () => {
    const { state } = this.history.location

    if (!state || !state.application) return this.fetchApplication()

    const { name, description, users } = state.application

    this.application = {
      name,
      description,
      userIds: users.map(u => u.id),
    }
    this.initialApplication = this.application
  }

  private fetchApplication = () => {
    this.fetchingApplication = true

    ApplicationService()
      .get(this.applicationId)
      .then(this.onFetchApplicationSuccess)
      .catch(this.handleError)
      .finally(() => this.fetchingApplication = false)
  }

  private onFetchApplicationSuccess = (resp: ApplicationResponse) => {
    const app = resp.data
    const { name, description } = app
    this.application = {
      name,
      description
    }
    this.initialApplication = this.application
  }

  private loadUsers = () => {
    UserService().listSpaceUsers()
      .then(this.onListSpaceUserSuccess)
      .catch(this.handleError)
      .finally(() => this.fetchingUsers = false);
  }

  private onListSpaceUserSuccess = (resp: UsersResponse) => {
    const options = resp.data.map((u: UserModel) => {
      return { text: `${u.firstName} ${u.lastName}`, value: u.id };
    })
    this.spaceUsersOptions = options;
  }

  private handleError = (err: ApiError) => {
    if (!err.error) {
      toastr().danger('Oops! Something went wrong. Please refresh and try again')
      return console.log(err);
    }
    this.formErr = { ...this.formErr, error: err.error }
  }

  private validate = (): Promise<void> => {
    const { application } = this;
    let errors: FormError = {} as FormError;
    if (application.name === '') {
      errors = { ...errors, name: 'Name is required' };
    }
    return Object.keys(errors).length === 0 ? Promise.resolve() : Promise.reject(errors);
  }

  private get hasNoFieldUpdates(): boolean {
    return JSON.stringify(this.initialApplication) === JSON.stringify(this.application)
  }

  private onSubmit = (e: UIEvent) => {
    e.preventDefault();

    this.validate()
      .then(this.updateApplication)
      .catch(this.handleValidationErrors)
  }

  private handleValidationErrors = (errs: FormError) => {
    this.formErr = errs;
  }

  private updateApplication = () => {
    this.updatingApplication = true;

    const payload: UpdateApplicationRequest = this.application

    ApplicationService()
      .update(this.applicationId, payload)
      .then(this.onUpdateApplicationSuccess)
      .catch(this.handleError)
      .finally(() => this.updatingApplication = false)
  }

  private onUpdateApplicationSuccess = (resp: ApplicationResponse) => {
    toastr().success('Application was updated!');
    this.taApplicationWasUpdated.emit(resp.data)
    this.handleClose()
  }

  private handleClose = () => {
    const pathname = this.history.location.pathname
    this.history.push(pathname)
  }

  private updateApplicationField = (key: string, value: string | string[]) => {
    this.formErr = initialFormErr;
    this.application = { ...this.application, [key]: value }
  }

  private getUsersField = () => {
    const { fetchingUsers, spaceUsersOptions, application } = this;
    if (spaceUsersOptions.length === 0) return
    return (
      <ta-multi-select
        loading={fetchingUsers}
        label="Add Users"
        value={application.userIds}
        options={spaceUsersOptions}
        onTaSelect={(e: CustomEvent) => this.updateApplicationField('userIds', e.detail)}
      />
    )
  }


  render() {
    const { application, formErr } = this;
    const { name, error } = formErr;
    if (this.fetchingApplication) return <ta-loader />
    return (
      <Host>
        <div class="header">
          <div class="close-icon" onClick={this.handleClose}>
            <ta-icon icon="close" />
          </div>
        </div>
        <ta-form onTaSubmit={(e: CustomEvent) => this.onSubmit((e as any))}>
          <label>Edit Application</label>
          <ta-input
            value={application.name}
            label="Application Name"
            onTaInput={(e: CustomEvent) => this.updateApplicationField('name', e.detail)}
            error={name}
          />
          <ta-textarea
            value={application.description}
            label="Description"
            onTaInput={(e: CustomEvent) => this.updateApplicationField('description', e.detail)}
          />
          {this.getUsersField()}
          <ta-error error={error} />
          <ta-button
            disabled={this.hasNoFieldUpdates}
            loading={this.updatingApplication}
            onTaClick={(e: CustomEvent) => this.onSubmit((e as any))}>
            Save
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
