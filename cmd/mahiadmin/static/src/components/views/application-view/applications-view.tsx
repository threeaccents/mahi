import {Component, ComponentInterface, h, Host, Listen, Prop, State} from '@stencil/core';
import {RouterHistory} from '@stencil/router';
import {ApplicationModel} from '../../../models/application';
import ApplicationService, {ApplicationsResponse} from '../../../api/application';
import toastr from '../../../libs/toastr';
import {ApiError} from '../../../api/base';

const applicationViewTypeKey = 'applicationViewType'

export type ApplicationViewType = 'list' | 'card'

@Component({
  tag: 'applications-view',
  styleUrl: 'applications-view.css',
  shadow: true,
})
export class ApplicationsView implements ComponentInterface {
  @State() applications: ApplicationModel[] = [];
  @State() fetchingApi: boolean = false;
  @State() applicationView: ApplicationViewType = (localStorage.getItem(applicationViewTypeKey) as ApplicationViewType) || 'card';

  @Prop() history: RouterHistory

  @Listen('taApplicationWasUpdated', { target: 'window' })
  listenApplicationWasUpdated(e: CustomEvent) {
    this.applications = this.applications.map(a => {
      if (a.id !== e.detail.id) return a
      return e.detail
    })
  }

  @Listen('taApplicationWasDeleted', { target: 'window' })
  listenApplicationWasDeleted(e: CustomEvent) {
    this.applications = this.applications.filter(a => a.id !== e.detail)
  }

  componentWillLoad() {
    this.loadApplications()
  }

  private loadApplications = () => {
    this.fetchingApi = true

    ApplicationService()
      .list()
      .then(this.handleSuccess)
      .catch(this.handleError)
      .finally(() => this.fetchingApi = false)
  }

  private handleSuccess = (resp: ApplicationsResponse) => {
    this.applications = resp.data
  }

  private handleError = (err: ApiError) => {
    if (!err.error) {
      toastr().danger('Oops! Something went wrong. Please refresh and try again');
      return console.log(err);
    }

    toastr().danger(err.error)
  }

  private updateApplicationView = (type: ApplicationViewType) => {
    this.applicationView = type;
    localStorage.setItem(applicationViewTypeKey, type)
  }

  render() {
    const pathname = this.history.location.pathname;

    return (
      <Host>
        <ta-app-page>
          <ta-page-header pageTitle="My Applications">
            <div slot="right">
              <div class="page-actions">
                <ta-icon
                  onClick={() => this.updateApplicationView('card')}
                  class={{ 'selected': this.applicationView === 'card' }}
                  icon='card'
                />
                <ta-icon
                  icon='list'
                  onClick={() => this.updateApplicationView('list')}
                  class={{ 'selected': this.applicationView === 'list' }}
                />
              </div>
            </div>
          </ta-page-header>
          {this.fetchingApi ? <ta-loader /> :
            <div class={{
              'applications-wrapper': true,
              'full-width': this.applicationView === 'list'
            }}>
              <stencil-route-link url={`${pathname}#createApplication`}>
                {this.applicationView === 'card' ? <ta-application-card create /> : <ta-application-list-card create />}
              </stencil-route-link>
              {this.applications.map((p) => (
                this.applicationView === 'card' ? <ta-application-card application={p} /> :
                  <ta-application-list-card application={p} />
              ))}
            </div>
          }
        </ta-app-page>
      </Host>
    );
  }

}
