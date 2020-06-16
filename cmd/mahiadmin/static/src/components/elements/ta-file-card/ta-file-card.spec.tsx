import {newSpecPage} from '@stencil/core/testing';
import {TaFileCard} from './ta-file-card';

describe('ta-file-card', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [TaFileCard],
      html: `<ta-file-card></ta-file-card>`,
    });
    expect(page.root).toEqualHtml(`
      <ta-file-card>
        <mock:shadow-root>
          <slot></slot>
        </mock:shadow-root>
      </ta-file-card>
    `);
  });
});
