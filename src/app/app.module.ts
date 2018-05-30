import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms'; // <-- NgModel lives here

import { AppComponent } from './app.component';
import { CitiesComponent } from './cities/cities.component';
import { SuggestionComponent } from './suggestion/suggestion.component';
import { CityService } from './city.service';

import { LowerCasePipe } from '@angular/common';
import { Pipe, PipeTransform } from '@angular/core';
import { FormatedTime } from './formated.time.pipe';
import { AppRoutingModule } from './/app-routing.module';
import { ResultsComponent } from './results/results.component';
import { ResultstorageService } from './resultstorage.service';


@NgModule({
	declarations: [
		AppComponent,
		CitiesComponent,
		SuggestionComponent,
		FormatedTime,
		ResultsComponent
	],
	imports: [
		BrowserModule,
		FormsModule,
		AppRoutingModule
	],
	providers: [
		CityService,
		ResultstorageService,
		LowerCasePipe,
		FormatedTime
	],
	bootstrap: [AppComponent]
})
export class AppModule {
	// CityService
}
