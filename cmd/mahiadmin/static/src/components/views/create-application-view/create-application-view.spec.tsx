import {newSpecPage} from '@stencil/core/testing';
import {CreateApplicationView} from './create-application-view';

describe('create-application-view', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [CreateApplicationView],
      html: `<create-application-view></create-application-view>`,
    });
    expect(page.root).toEqualHtml(`
      <create-application-view>
        <mock:shadow-root>
          <slot></slot>
        </mock:shadow-root>
      </create-application-view>
    `);
  });
});
