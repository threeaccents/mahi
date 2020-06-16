import {Component, ComponentInterface, h, Host, State} from '@stencil/core';
import {ApplicationModel} from '../../../models/application';
import ApplicationService, {ApplicationsResponse} from '../../../api/application';
import {ApiError} from '../../../api/base';
import toastr from '../../../libs/toastr';

@Component({
  tag: 'ta-recent-applications-list',
  styleUrl: 'ta-recent-applications-list.css',
  shadow: true,
})
export class TaRecentApplicationsList implements ComponentInterface {
  @State() fetchingApi: boolean = false;
  @State() applications: ApplicationModel[] = [];

  componentWillLoad() {
    this.getApplications();
  }

  private getApplications = () => {
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

  private showApplications() {
    if (this.fetchingApi) return <ta-loader/>

    return (
      <div class="application-list-wrapper">
        {this.applications.slice(0, 4).map((p) => (
          <ta-application-card application={p}/>
        ))}
      </div>
    )
  }


  render() {
    return (
      <Host>
        <div class="title">
          <div class="title-text">Recent Applications</div>
          <div class="title-action">
            <stencil-route-link url="/applications">
              <ta-button small color="dark-grey">View All</ta-button>
            </stencil-route-link>
          </div>
        </div>
        <div class="applications-list">
          {this.showApplications()}
        </div>
      </Host>
    );
  }

}
