import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DocumentsDashboardComponent } from './documents-dashboard.component';

describe('DocumentsDashboardComponent', () => {
  let component: DocumentsDashboardComponent;
  let fixture: ComponentFixture<DocumentsDashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DocumentsDashboardComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DocumentsDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
