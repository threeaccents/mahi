import {newSpecPage} from '@stencil/core/testing';
import {TaApplicationCard} from './ta-application-card';

describe('ta-application-card', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [TaApplicationCard],
      html: `<ta-application-card></ta-application-card>`,
    });
    expect(page.root).toEqualHtml(`
      <ta-application-card>
        <mock:shadow-root>
          <slot></slot>
        </mock:shadow-root>
      </ta-application-card>
    `);
  });
});
