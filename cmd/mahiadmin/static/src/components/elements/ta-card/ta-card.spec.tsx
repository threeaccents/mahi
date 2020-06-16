import {newSpecPage} from '@stencil/core/testing';
import {TaCard} from './ta-card';

describe('ta-card', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [TaCard],
      html: `<ta-card></ta-card>`,
    });
    expect(page.root).toEqualHtml(`
      <ta-card>
        <mock:shadow-root>
          <slot></slot>
        </mock:shadow-root>
      </ta-card>
    `);
  });
});
