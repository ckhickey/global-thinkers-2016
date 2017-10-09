import { GlobalThinkersPage } from './app.po';

describe('global-thinkers App', function() {
  let page: GlobalThinkersPage;

  beforeEach(() => {
    page = new GlobalThinkersPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
