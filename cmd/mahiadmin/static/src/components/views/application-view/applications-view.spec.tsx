import {newSpecPage} from '@stencil/core/testing';
import {ApplicationsView} from './applications-view';

describe('applications-view', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [ApplicationsView],
      html: `<applications-view></applications-view>`,
    });
    expect(page.root).toEqualHtml(`
      <applications-view>
        <mock:shadow-root>
          <slot></slot>
        </mock:shadow-root>
      </applications-view>
    `);
  });
});
