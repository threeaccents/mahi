import {newE2EPage} from '@stencil/core/testing';

describe('ta-dragger', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<ta-dragger></ta-dragger>');

    const element = await page.find('ta-dragger');
    expect(element).toHaveClass('hydrated');
  });
});
