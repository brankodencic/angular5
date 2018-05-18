import { Injectable } from '@angular/core';

import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';

import { City } from './city';
import { CITIES } from './mock-cities';

@Injectable()
export class CityService {
	constructor() { }

	getCities(): Observable<City[]> {
		return of(CITIES);
	}
}
