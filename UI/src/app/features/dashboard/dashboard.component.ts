import {Component} from "@angular/core";
import {RouterOutlet} from "@angular/router";

@Component({
	standalone: true,
	selector: 'dashboard',
	imports: [
		RouterOutlet

	],
	template: `
		dashboard
		<router-outlet></router-outlet>
	`
})
export class DashboardComponent {

}