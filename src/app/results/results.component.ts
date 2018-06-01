import { Component, OnInit } from '@angular/core';
import { ResultstorageService } from '../resultstorage.service';
import { ElementRef } from '@angular/core';

@Component({
	selector: 'app-results',
	templateUrl: './results.component.html',
	styleUrls: ['./results.component.css']
})
export class ResultsComponent implements OnInit {

	result: number = 0;
	counter: number = 0;
	counterRef: any;

	constructor(private resultsService: ResultstorageService ) { }

	ngOnInit() {
		this.result = parseInt (this.resultsService.getResult(), 10);
		this.counter = 0;

		// odradjeno preko intervala da bih izbegao ubacivanje i ngAnimate modula.
		if ( this.result > 0) {
			this.counterRef = setInterval(() => {
				this.counter++;
				if ( this.counter >= this.result ) {
					clearInterval(this.counterRef);
				}
			}, 30 );
		}

	}

}
