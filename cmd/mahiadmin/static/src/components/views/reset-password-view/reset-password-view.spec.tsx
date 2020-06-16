import {newSpecPage} from '@stencil/core/testing';
import {ResetPasswordView} from './reset-password-view';

describe('reset-password-view', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [ResetPasswordView],
      html: `<reset-password-view></reset-password-view>`,
    });
    expect(page.root).toEqualHtml(`
      <reset-password-view>
        <mock:shadow-root>
          <slot></slot>
        </mock:shadow-root>
      </reset-password-view>
    `);
  });
});
