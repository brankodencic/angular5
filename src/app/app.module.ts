import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms'; // <-- NgModel lives here

import { AppComponent } from './app.component';
import { CitiesComponent } from './cities/cities.component';
import { SuggestionComponent } from './suggestion/suggestion.component';
import { CityService } from './city.service';
import { MessageService } from './message.service';
import { MessagesComponent } from './messages/messages.component';

import { LowerCasePipe } from '@angular/common';


@NgModule({
	declarations: [
		AppComponent,
		CitiesComponent,
		SuggestionComponent,
		MessagesComponent
	],
	imports: [
		BrowserModule,
		FormsModule
	],
	providers: [
		CityService,
		MessageService,
		LowerCasePipe
	],
	bootstrap: [AppComponent]
})
export class AppModule {
	// CityService
}
