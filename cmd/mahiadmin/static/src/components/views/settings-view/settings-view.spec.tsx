import {newSpecPage} from '@stencil/core/testing';
import {SettingsView} from './settings-view';

describe('settings-view', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [SettingsView],
      html: `<settings-view></settings-view>`,
    });
    expect(page.root).toEqualHtml(`
      <settings-view>
        <mock:shadow-root>
          <slot></slot>
        </mock:shadow-root>
      </settings-view>
    `);
  });
});
