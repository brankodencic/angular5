import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
	name: 'formatedtime'
})
export class formatedtime implements PipeTransform{
	constructor() {}

	public transform(value: string, fallback: string): string {
		let rtn = '';
		const parsedValue = parseInt(value);

		if (value) {
			rtn = Math.round( Math.floor(parsedValue / 60) ) + ':' + parsedValue % 60;
		} else {
			rtn = '0';
		}
		return rtn;
	}
}
