import { Component, ComponentInterface, Event, EventEmitter, h, Host, Prop, State } from '@stencil/core';
import { UserModel } from '../../../models/user'
import UserService from '../../../api/user';
import { ApiError } from '../../../api/base';
import toastr from '../../../libs/toastr';
import { injectHistory, RouterHistory } from '@stencil/router';

@Component({
  tag: 'ta-user-list-card',
  styleUrl: 'ta-user-list-card.css',
  shadow: true,
})
export class TaUserListCard implements ComponentInterface {
  dropdownEl: HTMLTaDropdownElement;

  @State() displayConfirmModal: boolean = false;
  @State() deletingUser: boolean = false;
  @State() isMenuShown: boolean = false;

  @Prop() user: UserModel;
  @Prop() create: boolean = false;
  @Prop() history: RouterHistory;

  @Event() taUserWasDeleted: EventEmitter;

  private get fullName(): string {
    const { firstName, lastName } = this.user
    const fullName = `${firstName} ${lastName}`;
    return fullName.length <= 25 ? fullName : `${fullName.substr(0, 22)}...`
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


  private handleEditUser = () => {
    this.dropdownEl.close();
    this.history.push(`?userId=${this.user.id}#editUser`, { user: this.user });
  }

  private handleDeleteUser = () => {
    this.toggleConfirmModal()
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
          <div class="wrapper">
            <div class="left-side">
              <div class="icon">
                <ta-icon icon="add-person" />
              </div>
              <div class="name">Create User</div>
            </div>
            <div class="right-side">
              <div class="avatars">
              </div>
              <div class="action-icon plus">
                <ta-icon icon="add" />
              </div>
            </div>
          </div>
        </Host>
      )
    }

    return (
      <Host>
        <div class="wrapper">
          <div class="left-side">
            <div class="avatar">
              <ta-avatar text={this.fullName} />
            </div>
            <div class="name">{this.fullName}</div>
            <div class="admin">{this.user.isAdmin ? 'Administrator' : ''}</div>
          </div>
          <div class="right-side">
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
        {this.confirmDeleteModal}
      </Host>
    );
  }

}

injectHistory(TaUserListCard)
