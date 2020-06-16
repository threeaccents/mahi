import {newSpecPage} from '@stencil/core/testing';
import {TaProgress} from './ta-progress';

describe('ta-progress', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [TaProgress],
      html: `<ta-progress></ta-progress>`,
    });
    expect(page.root).toEqualHtml(`
      <ta-progress>
        <mock:shadow-root>
          <slot></slot>
        </mock:shadow-root>
      </ta-progress>
    `);
  });
});
