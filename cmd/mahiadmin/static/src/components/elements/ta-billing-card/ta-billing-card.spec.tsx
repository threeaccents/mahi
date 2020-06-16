import {newSpecPage} from '@stencil/core/testing';
import {TaBillingCard} from './ta-billing-card';

describe('ta-billing-card', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [TaBillingCard],
      html: `<ta-billing-card></ta-billing-card>`,
    });
    expect(page.root).toEqualHtml(`
      <ta-billing-card>
        <mock:shadow-root>
          <slot></slot>
        </mock:shadow-root>
      </ta-billing-card>
    `);
  });
});
