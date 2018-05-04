import { Component, OnInit} from '@angular/core';
import { City } from '../city';
import { CityService } from '../city.service';
import { LowerCasePipe } from '@angular/common';
// import { Observable } from 'rxjs/Observable';
import { formatedtime } from '../formated.time.pipe';
import {Router} from "@angular/router";

@Component({
	selector: 'app-suggestion',
	templateUrl: './suggestion.component.html',
	styleUrls: ['./suggestion.component.css']
})

export class SuggestionComponent implements OnInit {

	// @Input() city: City;
	suggested: Array<string> = [];
	pickedArray: Array<string> = [];
	cities: City;
	vreme1: number = -1;
	coundownRef: number;
	suggestionInput: string; //ngModel promenljiva mora da bude inicijalizovana ovde

	constructor(private cityService: CityService, private lowerCasePipe: LowerCasePipe, private formatedtime: formatedtime, private router: Router) {
		// console.log(City);
	}

	ngOnInit() {
	}
	
	toLowerCase( val ){
		return this.lowerCasePipe.transform(val);
	}

	startCountDown(){
		if( this.vreme1 === -1 ){
			this.cityService.getCities().subscribe(
				cities => {
					this.cities = cities[0];

					this.vreme1 = this.cities.vreme;
					
					this.coundownRef = setInterval(() => {
						this.vreme1 = this.vreme1 - 1;
						
						if( this.vreme1 == 0 ){
							this.endGame();
						}
					}, 1000);
				}
			);
		}
	}
	
	fillSuggestions(suggestionInput){
		if( typeof this.cities === 'undefined'){
			this.cityService.getCities().subscribe(
				cities => {
					this.cities = cities[0];
					this.generateSuggestions(suggestionInput);
				}
			);
		} else {
			this.generateSuggestions(suggestionInput);
		}
	}
	
	generateSuggestions(suggestionInput) {
		this.suggested = [];

		if( suggestionInput == ''){
			suggestionInput = '';
		} else {
			let counter = 0;
			this.cities.ponudjene.some( grad => {
				if( counter <= 5 ){
					let gradL = this.toLowerCase(grad);

					if( gradL.indexOf( this.toLowerCase(suggestionInput) ) != -1){
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
		let indexInSuggestion = this.cities.ponudjene.indexOf( picked );
		if( this.pickedArray.indexOf( picked ) === -1){
			this.pickedArray.push(picked);
			this.cities.ponudjene.splice(indexInSuggestion, 1);
		}

		this.suggestionInput = '';
		this.suggested = [];
	}

	removeSuggestion(picked) {
		let index = this.pickedArray.indexOf( picked );
		if( index !== -1 ){
			this.pickedArray.splice(index, 1);
			this.cities.ponudjene.push(picked);
			this.cities.ponudjene.sort();
			this.generateSuggestions('');
		}
		console.log(this.pickedArray);
	}

	endGame(){
		clearInterval( this.coundownRef );
		this.router.navigate(['results']);
	}
}
