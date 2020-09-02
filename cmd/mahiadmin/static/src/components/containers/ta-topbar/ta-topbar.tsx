import {Component, ComponentInterface, Event, EventEmitter, h, Host} from '@stencil/core';
import {me} from '../../../util';

const barIcon = '<svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="bars" class="svg-inline--fa fa-bars fa-w-14" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path fill="currentColor" d="M16 132h416c8.837 0 16-7.163 16-16V76c0-8.837-7.163-16-16-16H16C7.163 60 0 67.163 0 76v40c0 8.837 7.163 16 16 16zm0 160h416c8.837 0 16-7.163 16-16v-40c0-8.837-7.163-16-16-16H16c-8.837 0-16 7.163-16 16v40c0 8.837 7.163 16 16 16zm0 160h416c8.837 0 16-7.163 16-16v-40c0-8.837-7.163-16-16-16H16c-8.837 0-16 7.163-16 16v40c0 8.837 7.163 16 16 16z"></path></svg>'

@Component({
  tag: 'ta-topbar',
  styleUrl: 'ta-topbar.css',
  shadow: true,
})
export class TaTopbar implements ComponentInterface {
  me = me();

  @Event() taHamburgerClicked: EventEmitter;

  render() {
    return (
      <Host>
        <div class="logo">
          <img src='../../assets/logo.svg' alt=''/>
        </div>
        <div class="right-side">
          <div class="toggle-menu">
            <div onClick={() => this.taHamburgerClicked.emit()} innerHTML={barIcon}/>
          </div>
        </div>
      </Host>
    );
  }

}
