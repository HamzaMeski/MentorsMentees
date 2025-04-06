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
        <button
            (click)="display = true"
            class="group relative inline-flex items-center justify-center px-6 py-3 m-4 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-medium text-lg rounded-xl transition-all duration-300 transform hover:scale-105 hover:shadow-2xl hover:shadow-blue-500/20 active:scale-100 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:ring-offset-2 focus:ring-offset-gray-900"
        >
            <div class="absolute inset-0 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 blur-xl opacity-0 group-hover:opacity-70 transition-opacity duration-300"></div>
            <span class="relative flex items-center gap-2">
		        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
		            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"/>
		        </svg>
		        Create Session
		        <svg class="w-5 h-5 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
		            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7l5 5m0 0l-5 5m5-5H6"/>
		        </svg>
		    </span>
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