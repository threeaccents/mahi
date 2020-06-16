import {newSpecPage} from '@stencil/core/testing';
import {TaStatCard} from './ta-stat-card';

describe('ta-stat-card', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [TaStatCard],
      html: `<ta-stat-card></ta-stat-card>`,
    });
    expect(page.root).toEqualHtml(`
      <ta-stat-card>
        <mock:shadow-root>
          <slot></slot>
        </mock:shadow-root>
      </ta-stat-card>
    `);
  });
});
