import { Component, ComponentInterface, h, Host, Prop, State, Watch } from '@stencil/core';
import { injectHistory, RouterHistory } from '@stencil/router';
import { me } from '../../../util';

@Component({
  tag: 'ta-drawers',
  styleUrl: 'ta-drawers.css',
  shadow: true,
})
export class TaDrawers implements ComponentInterface {
  me = me();

  @Prop() history: RouterHistory;

  @State() showDrawer: boolean = false;
  @State() component: string = '';

  @Prop() routeId!: number; // kinda hacky/genius way to tell if a route changed but it works muahaha ...lol

  @Watch('routeId')
  handleRouteIdChanged() {
    const hash = window.location.hash
    this.displayDrawer(hash)
  }

  private displayDrawer(hash: string) {
    this.showDrawer = false;

    switch (hash) {
      case '#createApplication':
        this.component = 'create-application-view'
        break
      case '#createUser':
        this.component = 'create-user-view'
        break
      case '#editUser':
        this.component = 'edit-user-view'
        break
      case '#editApplication':
        this.component = 'edit-application-view'
        break
      default:
        this.component = ''
    }

    if (this.component !== '') this.showDrawer = true
  }


  render() {
    const Component = this.component
    return (
      <Host>
        <ta-drawer open={this.showDrawer}>
          {Component !== '' ? <Component history={this.history} /> : null}
        </ta-drawer>
      </Host>
    );
  }
}

injectHistory(TaDrawers)
