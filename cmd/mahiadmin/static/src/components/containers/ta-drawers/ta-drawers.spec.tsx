import {newSpecPage} from '@stencil/core/testing';
import {TaDrawers} from './ta-drawers';

describe('ta-drawers', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [TaDrawers],
      html: `<ta-drawers></ta-drawers>`,
    });
    expect(page.root).toEqualHtml(`
      <ta-drawers>
        <mock:shadow-root>
          <slot></slot>
        </mock:shadow-root>
      </ta-drawers>
    `);
  });
});
