import {newSpecPage} from '@stencil/core/testing';
import {TaLineGraph} from './ta-line-graph';

describe('ta-line-graph', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [TaLineGraph],
      html: `<ta-line-graph></ta-line-graph>`,
    });
    expect(page.root).toEqualHtml(`
      <ta-line-graph>
        <mock:shadow-root>
          <slot></slot>
        </mock:shadow-root>
      </ta-line-graph>
    `);
  });
});
