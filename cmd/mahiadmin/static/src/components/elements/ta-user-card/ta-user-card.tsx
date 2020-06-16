import { Component, ComponentInterface, Event, EventEmitter, h, Host, Prop, State } from '@stencil/core';
import { UserModel } from '../../../models/user';
import { limitLen } from '../../../util';
import { injectHistory, RouterHistory } from '@stencil/router';
import UserService from '../../../api/user';
import { ApiError } from '../../../api/base';
import toastr from '../../../libs/toastr';

@Component({
  tag: 'ta-user-card',
  styleUrl: 'ta-user-card.css',
  shadow: true,
})
export class TaUserCard implements ComponentInterface {
  dropdownEl: HTMLTaDropdownElement;

  @State() displayConfirmModal: boolean = false;
  @State() deletingUser: boolean = false;
  @State() isMenuShown: boolean = false;

  @Prop() user: UserModel;
  @Prop() create: boolean = false;
  @Prop() history: RouterHistory;

  @Event() taUserWasDeleted: EventEmitter;

  private get fullName(): string {
    const { firstName, lastName } = this.user;
    const fullName = `${firstName} ${lastName}`
    return limitLen(fullName, 25)
  }

  private get initials() {
    const { firstName, lastName } = this.user;
    return `${firstName[0]}${lastName[0]}`
  }

  private handleEditUser = () => {
    this.dropdownEl.close();
    this.history.push(`?userId=${this.user.id}#editUser`, { user: this.user });
  }

  private getEditMenu = () => {
    return (
      <div class="edit-menu">
        <div class="edit-menu-item" onClick={this.handleEditUser}>
          Edit user
        </div>
        <div class="edit-menu-item" onClick={this.handleDeleteUser}>
          Remove user
        </div>
      </div>
    )
  }

  private handleDeleteUser = () => {
    this.toggleConfirmModal()
  }

  private toggleConfirmModal = () => {
    this.displayConfirmModal = !this.displayConfirmModal
  }

  private deleteUser = () => {
    UserService()
      .deleteUser(this.user.id)
      .then(this.onSuccess)
      .catch(this.onError)
      .finally(() => this.deletingUser = false)
  }

  private onSuccess = () => {
    toastr().success('User was deleted')
    this.toggleConfirmModal()
    this.taUserWasDeleted.emit(this.user.id)
  }

  private onError = (err: ApiError) => {
    if (err.error) {
      return toastr().danger(err.error)
    }
    toastr().danger('User failed to delete')
  }

  private handleOverlayRendered = (e: CustomEvent) => {
    this.isMenuShown = e.detail
  }

  private get confirmDeleteModal() {
    return (
      <ta-modal
        titleText={`Delete ${this.fullName}`}
        bodyText="Are you sure you want to delete this user?"
        confirmBtnText="Delete"
        display={this.displayConfirmModal}
        onTaClose={this.toggleConfirmModal}
        onTaSubmit={this.deleteUser}
        loading={this.deletingUser}
      />
    )
  }

  render() {
    if (this.create) {
      return (
        <Host class={{
          'create': true
        }}>
          <div class="card-wrapper">
            <div class="card-top">
              <ta-icon class="add-person-icon" icon="add-person" />
            </div>
            <div class="card-bottom">
              <div class="card-title">
                Create New User
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
        <div class="card-wrapper">
          <div class="card-top">
            <ta-avatar text={this.initials} />
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
          <div class="card-bottom">
            <div class="card-title">
              {this.fullName}
            </div>
            <div class="card-subtitle">
              {this.user.isAdmin ? 'Administrator' : 'User'}
            </div>
          </div>
        </div>
        {this.confirmDeleteModal}
      </Host>
    );
  }
}

injectHistory(TaUserCard)
