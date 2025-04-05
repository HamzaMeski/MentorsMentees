import {Component} from "@angular/core";
import {ListMentorSessionsComponent} from "./listMentorSessions/listMentorSessions.component";
import {AddSessionComponent} from "./addSession/addSession.component";

@Component({
	standalone: true,
	selector: 'mentor-session',
	imports: [
		ListMentorSessionsComponent,
		AddSessionComponent

	],
	template: `
        Mentor Sessions
        <add-session></add-session>
        <list-mentor-sessions></list-mentor-sessions>
	`
})
export class MentorSessionComponent {

}