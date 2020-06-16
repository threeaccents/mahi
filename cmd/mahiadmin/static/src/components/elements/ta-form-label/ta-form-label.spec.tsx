import { newSpecPage } from '@stencil/core/testing';
import { TaFormLabel } from './ta-form-label';

describe('ta-form-label', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [TaFormLabel],
      html: `<ta-form-label></ta-form-label>`,
    });
    expect(page.root).toEqualHtml(`
      <ta-form-label>
        <mock:shadow-root>
          <slot></slot>
        </mock:shadow-root>
      </ta-form-label>
    `);
  });
});
