import {newSpecPage} from '@stencil/core/testing';
import {BillingSettingView} from './billing-setting-view';

describe('billing-setting-view', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [BillingSettingView],
      html: `<billing-setting-view></billing-setting-view>`,
    });
    expect(page.root).toEqualHtml(`
      <billing-setting-view>
        <mock:shadow-root>
          <slot></slot>
        </mock:shadow-root>
      </billing-setting-view>
    `);
  });
});
