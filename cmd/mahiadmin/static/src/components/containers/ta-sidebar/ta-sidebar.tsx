import { Component, h, State, Prop, Element } from '@stencil/core';
import AuthService from '../../../api/auth';
import { me } from '../../../util';
import { RouterHistory, injectHistory } from '@stencil/router';

@Component({
  tag: 'ta-sidebar',
  styleUrl: 'ta-sidebar.css',
  shadow: true
})
export class TaSidebar {
  me = me();

  @Element()
  $el: HTMLElement;

  @State() amountDue: number = parseFloat(localStorage.getItem('amountDue')) || 0;
  @State() isMenuShown: boolean = false;

  @Prop() history: RouterHistory;

  private handleOverlayRendered = (e: CustomEvent) => {
    this.isMenuShown = e.detail
  }

  private logout = () => {
    AuthService()
      .logout();
  }

  private get adminMenu() {
    const createNewMenu = (
      <div class="menu-content-wrapper">
        <span class="menu-item" onClick={() => this.history.push('#createApplication')}>
          New Application
          <ta-icon icon="add" />
        </span>
        <span class="menu-item" onClick={() => this.history.push('#createUser')}>
          New User
          <ta-icon icon="add" />
        </span>
      </div>
    )

    return (
      <span>
        <div class="add-btn">
          <ta-dropdown overlay={createNewMenu} onTaOverlayRendered={this.handleOverlayRendered}>
            <ta-button>
              <div class="add-btn-label">
                Create New
                <div class={{
                  'add-icon': true,
                  'active': this.isMenuShown,
                }}>
                  <ta-icon icon="add" />
                </div>
              </div>
            </ta-button>
          </ta-dropdown>
        </div>
        <div class="links">
          <ta-sidebar-item class="first" icon="home" to="/dashboard">Dashboard</ta-sidebar-item>
          <ta-sidebar-item icon="applications" to="/applications">My Applications</ta-sidebar-item>
          <ta-sidebar-item icon="users" to="/users">Users</ta-sidebar-item>
          <ta-sidebar-item icon="settings" to="/settings">Settings</ta-sidebar-item>
        </div>
      </span>
    )
  }

  private get userMenu() {
    return (
      <span>
        <div class="links">
          <ta-sidebar-item icon="applications" to="/applications">My Applications</ta-sidebar-item>
          <ta-sidebar-item icon="settings" to="/settings">Settings</ta-sidebar-item>
        </div>
      </span>
    )
  }
  render() {
    return (
      <div class="ta-sidebar-container">
        <div class="ta-sidebar-wrapper">
          <div class="sidebar-top">
            <div class="logo">
              <ta-icon icon='logo' />
            </div>
            {this.me.isAdmin ? this.adminMenu : this.userMenu}
          </div>
          <div class="sidebar-bottom">
            {this.me.isAdmin ?
              <div class="usage-stat">
                <div class="usage-amount">
                  <span class="usage-title">Usage:</span> ${this.amountDue.toFixed(2)}
                </div>
              </div>
              : null}
            <ta-button
              color="grey"
              onTaClick={this.logout}>Logout
            </ta-button>
          </div>
        </div>
      </div>
    );
  }
}

injectHistory(TaSidebar);
