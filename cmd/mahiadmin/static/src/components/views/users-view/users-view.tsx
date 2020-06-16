import { Component, ComponentInterface, h, Host, Listen, Prop, State } from '@stencil/core';
import { RouterHistory } from '@stencil/router';
import toastr from '../../../libs/toastr';
import { ApiError } from '../../../api/base';
import { UserModel } from '../../../models/user';
import UserService, { UsersResponse } from '../../../api/user';

const usersViewTypeKey = 'usersViewType'

export type UserViewType = 'list' | 'card'

@Component({
  tag: 'users-view',
  styleUrl: 'users-view.css',
  shadow: true,
})
export class UsersView implements ComponentInterface {
  @State() users: UserModel[] = [];
  @State() fetchingApi: boolean = false;
  @State() userView: UserViewType = (localStorage.getItem(usersViewTypeKey) as UserViewType) || 'card';

  @Prop() history: RouterHistory

  @Listen('taUserWasCreated', { target: 'window' })
  listenUserWasCreated(e: CustomEvent) {
    this.users = [e.detail, ...this.users];
  }

  @Listen('taUserWasUpdated', { target: 'window' })
  listenUserWasUpdated(e: CustomEvent) {
    const newUsersValue = this.users.map(u => {
      if (u.id !== e.detail.id) return u
      return e.detail
    })
    this.users = newUsersValue
  }

  @Listen('taUserWasDeleted', { target: 'window' })
  listenUserWasDeleted(e: CustomEvent) {
    this.users = this.users.filter(u => u.id !== e.detail)
  }

  componentWillLoad() {
    this.loadUsers()
  }

  private loadUsers = () => {
    this.fetchingApi = true

    UserService()
      .listSpaceUsers()
      .then(this.handleSuccess)
      .catch(this.handleError)
      .finally(() => this.fetchingApi = false)
  }

  private handleSuccess = (resp: UsersResponse) => {
    this.users = resp.data
  }

  private handleError = (err: ApiError) => {

    if (!err.error) {
      toastr().danger('Oops! Something went wrong. Please refresh and try again');
      return console.log(err);
    }

    toastr().danger(err.error)
  }

  private updateUserView = (type: UserViewType) => {
    this.userView = type;
    localStorage.setItem(usersViewTypeKey, type)
  }

  render() {
    const pathname = this.history.location.pathname;
    return (
      <Host>
        <ta-app-page>
          <ta-page-header pageTitle="Users">
            <div slot="right">
              <div class="page-actions">
                <ta-icon
                  onClick={() => this.updateUserView('card')}
                  class={{ 'selected': this.userView === 'card' }}
                  icon='card'
                />
                <ta-icon
                  icon='list'
                  onClick={() => this.updateUserView('list')}
                  class={{ 'selected': this.userView === 'list' }}
                />
              </div>
            </div>
          </ta-page-header>
          {this.fetchingApi ? <ta-loader /> :
            <div class={{
              'users-wrapper': true,
              'full-width': this.userView === 'list'
            }}>
              <stencil-route-link url={`${pathname}#createUser`}>
                {this.userView === 'card' ? <ta-user-card create /> : <ta-user-list-card create />}
              </stencil-route-link>
              {this.users.map((u) => (
                this.userView === 'card' ? <ta-user-card user={u} /> : <ta-user-list-card user={u} />
              ))}
            </div>
          }
        </ta-app-page>
      </Host>
    );
  }

}
