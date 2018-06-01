import { Component, OnInit, OnDestroy} from '@angular/core';
import { City } from '../city';
import { CityService } from '../city.service';
import { Observable } from 'rxjs/Observable';
import { FormatedTime } from '../formated.time.pipe';
import { Router } from '@angular/router';
import { ResultstorageService } from '../resultstorage.service';

@Component({
	selector: 'app-suggestion',
	templateUrl: './suggestion.component.html',
	styleUrls: ['./suggestion.component.css'],
})

export class SuggestionComponent implements OnInit, OnDestroy {

	// @Input() city: City;
	private _suggested: Array<string> = [];
	private _pickedArray: Array<string> = [];
	// _cities: City;
	private _cities: any;
	private _vreme1: number = -1;
	private coundownRef: any;
	private suggestionInput: string; // ngModel promenljiva mora da bude inicijalizovana ovde

	public get vreme1(): number {
		return this._vreme1;
	}

	public get suggested(): Array<string> {
		return this._suggested;
	}

	public get pickedArray(): Array<string> {
		return this._pickedArray;
	}

	public get cities(): Array<string> {
		return this._cities;
	}


	constructor(
		private cityService: CityService,
		private FormatedTime: FormatedTime,
		private router: Router,
		private resultsService: ResultstorageService
	) { }

	ngOnInit() {
		this._pickedArray = [];
		this._cities = {};
	}

	startCountDown() {
		if ( this._vreme1 === -1 ) {
			this._vreme1 = this._cities.vreme;

			this.coundownRef = setInterval(() => {
				this._vreme1 = this._vreme1 - 1;

				if ( this._vreme1 === 0 ) {
					this.resultsService.endGame(this._pickedArray, this._cities);
				}
			}, 1000);
		}
	}

	fillSuggestions(suggestionInput) {
		if ( Object.keys(this._cities).length === 0 ) {
			this.cityService.getCities().subscribe(
				_cities => {
					this._cities = _cities;

					this.startCountDown();
					this.generateSuggestions(suggestionInput);
				}
			);
		} else {
			this.generateSuggestions(suggestionInput);
		}
	}

	generateSuggestions(suggestionInput) {
		this._suggested = [];

		if ( suggestionInput === '') {
			suggestionInput = '';
		} else {
			let counter = 0;
			this._cities.ponudjene.some( grad => {
				if ( counter < 5 ) {
					const gradL = grad.toLowerCase();

					if ( gradL.indexOf( suggestionInput.toLowerCase() ) !== -1) {
						this._suggested.push(grad);
						counter++;
					}
				} else {
					return true;
				}
			});
		}
	}

	checkAndAddPicked(picked) {
		const indexInSuggestion = this._cities.ponudjene.indexOf( picked );
		if ( this._pickedArray.indexOf( picked ) === -1) {
			this._pickedArray.push(picked);
			this._cities.ponudjene.splice(indexInSuggestion, 1);
		}

		this.suggestionInput = '';
		this._suggested = [];
	}

	ngOnDestroy() {
		console.log('destroyed');
		clearInterval( this.coundownRef );
	}
}
