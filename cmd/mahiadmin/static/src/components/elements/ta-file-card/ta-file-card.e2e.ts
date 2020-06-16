import {newE2EPage} from '@stencil/core/testing';

describe('ta-file-card', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<ta-file-card></ta-file-card>');

    const element = await page.find('ta-file-card');
    expect(element).toHaveClass('hydrated');
  });
});
