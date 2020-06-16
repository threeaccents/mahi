import {newSpecPage} from '@stencil/core/testing';
import {TaAppPage} from './ta-app-page';

describe('ta-app-page', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [TaAppPage],
      html: `<ta-app-page></ta-app-page>`,
    });
    expect(page.root).toEqualHtml(`
      <ta-app-page>
        <mock:shadow-root>
          <slot></slot>
        </mock:shadow-root>
      </ta-app-page>
    `);
  });
});
