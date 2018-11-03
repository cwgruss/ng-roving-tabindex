import { A11yModule } from './a11y.module';

describe('A11yModule', () => {
  let a11yModule: A11yModule;

  beforeEach(() => {
    a11yModule = new A11yModule();
  });

  it('should create an instance', () => {
    expect(a11yModule).toBeTruthy();
  });
});
