import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

import { City } from './city';

@Injectable()

export class ResultstorageService {

	result: string = '';
	cities: City;
	pickedArray: Array<String>;

	constructor(
		private router: Router
	) { }

	getResult(): string {
		return this.result;
	}

	setResult( percents: string ) {
		this.result = percents;
	}

	calculatePercents(pickedArray) {
		let percents: number = 0;
		const numberOfPicked: number = pickedArray.length;
		let correctPicked: number = 0;

		if ( numberOfPicked > 0) {
			pickedArray.forEach(element => {
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

	endGame(pickedArray, cities) {
		this.cities = cities;
		this.pickedArray = pickedArray;
		const percents: number = this.calculatePercents(pickedArray);
		this.setResult(percents + '');
		this.router.navigate(['results']);
	}
}
