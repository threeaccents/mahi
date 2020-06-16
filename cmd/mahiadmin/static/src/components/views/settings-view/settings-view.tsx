import { Component, ComponentInterface, h, Host, Prop, State } from '@stencil/core';
import { RouterHistory } from "@stencil/router";

export type SettingsTab = 'personal' | 'space' | 'billing' | 'application';

@Component({
  tag: 'settings-view',
  styleUrl: 'settings-view.css',
  shadow: true,
})
export class SettingsView implements ComponentInterface {
  @State() selectedTab: SettingsTab = 'personal'

  @Prop() history: RouterHistory;

  componentWillLoad() {
    this.checkRoute()
  }

  private checkRoute = () => {
    const location = this.history.location;
    switch (location.hash) {
      case '#personal':
        this.selectedTab = 'personal'
        break;
      case '#space':
        this.selectedTab = 'space'
        break;
      case '#billing':
        this.selectedTab = 'billing'
        break;
      default:
        this.selectedTab = 'personal';
    }
  }

  private handleTabChange = (e: CustomEvent) => {
    const tab = e.detail
    this.history.push(`/settings#${tab}`)
  }


  render() {
    return (
      <Host>
        <ta-app-page>
          <ta-page-header pageTitle="Settings" />
          <ta-tabs
            onTaChange={this.handleTabChange}
            initialValue={this.selectedTab}>
            <ta-tab-header-bar>
              <ta-tab-header tab="personal">Personal</ta-tab-header>
              <ta-tab-header tab="space">Space</ta-tab-header>
              <ta-tab-header tab="billing">Billing</ta-tab-header>
            </ta-tab-header-bar>

            <div class={"settings-tab-wrapper"}>
              <ta-tab-body tab="personal">
                <personal-setting-view />
              </ta-tab-body>
              <ta-tab-body tab="space">
                <space-setting-view />
              </ta-tab-body>
              <ta-tab-body tab="billing">
                <billing-setting-view />
              </ta-tab-body>
            </div>
          </ta-tabs>
        </ta-app-page>
      </Host>
    );
  }

}
