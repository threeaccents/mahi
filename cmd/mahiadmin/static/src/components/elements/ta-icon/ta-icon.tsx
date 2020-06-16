import { Component, ComponentInterface, Event, h, Host, Prop } from '@stencil/core';
import {
  applicationIcon,
  cancelIcon,
  cardIcon,
  closeIcon,
  copyIcon,
  dashboardIcon,
  dotsIcon,
  expandArrowIcon,
  eyeIcon,
  fileIcon,
  folderIcon,
  homeIcon,
  listIcon,
  logoIcon,
  logoSmIcon,
  longArrowRightIcon,
  newFolderIcon,
  newPersonIcon,
  personalStorageDiskIcon,
  personIcon,
  settingsIcon,
  slashEyeIcon,
  storageDiskIcon,
  transformationsIcon,
  usersIcon,
  trashIcon,
  addIcon,
} from './svgs';
import { EventEmitter } from '@stencil/router/dist/types/stencil.core';

const icons = {
  'eye-open': eyeIcon,
  'eye-closed': slashEyeIcon,
  'add-folder': newFolderIcon,
  'folder': folderIcon,
  'vertical-dots': dotsIcon,
  'expand-arrow': expandArrowIcon,
  'cancel': cancelIcon,
  'logo': logoIcon,
  'logo-sm': logoSmIcon,
  'storage-disks': storageDiskIcon,
  'personal-storage-disks': personalStorageDiskIcon,
  'long-arrow-right': longArrowRightIcon,
  'dashboard': dashboardIcon,
  'files': fileIcon,
  'transformations': transformationsIcon,
  'copy': copyIcon,
  'settings': settingsIcon,
  'users': usersIcon,
  'applications': applicationIcon,
  'home': homeIcon,
  'card': cardIcon,
  'list': listIcon,
  'add-person': newPersonIcon,
  'person': personIcon,
  'close': closeIcon,
  'trash': trashIcon,
  'add': addIcon,
}

export type TaIconType =
  'eye-open'
  | 'eye-closed'
  | 'add-folder'
  | 'folder'
  | 'vertical-dots'
  | 'storage-disks'
  | 'personal-storage-disks'
  | 'long-arrow-right'
  | 'dashboard'
  | 'files'
  | 'logo'
  | 'logo-sm'
  | 'cancel'
  | 'expand-arrow'
  | 'transformations'
  | 'copy'
  | 'settings'
  | 'users'
  | 'applications'
  | 'card'
  | 'list'
  | 'add-person'
  | 'person'
  | 'close'
  | 'trash'
  | 'add'
  | 'home';

@Component({
  tag: 'ta-icon',
  styleUrl: 'ta-icon.css',
  shadow: true,
})
export class TaIcon implements ComponentInterface {
  @Prop() icon!: TaIconType;

  @Event() taClick: EventEmitter;

  render() {
    return (
      <Host onClick={() => this.taClick.emit()}>
        <div innerHTML={icons[this.icon]} />
      </Host>
    );
  }

}
