import { TestBed, inject } from '@angular/core/testing';

import { ResultstorageService } from './resultstorage.service';

describe('ResultstorageService', () => {
	beforeEach(() => {
		TestBed.configureTestingModule({
			providers: [ResultstorageService]
		});
	});

	it('should be created', inject([ResultstorageService], (service: ResultstorageService) => {
		expect(service).toBeTruthy();
	}));
});
