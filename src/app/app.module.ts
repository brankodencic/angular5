import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms'; // <-- NgModel lives here

import { AppComponent } from './app.component';
import { CitiesComponent } from './cities/cities.component';
import { SuggestionComponent } from './suggestion/suggestion.component';
import { CityService } from './city.service';

import { Pipe, PipeTransform } from '@angular/core';
import { FormatedTime } from './formated.time.pipe';
import { AppRoutingModule } from './/app-routing.module';
import { ResultsComponent } from './results/results.component';
import { ResultstorageService } from './resultstorage.service';

import { HttpClientModule } from '@angular/common/http';
import { PickedComponent } from './picked/picked.component';

const PIPES = [
	FormatedTime
];

const COMPONENTS = [
	AppComponent,
	CitiesComponent,
	SuggestionComponent,
	ResultsComponent,
	PickedComponent
];

const MODULES = [
	BrowserModule,
	FormsModule,
	AppRoutingModule,
	HttpClientModule
];

const SERVICES = [
	CityService,
	ResultstorageService,
];

@NgModule({
	declarations: [
		...PIPES,
		...COMPONENTS
	],
	imports: [
		...MODULES
	],
	providers: [
		...SERVICES,
		...PIPES
	],
	bootstrap: [AppComponent]
})
export class AppModule {
	// CityService
}
