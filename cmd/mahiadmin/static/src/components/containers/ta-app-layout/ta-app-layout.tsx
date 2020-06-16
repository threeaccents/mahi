import { Component, h, State } from '@stencil/core';

@Component({
  tag: 'ta-app-layout',
  styleUrl: 'ta-app-layout.css',
  shadow: true
})
export class AppLayout {
  @State() drawerOpen: boolean = false;

  private toggleDrawer = () => {
    this.drawerOpen = !this.drawerOpen
    window.document.body.removeAttribute('style')
    if (!this.drawerOpen) return
    window.document.body.style.overflowY = 'hidden';
  }

  render() {
    return (
      <div class="ta-app-layout-container">
        <ta-nav-drawer open={this.drawerOpen} />
        <div class="app-sidebar">
          <ta-sidebar />
        </div>
        <div class="app-topbar">
          <ta-topbar onTaHamburgerClicked={this.toggleDrawer} />
        </div>
        <div class="app-body">
          <slot />
        </div>
      </div>
    );
  }
}
