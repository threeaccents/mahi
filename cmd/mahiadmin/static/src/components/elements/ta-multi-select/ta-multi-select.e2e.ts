import {newE2EPage} from '@stencil/core/testing';

describe('ta-multi-select', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<ta-multi-select></ta-multi-select>');

    const element = await page.find('ta-multi-select');
    expect(element).toHaveClass('hydrated');
  });
});
