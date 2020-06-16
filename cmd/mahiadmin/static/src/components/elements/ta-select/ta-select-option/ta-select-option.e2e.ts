import {newE2EPage} from '@stencil/core/testing';

describe('ta-select-option', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<ta-select-option></ta-select-option>');

    const element = await page.find('ta-select-option');
    expect(element).toHaveClass('hydrated');
  });
});
