import {newSpecPage} from '@stencil/core/testing';
import {TaDraggerPreviewFile} from './ta-dragger-preview-file';

describe('ta-dragger-preview-file', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [TaDraggerPreviewFile],
      html: `<ta-dragger-preview-file></ta-dragger-preview-file>`,
    });
    expect(page.root).toEqualHtml(`
      <ta-dragger-preview-file>
        <mock:shadow-root>
          <slot></slot>
        </mock:shadow-root>
      </ta-dragger-preview-file>
    `);
  });
});
