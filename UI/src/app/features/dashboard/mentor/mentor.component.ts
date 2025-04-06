import {Component} from "@angular/core";
import {AddMentorComponent} from "./addMentor/addMentor.component";
import {ListMenteesComponent} from "./listMentees/listMentees.component";


@Component({
	standalone: true,
	selector: 'mentor',
	imports: [
		AddMentorComponent,
		ListMenteesComponent
	],
	template: `
        <add-mentor></add-mentor>
        <list-mentees></list-mentees>
	`
})
export class MentorComponent {}