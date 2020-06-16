import {newE2EPage} from '@stencil/core/testing';

describe('ta-button', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<ta-button></ta-button>');

    const element = await page.find('ta-button');
    expect(element).toHaveClass('hydrated');
  });

  it('contains a "Profile Page" button', async () => {
    const page = await newE2EPage();
    await page.setContent('<ta-button></ta-button>');

    const element = await page.find('ta-button >>> button');
    expect(element.textContent).toEqual('Profile page');
  });
});
