import {newSpecPage} from '@stencil/core/testing';
import {TaSelectOption} from './ta-select-option';

describe('ta-select-option', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [TaSelectOption],
      html: `<ta-select-option></ta-select-option>`,
    });
    expect(page.root).toEqualHtml(`
      <ta-select-option>
        <mock:shadow-root>
          <slot></slot>
        </mock:shadow-root>
      </ta-select-option>
    `);
  });
});
