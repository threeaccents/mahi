import {Component, h, Prop} from '@stencil/core';
import AuthService from '../../../api/auth';

@Component({
    tag: 'ta-nav-drawer',
    styleUrl: 'ta-nav-drawer.css'
})
export class TaNavDrawer {
    @Prop() open!: boolean;

    private logout = () => {
        AuthService()
            .logout();
    }


    private get userMenu() {
        return (
            <span>
          <ta-sidebar-item class="first" icon="home" to="/dashboard">Dashboard</ta-sidebar-item>
        <ta-sidebar-item icon="applications" to="/applications">My Applications</ta-sidebar-item>
        <ta-sidebar-item icon="settings" to="/settings">Settings</ta-sidebar-item>
      </span>
        )
    }

    render() {
        return (
            <div class={{
                'ta-nav-drawer-component': true,
                'open': this.open
            }}>
                <div class="drawer-container">
                    {this.userMenu}
                    <ta-button
                        color="grey"
                        onTaClick={this.logout}>Logout
                    </ta-button>
                </div>
            </div>
        );
    }
}
