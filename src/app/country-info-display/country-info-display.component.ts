import { Component, OnInit, Input, OnChanges } from '@angular/core';
import { CountryDataService } from '../../shared/country-data.service';
import { Country } from '../country';
import { Observable, of, from } from 'rxjs';
import { NgIf, NgFor, KeyValuePipe, JsonPipe  } from '@angular/common';

@Component({
  selector: 'app-country-info-display',
  standalone: true,
  imports: [NgIf, KeyValuePipe, NgFor, JsonPipe],
  templateUrl: './country-info-display.component.html',
  styleUrl: './country-info-display.component.css'
})
export class CountryInfoDisplayComponent implements OnInit, OnChanges {
  // @Input() selectedCountry!: string;
  @Input() selectedCountryId!: string;
  countryInfo= { id: "", name: "No Country Selected", data: null } as Country;

  constructor(private countryDataService: CountryDataService) { }

  ngOnInit(): void {
  }

  ngOnChanges(): Observable<Country> {
    console.log('Selected Country ID:', this.selectedCountryId, 'Input Change Detected in CountryInfoDisplayComponent');
    if (this.selectedCountryId) {
      const data = from(this.countryDataService.setSelectedCountry(this.selectedCountryId));
      data.subscribe(info => {
        info.subscribe(countryInfo => {
          this.countryInfo = countryInfo;
          console.log("Received country info in CountryInfoDisplayComponent:", countryInfo);
        });
      });
      return of(this.countryInfo);
    } else {
      console.log("No country selected in CountryInfoDisplayComponent.");
      this.countryInfo = { id: "", name: "No Country Selected", data: null } as Country; // Clear country info when no country is selected
      return of(this.countryInfo);
    }
  }


}
