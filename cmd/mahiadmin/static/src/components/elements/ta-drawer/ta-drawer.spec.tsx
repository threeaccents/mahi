import {newSpecPage} from '@stencil/core/testing';
import {TaDrawer} from './ta-drawer';

describe('ta-drawer', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [TaDrawer],
      html: `<ta-drawer></ta-drawer>`,
    });
    expect(page.root).toEqualHtml(`
      <ta-drawer>
        <mock:shadow-root>
          <slot></slot>
        </mock:shadow-root>
      </ta-drawer>
    `);
  });
});
