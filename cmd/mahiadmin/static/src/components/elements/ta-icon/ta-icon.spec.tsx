import {newSpecPage} from '@stencil/core/testing';
import {TaIcon} from './ta-icon';

describe('ta-icon', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [TaIcon],
      html: `<ta-icon></ta-icon>`,
    });
    expect(page.root).toEqualHtml(`
      <ta-icon>
        <mock:shadow-root>
          <slot></slot>
        </mock:shadow-root>
      </ta-icon>
    `);
  });
});
