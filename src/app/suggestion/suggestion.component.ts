import { Component, OnInit} from '@angular/core';
import { City } from '../city';
import { CityService } from '../city.service';
import { LowerCasePipe } from '@angular/common';
// import { Observable } from 'rxjs/Observable';
import { FormatedTime } from '../formated.time.pipe';
import { Router } from '@angular/router';
import { ResultstorageService } from '../resultstorage.service';

@Component({
	selector: 'app-suggestion',
	templateUrl: './suggestion.component.html',
	styleUrls: ['./suggestion.component.css']
})

export class SuggestionComponent implements OnInit {

	// @Input() city: City;
	suggested: Array<string> = [];
	pickedArray: Array<string> = [];
	// cities: City;
	cities: any;
	vreme1: number = -1;
	coundownRef: any;
	suggestionInput: string; // ngModel promenljiva mora da bude inicijalizovana ovde

	constructor(
		private cityService: CityService,
		private lowerCasePipe: LowerCasePipe,
		private FormatedTime: FormatedTime,
		private router: Router,
		private resultsService: ResultstorageService
		) {
		// console.log(City);
	}

	ngOnInit() {
		this.pickedArray = [];
		this.cities = {};
	}

	toLowerCase( val ) {
		return this.lowerCasePipe.transform(val);
	}

	startCountDown() {
		if ( this.vreme1 === -1 ) {
			// this.cityService.getCities().subscribe(
			// 	cities => {
					this.vreme1 = this.cities.vreme;

					this.coundownRef = setInterval(() => {
						this.vreme1 = this.vreme1 - 1;

						if ( this.vreme1 === 0 ) {
							this.endGame();
						}
					}, 1000);
			// 	}
			// );
		}
	}

	fillSuggestions(suggestionInput) {
		if ( Object.keys(this.cities).length === 0 ) {
			this.cityService.getCities().subscribe(
				cities => {
					// deep clone so i can modify local version of array without interferring with mock
					this.cities = JSON.parse(JSON.stringify(cities[0]));

					this.generateSuggestions(suggestionInput);
				}
			);
		} else {
			this.generateSuggestions(suggestionInput);
		}
	}

	generateSuggestions(suggestionInput) {
		this.suggested = [];

		if ( suggestionInput === '') {
			suggestionInput = '';
		} else {
			let counter = 0;
			this.cities.ponudjene.some( grad => {
				if ( counter < 5 ) {
					const gradL = this.toLowerCase(grad);

					if ( gradL.indexOf( this.toLowerCase(suggestionInput) ) !== -1) {
						this.suggested.push(grad);
						counter++;
					}
				} else {
					return true;
				}
			});
		}
	}

	checkAndAddPicked(picked) {
		const indexInSuggestion = this.cities.ponudjene.indexOf( picked );
		if ( this.pickedArray.indexOf( picked ) === -1) {
			this.pickedArray.push(picked);
			this.cities.ponudjene.splice(indexInSuggestion, 1);
		}

		this.suggestionInput = '';
		this.suggested = [];
	}

	removeSuggestion(picked) {
		const index = this.pickedArray.indexOf( picked );
		if ( index !== -1 ) {
			this.pickedArray.splice(index, 1);
			this.cities.ponudjene.push(picked);
			this.cities.ponudjene.sort();
			this.generateSuggestions('');
		}
	}

	endGame() {
		clearInterval( this.coundownRef );
		const percents: number = this.calculatePercents();
		this.resultsService.setResult(percents + '');
		this.router.navigate(['results']);
	}

	calculatePercents() {
		let percents: number = 0;
		const numberOfPicked: number = this.pickedArray.length;
		let correctPicked: number = 0;

		if ( numberOfPicked > 0) {
			this.pickedArray.forEach(element => {
				if ( this.cities.tacno.indexOf( element ) !== -1 ) {
					correctPicked ++;
				}
			});
		}

		if (correctPicked > 0) {
			percents = (100 / numberOfPicked ) * correctPicked;
		}
		return percents;
	}
}
