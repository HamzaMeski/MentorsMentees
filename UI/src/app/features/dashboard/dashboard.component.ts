import {Component} from "@angular/core";
import {RouterOutlet} from "@angular/router";

@Component({
	standalone: true,
	selector: 'dashboard',
	imports: [
		RouterOutlet

	],
	template: `
		<section class="h-dvh">
            <router-outlet></router-outlet>
        </section>
	`
})
export class DashboardComponent {

}