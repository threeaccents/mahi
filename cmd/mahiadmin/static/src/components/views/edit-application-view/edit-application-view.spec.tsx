import { newSpecPage } from '@stencil/core/testing';
import { EditApplicationView } from './edit-application-view';

describe('edit-application-view', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [EditApplicationView],
      html: `<edit-application-view></edit-application-view>`,
    });
    expect(page.root).toEqualHtml(`
      <edit-application-view>
        <mock:shadow-root>
          <slot></slot>
        </mock:shadow-root>
      </edit-application-view>
    `);
  });
});
