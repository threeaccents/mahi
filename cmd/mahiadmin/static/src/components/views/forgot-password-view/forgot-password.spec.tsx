import { newSpecPage } from '@stencil/core/testing';
import { ForgotPassword } from './forgot-password';

describe('forgot-password-view', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [ForgotPassword],
      html: `<forgot-password></forgot-password>`,
    });
    expect(page.root).toEqualHtml(`
      <forgot-password>
        <mock:shadow-root>
          <slot></slot>
        </mock:shadow-root>
      </forgot-password>
    `);
  });
});
