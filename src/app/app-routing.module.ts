import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CitiesComponent } from './cities/cities.component';
import { ResultsComponent } from './results/results.component';

const routes: Routes = [
	{
		path: '',
		redirectTo: '/game',
		pathMatch: 'full' 
	},
	{
		path: 'game',
		component: CitiesComponent
	},
	{
		path: 'results',
		component: ResultsComponent
	}
];

@NgModule({
	imports: [ RouterModule.forRoot(routes) ],
	exports: [ RouterModule ]
})

export class AppRoutingModule {
}