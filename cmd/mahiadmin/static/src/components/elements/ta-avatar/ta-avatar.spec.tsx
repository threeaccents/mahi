import {newSpecPage} from '@stencil/core/testing';
import {TaAvatar} from './ta-avatar';

describe('ta-avatar', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [TaAvatar],
      html: `<ta-avatar></ta-avatar>`,
    });
    expect(page.root).toEqualHtml(`
      <ta-avatar>
        <mock:shadow-root>
          <slot></slot>
        </mock:shadow-root>
      </ta-avatar>
    `);
  });
});
