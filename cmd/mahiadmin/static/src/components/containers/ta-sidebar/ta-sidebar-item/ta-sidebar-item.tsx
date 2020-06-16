import {Component, h, Host, Prop} from '@stencil/core';

export type TaSidebarItemIcon = 'home' | 'applications' | 'users' | 'settings'

@Component({
  tag: 'ta-sidebar-item',
  styleUrl: 'ta-sidebar-item.css',
  shadow: true
})
export class TaSidebarItem {
  @Prop() to: string;
  @Prop() icon: TaSidebarItemIcon;

  private handleClickLink = () => {
    window.document.body.removeAttribute('style')
  }

  render() {
    return (
      <Host>
        <stencil-route-link url={this.to} exact activeClass="link-active" onClick={this.handleClickLink}>
          <div class="ta-sidebar-item">
            <div class="icon">
              <ta-icon icon={this.icon}/>
            </div>
            <slot/>
          </div>
        </stencil-route-link>
      </Host>

    );
  }
}
