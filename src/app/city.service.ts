import { Injectable } from '@angular/core';

import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';

import { City } from './city';

import { HttpClient } from '@angular/common/http';

@Injectable()
export class CityService {
	constructor(private http: HttpClient) { }

	jsonUrl = 'assets/cities.json';

	getCities(): Observable<any> {
		return this.http.get(this.jsonUrl);
	}
}
