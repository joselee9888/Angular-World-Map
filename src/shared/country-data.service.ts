import { Injectable } from '@angular/core';
import { firstValueFrom, Observable, of, from } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Country } from '../app/country'; // Adjust the path as necessary

@Injectable({
  providedIn: 'root'
})
export class CountryDataService {
  private apiBaseUrl = 'https://api.worldbank.org/V2/';
  // selectedCountry!: string;
  selectedCountryId!: string;
  private previousCountries = new Map<string, Country>();

  constructor(private http: HttpClient) { }

  async setSelectedCountry(countryId: string): Promise<Observable<Country>> {
    this.selectedCountryId = countryId;
    // this.selectedCountry = countryName;

    if (this.previousCountries.has(countryId)) {
      console.log(`Country ID: ${countryId} has been selected before.`);
      return of(this.previousCountries.get(countryId)!);
    } else {
      console.log(`Country ID: ${countryId} is selected for the first time.`);
      // use any for the HTTP response shape and ensure the mapper returns Country (not Observable<Country>)
      let result!: Country;
      // result = this.getApiData(countryId).subscribe(res => {
      //   res = JSON.parse(JSON.stringify(res));
      //   // res = JSON.parse(JSON.stringify(res.json()));
      //   result = {
      //     id: countryId,
      //     name: res[1][0].name,
      //     data: res[1][0]        } as Country;
      //   this.previousCountries.set(countryId, result);
      //   console.log("Received country info from API:", result);
      //   return result;
      // });
      let res1 = from(this.getApiData(countryId));
      console.log("Raw API response for country ID:", countryId, res1);
      result = await this.turnApiResponseToCountry(await firstValueFrom(res1), countryId)
      console.log("Mapped Country object for country ID:", countryId, result);
      this.previousCountries.set(countryId, result);

      if (this.previousCountries.size > 5) {
        console.warn("Cache size exceeded 5 entries. Clearing oldest.");
        this.previousCountries.delete(this.previousCountries.keys().next().value!); // Remove the oldest entry
      }

        
      //result = this.previousCountries.get(countryId); // This will be undefined on the first call, but will be set after the API call completes
      return of(result);
    }
    
      }

  turnApiResponseToCountry(apiResponse: JSON, countryId: string): Country {
    let res = JSON.parse(JSON.stringify(apiResponse));
    if (res && res[1] && res[1][0]) {

      const countryData = res[1][0] as any; // Cast to any to access properties without TypeScript errors
      return {
        id: countryId,
        name: countryData.name,
        data: {'Capital City': countryData.capitalCity,
          Region: countryData.region.value,
          'Income Level': countryData.incomeLevel.value,
          Longitude: countryData.longitude,
          Latitude: countryData.latitude}
      } as Country;
    } else {
      console.error("Unexpected API response structure:", apiResponse);
      return { id: countryId, name: "Unknown Country", data: null } as Country;
    }
  }

  async getApiData(countryId: string): Promise<JSON> {
    return await firstValueFrom(this.http.get<JSON>(`${this.apiBaseUrl}countries/${countryId}?format=json`));
    //return of(await this.http.get<JSON>(`${this.apiBaseUrl}countries/${countryId}?format=json`));
  }
}

      //       const countryInfo: Country = {
      //         id: this.selectedCountryId,
      //         name: countryData.name,
      //         data: countryData
      //       };
      //       this.previousCountries.set(countryId, countryInfo);
      //       console.log("Received country info from API:", countryInfo);
      //       return countryInfo;
      //     } else {
      //       console.error("Unexpected API response structure:", response);
      //       return { id: countryId, name: "Unknown Country", data: null } as Country;
      //     }
      //   })
      // ;
//       return of(this.previousCountries.get(countryId)!);
//     }
    
//       }  

//   getApiData(countryId: string): Observable<any> {
//     return this.http.get<JSON>(`${this.apiBaseUrl}countries/${countryId}?format=json`);
//   }
// }
