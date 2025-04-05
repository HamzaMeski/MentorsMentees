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
		<h1>Mentor section</h1>
        <add-mentor></add-mentor>
        <mentees-list></mentees-list>
	`
})
export class MentorComponent {

}