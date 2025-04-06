import {Component} from "@angular/core";
import {CommonModule} from "@angular/common";
import {ListMenteeSessionsComponent} from "./listMenteeSessions/listMenteeSessions.component";


@Component({
	standalone: true,
	selector: 'mentor-session',
	imports: [
		CommonModule,
		ListMenteeSessionsComponent
	],
	template: `
        <list-mentee-sessions></list-mentee-sessions>
	`
})
export class MenteeSessionComponent {}