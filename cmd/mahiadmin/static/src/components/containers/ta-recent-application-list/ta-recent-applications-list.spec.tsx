import {newSpecPage} from '@stencil/core/testing';
import {TaRecentApplicationsList} from './ta-recent-applications-list';

describe('ta-recent-applications-list', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [TaRecentApplicationsList],
      html: `<ta-recent-applications-list></ta-recent-applications-list>`,
    });
    expect(page.root).toEqualHtml(`
      <ta-recent-applications-list>
        <mock:shadow-root>
          <slot></slot>
        </mock:shadow-root>
      </ta-recent-applications-list>
    `);
  });
});
