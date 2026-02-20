import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MapShellComponent } from "./map-shell/map-shell.component";
import { CountryDataService } from '../shared/country-data.service';
import { CountryInfoDisplayComponent } from './country-info-display/country-info-display.component';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, MapShellComponent, CountryInfoDisplayComponent, NgIf],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'world-map';

  // selectedCountry!: string;
  selectedCountryId!: string;
  // selectedCountryPath!: SVGPathElement;
  // countryInfo!: any;

  constructor() { }

  ngOnInit() {
    let paths = document.querySelectorAll('path');
    paths.forEach(path => {
      path.addEventListener('click', this.changeCountry.bind(this, path));
    });

  }

  changeCountry(path: SVGPathElement) {
    if (this.selectedCountryId) {
      let previousSelectedPath = document.getElementById(this.selectedCountryId);
      if (previousSelectedPath) {
        previousSelectedPath.style.fill = ""; // Reset previous selection
      }
    }
    path.style.fill = "violet";
    console.log("Country clicked:", path.getAttribute("name"));
    // this.selectedCountryPath = path;
    // this.selectedCountry = path.getAttribute("name") || "";
    this.selectedCountryId = path.id || "";
    console.log("Selected country:", path.getAttribute("name"), "with ID:", this.selectedCountryId);
    // this.countryDataService.setSelectedCountry(path.id, this.selectedCountry).subscribe(info => {
    //   this.countryInfo = info;
    //   console.log("Received country info:", info);
    // });
    // console.log("cds.selectedCountry in AppComponent:", this.countryDataService.selectedCountry);
  }
}
