import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TaxReturnHistoryComponent } from './tax-return-history.component';

describe('TaxReturnHistoryComponent', () => {
  let component: TaxReturnHistoryComponent;
  let fixture: ComponentFixture<TaxReturnHistoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TaxReturnHistoryComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TaxReturnHistoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
