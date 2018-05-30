import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
	name: 'FormatedTime'
})
export class FormatedTime implements PipeTransform {
	constructor() {}

	public transform(value: string, fallback: string): string {
		let rtn = '';
		const parsedValue = parseInt(value, 10);

		if (value) {
			rtn = Math.round( Math.floor(parsedValue / 60) ) + ':' + parsedValue % 60;
		} else {
			rtn = '0';
		}
		return rtn;
	}
}
