import { Injectable } from '@angular/core';

import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';

import { City } from './city';
import { CITIES } from './mock-cities';
import { MessageService } from './message.service';

@Injectable()
export class CityService {

	constructor(private messageService: MessageService) { }

	getCities(): Observable<City[]> {
		this.messageService.add('CityService: fetched cities');
		return of(CITIES);
	}
}
