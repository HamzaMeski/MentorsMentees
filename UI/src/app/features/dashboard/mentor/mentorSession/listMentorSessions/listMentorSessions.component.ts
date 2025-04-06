import {Component, OnInit} from "@angular/core";
import {Store} from "@ngrx/store";
import {
	selectGetMentorSessionsError,
	selectGetMentorSessionsLoading,
	selectGetMentorSessionsResponse
} from "../../../../../ngrx/selectors/session/session.selectors";
import {ActivatedRoute} from "@angular/router";
import {getMentorSessions} from "../../../../../ngrx/actions/session/session.actions";
import {CommonModule} from "@angular/common";


@Component({
	standalone: true,
	selector: 'list-mentor-sessions',
	imports: [
		CommonModule
	],
	template: `
        <div *ngIf="mentorSessionsLoading$ | async" class="text-center py-4">
            <p class="text-xl text-gray-500">Loading sessions...</p>
        </div>

        <div *ngIf="mentorSessionsError$ | async as error" class="text-center py-4">
            <p class="text-xl text-red-500">Error: {{ error }}</p>
        </div>

        <div *ngIf="mentorSessionsResponse$ | async">
            <ng-container *ngIf="mentorSessionsResponse$ | async as sessions">
                <div *ngIf="sessions.length === 0" class="text-center py-6">
                    <p class="text-lg text-[#949BA4]">No sessions available at the moment.</p>
                </div>

                <div *ngIf="sessions.length > 0" class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 p-4">
                    <div *ngFor="let session of sessions" class="bg-[#1E1F22] shadow-lg rounded-lg overflow-hidden hover:scale-105 transform transition duration-200 ease-in-out">
                        <div class="bg-[#2B2D31] p-4">
                            <h3 class="text-xl font-semibold text-white">{{ session.subject }}</h3>
                            <p class="text-sm text-[#949BA4]">Session Date: {{ session.sessionDate | date: 'medium' }}</p>
                        </div>
                        <div class="p-4">
                            <p class="text-white"><strong>Created At:</strong> {{ session.createdAt | date: 'medium' }}</p>
                        </div>
                    </div>
                </div>
            </ng-container>
        </div>

	`,
})
export class ListMentorSessionsComponent implements OnInit {
	mentorSessionsResponse$
	mentorSessionsLoading$
	mentorSessionsError$

	menteeId!: number

	constructor(
		private route: ActivatedRoute,
		private store:Store
	) {
		this.mentorSessionsResponse$ = store.select(selectGetMentorSessionsResponse)
		this.mentorSessionsLoading$ = store.select(selectGetMentorSessionsLoading)
		this.mentorSessionsError$ = store.select(selectGetMentorSessionsError)
	}

	ngOnInit() {
		this.menteeId = Number(this.route.snapshot.paramMap.get('id'));
		this.store.dispatch(getMentorSessions({menteeId: this.menteeId}))
	}
}