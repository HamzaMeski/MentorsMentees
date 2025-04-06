import {Component} from "@angular/core";
import {ListMentorsComponent} from "./listMentors/listMentors.component";


@Component({
	standalone: true,
	selector: 'mentee',
	imports: [
		ListMentorsComponent
	],
	template: `
		<list-mentors></list-mentors>
	`
})
export class MenteeComponent {

}