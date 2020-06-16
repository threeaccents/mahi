import {newE2EPage} from '@stencil/core/testing';

describe('ta-dragger-preview-file', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<ta-dragger-preview-file></ta-dragger-preview-file>');

    const element = await page.find('ta-dragger-preview-file');
    expect(element).toHaveClass('hydrated');
  });
});
