import {newE2EPage} from '@stencil/core/testing';

describe('ta-select', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<ta-select></ta-select>');

    const element = await page.find('ta-select');
    expect(element).toHaveClass('hydrated');
  });
});
