import { Component, OnInit } from '@angular/core';

import { City } from '../city';
import { CityService } from '../city.service';

@Component({
	selector: 'app-cities',
	templateUrl: './cities.component.html',
	styleUrls: ['./cities.component.css']
})

export class CitiesComponent implements OnInit {

	// selectedCity: City;
	cities: City;

	constructor(private cityService: CityService) {}

	ngOnInit() {
		this.getCities();
	}

	// onSelect(city: City): void {
		// this.selectedCity = city;
	// }
	
	getCities(): void {
		this.cityService.getCities()
			.subscribe( cities => this.cities = cities[0] );
	}
}
