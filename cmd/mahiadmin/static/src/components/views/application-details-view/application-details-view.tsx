import { Component, h, Host, Prop, State, Listen } from '@stencil/core';
import { ApplicationModel } from '../../../models/application';
import ApplicationService, { ApplicationResponse } from '../../../api/application';
import FileService, { FilesResponse } from '../../../api/file';
import { MatchResults, RouterHistory } from '@stencil/router';
import { ApiError } from '../../../api/base';
import toastr from '../../../libs/toastr';
import { FileModel } from '../../../models/file';
import { debounce } from '../../../util';


@Component({
  tag: 'application-details-view',
  styleUrl: 'application-details-view.css'
})
export class ApplicationDetailsView {
  initialFiles: FileModel[] = [];

  isMobile: boolean = window.innerWidth < 768;

  @State() application: ApplicationModel;
  @State() files: FileModel[] = [];
  @State() fetchingApi: boolean = false;
  @State() searchQuery: string = '';

  @Prop() history: RouterHistory;
  @Prop() match: MatchResults;

  @Listen('taFileWasDeleted', { target: 'window' })
  listenFileWasDeleted(e: CustomEvent) {
    const deletedFile: FileModel = e.detail

    this.files = this.files.filter(f => f.id !== deletedFile.id)
  }

  componentWillLoad() {
    this.fetchApplication()
  }

  private fetchApplication = () => {
    this.fetchingApi = true
    ApplicationService()
      .get(this.match.params.slug)
      .then(this.handleApplicationSuccess)
      .then(this.handleFileSuccess)
      .catch(this.handleError)
      .finally(() => this.fetchingApi = false)
  }

  private handleApplicationSuccess = (resp: ApplicationResponse) => {
    this.application = resp.data
    return this.fetchFiles(this.application.id)
  }

  private handleFileSuccess = (resp: FilesResponse) => {
    this.files = resp.data
    this.initialFiles = resp.data
  }

  private fetchFiles = (id: string) => {
    return FileService()
      .listApplicationFiles(id)
  }

  private handleError = (err: ApiError) => {
    if (!err.error) {
      return console.log(err);
    }
    toastr().danger(err.error)
  }

  private handleFileUploaded = (e: CustomEvent) => {
    const { application, files } = this
    const file = e.detail as FileModel
    this.initialFiles = [file, ...files]
    if (!this.searchQuery && this.searchQuery === '') {
      this.files = [file, ...files]
    }
    this.application = { ...application }
  }


  private onSearch = debounce((e: CustomEvent) => {
    this.searchQuery = e.detail
    if (!e.detail || e.detail === '') {
      this.files = this.initialFiles
      return
    }
    FileService()
      .search({
        applicationId: this.application.id,
        query: e.detail
      }).then(resp => {
        this.files = resp.data
      })
      .catch(this.handleError)
  }, 300)

  render() {
    if (this.fetchingApi) return <ta-loader />

    const { application } = this;

    return (
      <Host>
        <div class="wrapper">
          <div class="left-side">
            <ta-dragger
              onTaFileUpload={this.handleFileUploaded}
              applicationId={this.application.id}
            >
              <ta-app-page>
                <ta-page-header pageTitle={application.name}>
                </ta-page-header>
                <div class="file-search">
                  <ta-input
                    value={this.searchQuery}
                    onTaInput={this.onSearch}
                    label={`Search ${!this.isMobile ? '(Hint: you can search an image by its content)' : ''}`}
                    type="search" />
                </div>
                <div class="files-wrapper">
                  {this.files.map((file) => (
                    <ta-file-card file={file} />
                  ))}
                </div>
              </ta-app-page>
            </ta-dragger>
          </div>
          <application-details-sidebar application={this.application} />
        </div>
      </Host>
    );
  }
}
