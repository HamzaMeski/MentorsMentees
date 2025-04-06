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
        <div *ngIf="mentorSessionsLoading$ | async; else sessionsList" class="text-center py-4">
            <p class="text-xl text-gray-500">Loading sessions...</p>
        </div>

        <ng-template #sessionsList>
            <div *ngIf="mentorSessionsError$ | async as error; else showCards" class="text-center py-4">
                <p class="text-xl text-red-500">Error: {{ error }}</p>
            </div>

            <ng-template #showCards>
                <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 p-4">
                    <div *ngFor="let session of mentorSessionsResponse$ | async" class="bg-white shadow-lg rounded-lg overflow-hidden hover:scale-105 transform transition duration-200 ease-in-out">
                        <div class="bg-gray-100 p-4">
                            <h3 class="text-xl font-semibold text-gray-800">{{ session.subject }}</h3>
                            <p class="text-sm text-gray-500">Session Date: {{ session.sessionDate | date: 'medium' }}</p>
                        </div>
                        <div class="p-4">
                            <p><strong>Mentee ID:</strong> {{ session.menteeId }}</p>
                            <p><strong>Mentor ID:</strong> {{ session.mentorId }}</p>
                            <p><strong>Created At:</strong> {{ session.createdAt | date: 'medium' }}</p>
                            <p><strong>Updated At:</strong> {{ session.updatedAt | date: 'medium' }}</p>
                        </div>
                    </div>
                </div>
            </ng-template>
        </ng-template>
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

		this.mentorSessionsResponse$.subscribe(val=> {
			console.log(val)
		})
	}
}