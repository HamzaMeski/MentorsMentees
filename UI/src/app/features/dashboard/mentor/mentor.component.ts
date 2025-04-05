import {Component} from "@angular/core";
import {AddMentorComponent} from "./addMentor/addMentor.component";


@Component({
	standalone: true,
	selector: 'mentor',
	imports: [
		AddMentorComponent
	],
	template: `
		<h1>Mentor section</h1>
		<add-mentor></add-mentor>
	`
})
export class MentorComponent {

}