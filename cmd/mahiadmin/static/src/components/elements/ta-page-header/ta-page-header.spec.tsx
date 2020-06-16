import {newSpecPage} from '@stencil/core/testing';
import {TaPageHeader} from './ta-page-header';

describe('ta-page-header', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [TaPageHeader],
      html: `<ta-page-header></ta-page-header>`,
    });
    expect(page.root).toEqualHtml(`
      <ta-page-header>
        <mock:shadow-root>
          <slot></slot>
        </mock:shadow-root>
      </ta-page-header>
    `);
  });
});
