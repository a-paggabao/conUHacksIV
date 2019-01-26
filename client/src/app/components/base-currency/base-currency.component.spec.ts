import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BaseCurrencyComponent } from './base-currency.component';

describe('BaseCurrencyComponent', () => {
  let component: BaseCurrencyComponent;
  let fixture: ComponentFixture<BaseCurrencyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BaseCurrencyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BaseCurrencyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
