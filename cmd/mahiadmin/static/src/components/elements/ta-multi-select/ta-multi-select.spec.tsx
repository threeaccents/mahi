import {newSpecPage} from '@stencil/core/testing';
import {TaMultiSelect} from './ta-multi-select';

describe('ta-multi-select', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [TaMultiSelect],
      html: `<ta-multi-select></ta-multi-select>`,
    });
    expect(page.root).toEqualHtml(`
      <ta-multi-select>
        <mock:shadow-root>
          <slot></slot>
        </mock:shadow-root>
      </ta-multi-select>
    `);
  });
});
