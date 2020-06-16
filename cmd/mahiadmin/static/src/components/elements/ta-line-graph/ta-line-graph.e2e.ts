import {newE2EPage} from '@stencil/core/testing';

describe('ta-line-graph', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<ta-line-graph></ta-line-graph>');

    const element = await page.find('ta-line-graph');
    expect(element).toHaveClass('hydrated');
  });
});
