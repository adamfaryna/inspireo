import { PuretextPage } from './app.po';

describe('puretext App', function() {
  let page: PuretextPage;

  beforeEach(() => {
    page = new PuretextPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
