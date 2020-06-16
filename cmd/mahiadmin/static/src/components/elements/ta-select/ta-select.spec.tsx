import {newSpecPage} from '@stencil/core/testing';
import {TaSelect} from './ta-select';

describe('ta-select', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [TaSelect],
      html: `<ta-select></ta-select>`,
    });
    expect(page.root).toEqualHtml(`
      <ta-select>
        <mock:shadow-root>
          <slot></slot>
        </mock:shadow-root>
      </ta-select>
    `);
  });
});
