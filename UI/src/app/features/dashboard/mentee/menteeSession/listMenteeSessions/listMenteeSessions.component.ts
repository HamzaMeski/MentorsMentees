import {Component, OnInit} from "@angular/core";
import {CommonModule} from "@angular/common";
import {ActivatedRoute} from "@angular/router";
import {Store} from "@ngrx/store";
import {
	selectGetMenteeSessionsError,
	selectGetMenteeSessionsLoading,
	selectGetMenteeSessionsResponse,
} from "../../../../../ngrx/selectors/session/session.selectors";
import {getMenteeSessions, getMentorSessions} from "../../../../../ngrx/actions/session/session.actions";


@Component({
	standalone: true,
	selector: 'list-mentee-sessions',
	imports: [
		CommonModule
	],
	template: `
        <div *ngIf="menteeSessionsLoading$ | async" class="text-center py-4">
            <p class="text-xl text-gray-500">Loading sessions...</p>
        </div>

        <div *ngIf="menteeSessionsError$ | async as error" class="text-center py-4">
            <p class="text-xl text-red-500">Error: {{ error }}</p>
        </div>

        <div *ngIf="menteeSessionsResponse$ | async">
            <ng-container *ngIf="menteeSessionsResponse$ | async as sessions">
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
export class ListMenteeSessionsComponent implements OnInit{
	menteeSessionsResponse$
	menteeSessionsLoading$
	menteeSessionsError$

	mentorId!: number

	constructor(
		private route: ActivatedRoute,
		private store:Store
	) {
		this.menteeSessionsResponse$ = store.select(selectGetMenteeSessionsResponse)
		this.menteeSessionsLoading$ = store.select(selectGetMenteeSessionsLoading)
		this.menteeSessionsError$ = store.select(selectGetMenteeSessionsError)
	}

	ngOnInit() {
		this.mentorId = Number(this.route.snapshot.paramMap.get('id'));
		this.store.dispatch(getMenteeSessions({mentorId: this.mentorId}))
	}
}
