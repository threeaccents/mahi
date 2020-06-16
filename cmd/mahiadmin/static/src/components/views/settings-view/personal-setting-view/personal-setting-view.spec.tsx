import {newSpecPage} from '@stencil/core/testing';
import {PersonalSettingView} from './personal-setting-view';

describe('personal-setting-view', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [PersonalSettingView],
      html: `<personal-setting-view></personal-setting-view>`,
    });
    expect(page.root).toEqualHtml(`
      <personal-setting-view>
        <mock:shadow-root>
          <slot></slot>
        </mock:shadow-root>
      </personal-setting-view>
    `);
  });
});
