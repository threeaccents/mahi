import {Component, h, Prop} from '@stencil/core';
import {RouterHistory} from '@stencil/router';
import SpaceService from '../../../../api/space';
import toastr from '../../../../libs/toastr';
import {ApiError} from '../../../../api/base';

@Component({
  tag: 'onboarding-select-storage-view',
  styleUrl: 'onboarding-select-storage-view.css',
  shadow: true
})
export class OnboardingSelectStorageView {
  @Prop() history: RouterHistory;

  private selectStorage(storage: 'oriio' | 'custom') {
    if (storage === 'custom') {
      return this.history.push('/onboarding/custom-storage');
    }
    this.setOriioStorage()
  }

  private setOriioStorage() {
    SpaceService()
      .setStorage({storageEngine: 'oriio'})
      .then(() => {
        toastr().success('Storage was set!');
        this.history.push('/onboarding/congratulations')
      }).catch((err: ApiError) => {
      if (!err.error) {
        toastr().danger('Oops something went wrong. Pleasre refresh and try again.');
        return console.log(err)
      }
      toastr().danger(err.error);
    })
  }

  render() {
    return (
      <onboarding-container>
        <onboarding-left-side
          mainTitle="Thank you for joining!"
          subTitle="Please complete the onboarding process to get started."/>
        <onboarding-right-side
          mainTitle="Choose your type of storage"
          description="In order for you to start storing files we must setup your storage. You have the option to use your own personal storage or let us handle your storage for you.">
          <div class="storage-options">
            <div onClick={() => this.selectStorage('oriio')} class="storage-option-item">
              <div class="storage-option-item-icon">
                <ta-icon icon="storage-disks"/>
              </div>
              <div class="storage-option-item-title">
                <h3>Use Oriio Storage</h3>
                <p>We provide the best rates around.</p>
              </div>
              <div class="storage-option-item-select-icon">
                <ta-icon icon="long-arrow-right"/>
              </div>
            </div>
            <div onClick={() => this.selectStorage('custom')} class="storage-option-item">
              <div class="storage-option-item-icon">
                <ta-icon icon="personal-storage-disks"/>
              </div>
              <div class="storage-option-item-title">
                <h3>Use Custom Storage</h3>
                <p>AWS s3, DigitalOcean, backblaze, Wasabi.</p>
              </div>
              <div class="storage-option-item-select-icon">

              </div>
            </div>
          </div>
        </onboarding-right-side>
      </onboarding-container>
    );
  }
}
