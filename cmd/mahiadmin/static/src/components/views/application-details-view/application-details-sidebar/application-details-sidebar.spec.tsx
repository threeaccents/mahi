import {newSpecPage} from '@stencil/core/testing';
import {ApplicationDetailsSidebar} from './application-details-sidebar';

describe('application-details-sidebar', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [ApplicationDetailsSidebar],
      html: `<application-details-sidebar></application-details-sidebar>`,
    });
    expect(page.root).toEqualHtml(`
      <application-details-sidebar>
        <mock:shadow-root>
          <slot></slot>
        </mock:shadow-root>
      </application-details-sidebar>
    `);
  });
});
