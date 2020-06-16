import {newSpecPage} from '@stencil/core/testing';
import {TaApplicationListCard} from './ta-application-list-card';

describe('ta-application-list-card', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [TaApplicationListCard],
      html: `<ta-application-list-card></ta-application-list-card>`,
    });
    expect(page.root).toEqualHtml(`
      <ta-application-list-card>
        <mock:shadow-root>
          <slot></slot>
        </mock:shadow-root>
      </ta-application-list-card>
    `);
  });
});
