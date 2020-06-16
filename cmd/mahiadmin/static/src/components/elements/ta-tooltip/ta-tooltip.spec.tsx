import { newSpecPage } from '@stencil/core/testing';
import { TaTooltip } from './ta-tooltip';

describe('ta-tooltip', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [TaTooltip],
      html: `<ta-tooltip></ta-tooltip>`,
    });
    expect(page.root).toEqualHtml(`
      <ta-tooltip>
        <mock:shadow-root>
          <slot></slot>
        </mock:shadow-root>
      </ta-tooltip>
    `);
  });
});
