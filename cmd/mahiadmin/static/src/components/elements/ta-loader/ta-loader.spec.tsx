import {newSpecPage} from '@stencil/core/testing';
import {TaLoader} from './ta-loader';

describe('ta-loader', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [TaLoader],
      html: `<ta-loader></ta-loader>`,
    });
    expect(page.root).toEqualHtml(`
      <ta-loader>
        <mock:shadow-root>
          <slot></slot>
        </mock:shadow-root>
      </ta-loader>
    `);
  });
});
