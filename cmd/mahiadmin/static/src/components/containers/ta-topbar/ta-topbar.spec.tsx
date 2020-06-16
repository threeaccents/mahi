import {newSpecPage} from '@stencil/core/testing';
import {TaTopbar} from './ta-topbar';

describe('ta-topbar', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [TaTopbar],
      html: `<ta-topbar></ta-topbar>`,
    });
    expect(page.root).toEqualHtml(`
      <ta-topbar>
        <mock:shadow-root>
          <slot></slot>
        </mock:shadow-root>
      </ta-topbar>
    `);
  });
});
