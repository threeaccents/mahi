import {Component, h, Host, State} from '@stencil/core';
import {initialUsagesModel, UsagesModel} from "../../../models/usage";
import {UserModel} from '../../../models/user';
import UsageService, {UsagesResponse} from '../../../api/usage'
import {byteToGB, me} from '../../../util';
import {ApiError} from '../../../api/base';
import toastr from '../../../libs/toastr';
import dayjs from 'dayjs'

export type DateRangeType = 'day' | 'week' | 'month' | 'year'

@Component({
  tag: 'dashboard-view',
  styleUrl: 'dashboard-view.css'
})
export class DashboardView {
  me: UserModel = me()

  @State() usages: UsagesModel = initialUsagesModel;
  @State() fetchingApi: boolean = false;
  @State() reFetchingUsages: boolean = false;
  @State() dateRange: DateRangeType = 'month'
  @State() totalDue: number = 0;

  componentWillLoad() {
    this.fetchUsages()
  }

  private fetchUsages = () => {
    this.fetchingApi = true
    UsageService()
      .listUsages()
      .then(this.handleSuccess)
      .catch(this.handleError)
      .finally(() => this.fetchingApi = false)
  }

  private handleSuccess = (resp: UsagesResponse) => {
    this.usages = resp.data
  }

  // I'm reusing this same handle error for many parts of the app
  // maybe I extract this into its own thing.
  private handleError = (err: ApiError) => {
    if (!err.error) {
      toastr().danger('Oops! Something went wrong. Please refresh and try again');
      return console.log(err);
    }

    toastr().danger(err.error)
  }

  private updateDateRange = (dateRange: DateRangeType) => {
    this.dateRange = dateRange;
    this.reFetchingUsages = true

    let start_time = ''
    switch (dateRange) {
      case 'day':
        start_time = dayjs().subtract(24, 'hour').unix().toString()
        break
      case 'week':
        start_time = dayjs().startOf('week').unix().toString()
        break
      case 'month':
        start_time = dayjs().startOf('month').unix().toString()
        break
      case 'year':
        start_time = dayjs().startOf('year').unix().toString()
        break
    }

    UsageService()
      .listUsages({
        start_time,
      })
      .then(this.handleSuccess)
      .catch(this.handleError)
      .finally(() => this.reFetchingUsages = false)
  }

  private metricLabels = () => {
    const {metrics} = this.usages
    return metrics.map((metric) => dayjs(metric.endTime).format('YYYY-MM-DD'))
  }

  private metricDatasets = () => {
    const {metrics} = this.usages

    // const transformationsData = {
    //     name: 'Transformations',
    //     values: metrics.map((m) => m.transformations)
    // }

    const bandwidthData = {
      name: 'Bandwidth(GB)',
      values: metrics.map((m) => byteToGB(m.bandwidth))
    }

    const storageData = {
      name: 'Storage(GB)',
      values: metrics.map((m) => byteToGB(m.storage))
    }

    return [bandwidthData, storageData]
  }


  render() {
    const {totals} = this.usages
    return (
      <Host>
        <ta-app-page>
          <ta-page-header pageTitle="Dashboard">
            <div slot="right">
              <div class="page-action-wrapper">
                <div class={{
                  'page-actions': true,
                  'loading': this.reFetchingUsages
                }}>
                  <div
                    onClick={() => this.updateDateRange('day')}
                    class={{
                      'action-item': true,
                      'selected': this.dateRange === 'day'
                    }}>Day
                  </div>
                  <div
                    onClick={() => this.updateDateRange('week')}
                    class={{
                      'action-item': true,
                      'selected': this.dateRange === 'week'
                    }}>Week
                  </div>
                  <div
                    onClick={() => this.updateDateRange('month')}
                    class={{
                      'action-item': true,
                      'selected': this.dateRange === 'month'
                    }}>Month
                  </div>
                  <div
                    onClick={() => this.updateDateRange('year')}
                    class={{
                      'action-item': true,
                      'selected': this.dateRange === 'year'
                    }}>Year
                  </div>
                </div>
              </div>
            </div>
          </ta-page-header>
          {this.fetchingApi
            ?
            <ta-loader/>
            :
            <div>
              <div class="stats-wrapper">
                <ta-stat-card icon="storage-disks" label="Total Storage" value={`${byteToGB(totals.storage)}GB`}/>
                <ta-stat-card icon="dashboard" label="Total Bandwidth" value={`${byteToGB(totals.bandwidth)}GB`}/>
                <ta-stat-card icon="transformations" label="Transformations" value={`${totals.transformations}`}/>
              </div>
              <ta-card>
                <div>Usage</div>
                <ta-line-graph
                  labels={this.metricLabels()}
                  datasets={this.metricDatasets()}/>
              </ta-card>
              <ta-recent-applications-list/>
            </div>
          }
        </ta-app-page>
      </Host>
    );
  }
}
