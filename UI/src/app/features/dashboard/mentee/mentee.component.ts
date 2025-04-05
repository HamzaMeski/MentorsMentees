import {Component} from "@angular/core";
import {AddMentorComponent} from "../mentor/addMentor/addMentor.component";
import {ListMenteesComponent} from "../mentor/listMentees/listMentees.component";


@Component({
	standalone: true,
	selector: 'mentee',
	imports: [
		AddMentorComponent,
		ListMenteesComponent
	],
	template: `
		Mentee section
	`
})
export class MenteeComponent {

}