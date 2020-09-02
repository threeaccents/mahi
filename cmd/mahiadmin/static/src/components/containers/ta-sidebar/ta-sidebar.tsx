import {Component, Element, h, Prop, State} from '@stencil/core';
import {me} from '../../../util';
import {injectHistory, RouterHistory} from '@stencil/router';

@Component({
    tag: 'ta-sidebar',
    styleUrl: 'ta-sidebar.css',
    shadow: true
})
export class TaSidebar {
    me = me();

    @Element()
    $el: HTMLElement;

    @State() isMenuShown: boolean = false;

    @Prop() history: RouterHistory;

    private handleOverlayRendered = (e: CustomEvent) => {
        this.isMenuShown = e.detail
    }

    private get userMenu() {
        const createNewMenu = (
            <div class="menu-content-wrapper">
                <span class="menu-item" onClick={() => this.history.push('#createApplication')}>
                  New Application
                  <ta-icon icon="add"/>
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
                  <ta-icon icon="add"/>
                </div>
              </div>
            </ta-button>
          </ta-dropdown>
        </div>
        <div class="links">
          <ta-sidebar-item class="first" icon="home" to="/dashboard">Dashboard</ta-sidebar-item>
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
                            Mahi
                        </div>
                        {this.userMenu}
                    </div>
                    <div class="sidebar-bottom">

                    </div>
                </div>
            </div>
        );
    }
}

injectHistory(TaSidebar);
