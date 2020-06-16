import {newSpecPage} from '@stencil/core/testing';
import {SpaceSettingView} from './space-setting-view';

describe('space-setting-view', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [SpaceSettingView],
      html: `<space-setting-view></space-setting-view>`,
    });
    expect(page.root).toEqualHtml(`
      <space-setting-view>
        <mock:shadow-root>
          <slot></slot>
        </mock:shadow-root>
      </space-setting-view>
    `);
  });
});
