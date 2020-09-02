import { Component, ComponentInterface, h, Host, Prop } from '@stencil/core';
import { ApplicationModel } from '../../../../models/application'

@Component({
  tag: 'application-details-sidebar',
  styleUrl: 'application-details-sidebar.css',
  shadow: true,
})
export class ApplicationDetailsSidebar implements ComponentInterface {
  @Prop() application!: ApplicationModel;

  render() {
    return (
      <Host>
        <ta-app-page>
          <div class="header">
            <div class="title">Details</div>
            <ta-icon icon="settings" />
          </div>
          {/*<div class="metrics">*/}
          {/*  <div class="metric-item">*/}
          {/*    <div class="label">Storage</div>*/}
          {/*    <div class="value">{formatBytes(application.storage)}</div>*/}
          {/*  </div>*/}
          {/*  <div class="metric-item">*/}
          {/*    <div class="label">File Count</div>*/}
          {/*    <div class="value">{application.fileCount}</div>*/}
          {/*  </div>*/}
          {/*</div>*/}
        </ta-app-page>
      </Host>
    );
  }

}
