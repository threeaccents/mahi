import { newSpecPage } from '@stencil/core/testing';
import { TaForm } from './ta-form';

describe('ta-form', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [TaForm],
      html: `<ta-form></ta-form>`,
    });
    expect(page.root).toEqualHtml(`
      <ta-form>
        <mock:shadow-root>
          <slot></slot>
        </mock:shadow-root>
      </ta-form>
    `);
  });
});
