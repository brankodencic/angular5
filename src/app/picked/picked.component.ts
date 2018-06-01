import { Component, OnInit, Input } from '@angular/core';

import { City } from '../city';

import { ResultstorageService } from '../resultstorage.service';

@Component({
	selector: 'app-picked',
	templateUrl: './picked.component.html',
	styleUrls: ['./picked.component.css']
})

export class PickedComponent implements OnInit {

	@Input('pickedArray') pickedArray: Array<string>;
	@Input('cities') cities: City;

	constructor(
		private resultsService: ResultstorageService
	) { }

	ngOnInit() {
	}

	removeSuggestion(picked) {
		const index = this.pickedArray.indexOf( picked );
		if ( index !== -1 ) {
			this.pickedArray.splice(index, 1);
			this.cities.ponudjene.push(picked);
			this.cities.ponudjene.sort();
		}
	}

	endGame() {
		this.resultsService.endGame(this.pickedArray, this. cities);
	}
}
