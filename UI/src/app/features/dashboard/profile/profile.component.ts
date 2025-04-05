import {Component} from "@angular/core";
import {AddMentorComponent} from "../mentor/addMentor/addMentor.component";
import {ListMenteesComponent} from "../mentor/listMentees/listMentees.component";


@Component({
	standalone: true,
	selector: 'profile',
	imports: [
		AddMentorComponent,
		ListMenteesComponent
	],
	template: `
		Profile section
	`
})
export class ProfileComponent {

}