import {Component} from "@angular/core";
import {ListMentorSessionsComponent} from "./listMentorSessions/listMentorSessions.component";
import {AddSessionComponent} from "./addSession/addSession.component";
import {CommonModule} from "@angular/common";

@Component({
	standalone: true,
	selector: 'mentor-session',
	imports: [
		CommonModule,
		ListMentorSessionsComponent,
		AddSessionComponent
	],
	template: `
        <button (click)="display = true" class="bg-blue-500 text-white font-semibold py-2 px-4 rounded-lg shadow-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-300 transition duration-300 ease-in-out">
            Create Session
        </button>
        <add-session *ngIf="display" (close)="onCloseModal()"></add-session>
        <list-mentor-sessions></list-mentor-sessions>
	`
})
export class MentorSessionComponent {
	display:boolean = false

	onCloseModal() {
		this.display = false
	}
}