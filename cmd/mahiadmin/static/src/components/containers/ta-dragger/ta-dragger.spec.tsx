import {newSpecPage} from '@stencil/core/testing';
import {TaDragger} from './ta-dragger';

describe('ta-dragger', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [TaDragger],
      html: `<ta-dragger></ta-dragger>`,
    });
    expect(page.root).toEqualHtml(`
      <ta-dragger>
        <mock:shadow-root>
          <slot></slot>
        </mock:shadow-root>
      </ta-dragger>
    `);
  });
});
