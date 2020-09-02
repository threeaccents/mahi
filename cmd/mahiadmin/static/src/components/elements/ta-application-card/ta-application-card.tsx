import { Component, ComponentInterface, h, Host, Prop, Event, EventEmitter, State } from '@stencil/core';
import { ApplicationModel } from '../../../models/application'
import ApplicationService from '../../../api/application';
import toastr from '../../../libs/toastr';
import { ApiError } from '../../../api/base';
import { RouterHistory, injectHistory } from '@stencil/router';

@Component({
  tag: 'ta-application-card',
  styleUrl: 'ta-application-card.css',
  shadow: true,
})
class TaApplicationCard implements ComponentInterface {
  dropdownEl: HTMLTaDropdownElement;

  @State() deletingApplication: boolean = false;
  @State() displayConfirmModal: boolean = false;
  @State() verifyDeleteText: string = '';
  @State() isMenuShown: boolean = false;

  @Prop() application: ApplicationModel;
  @Prop() create: boolean = false;
  @Prop() history: RouterHistory;

  @Event() taApplicationWasDeleted: EventEmitter;

  private name = (): string => {
    const { name } = this.application

    return name.length <= 25 ? name : `${name.substr(0, 22)}...`
  }

  private getEditMenu = () => {
    return (
      <div class="edit-menu">
        <div class="edit-menu-item" onClick={this.handleEditApplication}>
          Edit application
        </div>
        <div class="edit-menu-item" onClick={this.handleDeleteApplication}>
          Remove application
        </div>
      </div>
    )
  }

  private handleEditApplication = () => {
      this.dropdownEl.close();
      this.history.push(`?applicationId=${this.application.id}#editApplication`, { application: this.application });
  }

  private handleDeleteApplication = () => {
    this.toggleConfirmModal()
  }

  private toggleConfirmModal = () => {
    this.verifyDeleteText = ''
    this.displayConfirmModal = !this.displayConfirmModal
  }

  private deleteApplication = () => {
    this.deletingApplication = true
    ApplicationService()
      .delete(this.application.id)
      .then(this.onSuccess)
      .catch(this.onError)
      .finally(() => this.deletingApplication = false)
  }

  private onSuccess = () => {
    toastr().success('Application was deleted')
    this.toggleConfirmModal()
    this.taApplicationWasDeleted.emit(this.application.id)
  }

  private onError = (err: ApiError) => {
    if (err.error) {
      return toastr().danger(err.error)
    }
    toastr().danger('Application failed to delete')
  }

  private handleInputChange = (e: CustomEvent) => {
    this.verifyDeleteText = e.detail;
  }

  private get confirmDeleteModal() {
    const isBtnDisabled = (this.verifyDeleteText !== this.application.name) || this.deletingApplication;
    return (
      <ta-modal
        useDefaultFooter={false}
        titleText="Are you absolutely sure?"
        display={this.displayConfirmModal}
        onTaClose={this.toggleConfirmModal}>
        <div class="confirm-delete-content-wrapper">
          <p class="confirm-description">This action cannot be undone. This will permanently delete the <strong>{this.application.name}</strong> application, and remove all files associated with it.<br/><br/>
          Please type <strong>{this.application.name}</strong> to confirm.</p>
          <ta-input 
            label="Application Name"
            onTaInput={this.handleInputChange} 
            type="text" 
            value={this.verifyDeleteText} />
          <ta-button
            disabled={isBtnDisabled}
            onTaClick={this.deleteApplication}
            loading={this.deletingApplication}>
            I understand the consequences, delete this application
            </ta-button>
        </div>
      </ta-modal>
    )
  }

  private handleOverlayRendered = (e: CustomEvent) => {
    this.isMenuShown = e.detail
  }

  render() {
    if (this.create) {
      return (
        <Host class={{
          'create': true
        }}>
          <div class="card-wrapper">
            <div class="card-top">
              <ta-icon icon="add-folder" />
            </div>
            <div class="card-bottom">
              <div class="card-title">
                Create New Application
              </div>
              <div class="card-subtitle">
                <div class="subtitle-block" />
              </div>
            </div>
          </div>
        </Host>
      )
    }

    return (
      <Host>
        <stencil-route-link url={`/applications/${this.application.id}`}>
          <div class="card-wrapper">
            <div class="card-top">
              <div class="icons">
                <ta-icon icon="folder" />
                <ta-dropdown
                    onTaOverlayRendered={this.handleOverlayRendered}
                    ref={(el) => this.dropdownEl = el}
                    overlay={this.getEditMenu()}>
                  <div class={{
                    "vertical-dots-icon": true,
                    "active": this.isMenuShown,
                  }}>
                    <ta-icon icon="vertical-dots" />
                  </div>
                </ta-dropdown>
              </div>
            </div>
            <div class="card-bottom">
              <div class="card-title">
                {this.name()}
              </div>
              <div class="card-subtitle">
                {this.application.storageEngine} - {this.application.deliveryUrl}
              </div>
            </div>
          </div>
        </stencil-route-link>
        {this.confirmDeleteModal}
      </Host>
    );
  }
}

injectHistory(TaApplicationCard)

