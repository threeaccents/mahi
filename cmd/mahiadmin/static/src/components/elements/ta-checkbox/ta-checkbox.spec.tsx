import {newSpecPage} from '@stencil/core/testing';
import {TaCheckbox} from './ta-checkbox';

describe('ta-checkbox', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [TaCheckbox],
      html: `<ta-checkbox></ta-checkbox>`,
    });
    expect(page.root).toEqualHtml(`
      <ta-checkbox>
        <mock:shadow-root>
          <slot></slot>
        </mock:shadow-root>
      </ta-checkbox>
    `);
  });
});
