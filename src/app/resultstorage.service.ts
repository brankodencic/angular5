import { Injectable } from '@angular/core';

@Injectable()

export class ResultstorageService {

	result: string = '';
	constructor() { }

	getResult(): string {
		return this.result;
	}

	setResult( percents: string ) {
		this.result = percents;
	}

}
