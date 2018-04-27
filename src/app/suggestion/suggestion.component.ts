import { Component, OnInit} from '@angular/core';
import { City } from '../city';
import { CityService } from '../city.service';
import { LowerCasePipe } from '@angular/common';
import { of } from 'rxjs/observable/of';

@Component({
	selector: 'app-suggestion',
	templateUrl: './suggestion.component.html',
	styleUrls: ['./suggestion.component.css']
})
export class SuggestionComponent implements OnInit {

	// @Input() city: City;
	suggested: Array<string> = [];
	cities: City;
	vreme1: Observable<number> = -1;
	coundownRef: number;

	constructor(private cityService: CityService,
				private lowerCasePipe: LowerCasePipe) {
		// console.log(City);
	}

	ngOnInit() {
	}
	
	toLowerCase( val ){
		return this.lowerCasePipe.transform(val);
	}

	startCountDown(){
		if( this.vreme1 == -1 ){
			this.cityService.getCities().subscribe(
				cities => {
					this.cities = cities[0];

					this.vreme1 = this.cities.vreme;
					
					this.coundownRef = setInterval(() => {
						this.vreme1 = parseInt(this.vreme1) - 1;
						console.log( this.vreme1 );
						
						if( this.vreme1 == 0 ){
							clearInterval( this.coundownRef );
						}
					}, 1000);
				}
			);
		}
	}
	
	generateSuggestions(suggestionInput) {
		this.cityService.getCities().subscribe(
			cities => {
				this.cities = cities[0];
				this.suggested = [];

				this.cities.ponudjene.forEach( grad => {
					let gradL = this.toLowerCase(grad);

					if( gradL.indexOf( this.toLowerCase(suggestionInput) ) != -1 ){
						this.suggested.push(grad);
					}
				})
			}
		);
	}

}
