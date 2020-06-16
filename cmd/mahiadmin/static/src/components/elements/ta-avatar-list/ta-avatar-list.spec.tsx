import {newSpecPage} from '@stencil/core/testing';
import {TaAvatarList} from './ta-avatar-list';

describe('ta-avatar-list', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [TaAvatarList],
      html: `<ta-avatar-list></ta-avatar-list>`,
    });
    expect(page.root).toEqualHtml(`
      <ta-avatar-list>
        <mock:shadow-root>
          <slot></slot>
        </mock:shadow-root>
      </ta-avatar-list>
    `);
  });
});
