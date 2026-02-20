import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CountryInfoDisplayComponent } from './country-info-display.component';

describe('CountryInfoDisplayComponent', () => {
  let component: CountryInfoDisplayComponent;
  let fixture: ComponentFixture<CountryInfoDisplayComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CountryInfoDisplayComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CountryInfoDisplayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
