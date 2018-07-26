import { DashboardComponent } from './dashboard.component';

// schöner Unit Test! :-)
describe('DashboardComponent', () => {
  let component: DashboardComponent;

  beforeEach(() => {
    component = new DashboardComponent();
    component.ngOnInit();
  });

  it('should have two books by default', () => {
    expect(component.books.length).toBe(2);
  });
});
