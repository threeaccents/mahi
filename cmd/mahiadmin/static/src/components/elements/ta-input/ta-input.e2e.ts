import {newE2EPage} from '@stencil/core/testing';

describe('ta-input', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<ta-input></ta-input>');

    const element = await page.find('ta-input');
    expect(element).toHaveClass('hydrated');
  });
});
