import {Component, OnInit} from "@angular/core";
import {Store} from "@ngrx/store";
import {
	selectGetMentorsOfMenteeError,
	selectGetMentorsOfMenteeLoading,
	selectGetMentorsOfMenteeResponse
} from "../../../../ngrx/selectors/mentoring/mentoring.selectors";
import {getMentorsOfMentee} from "../../../../ngrx/actions/mentoring/mentoring.actions";
import {AsyncPipe, NgForOf, NgIf} from "@angular/common";
import {RouterLink} from "@angular/router";


@Component({
	standalone: true,
	selector: 'list-mentors',
	imports: [
		AsyncPipe,
		NgForOf,
		NgIf,
		RouterLink
	],
	template: `
        <div class="p-6 text-white">
            <h2 class="text-2xl font-semibold mb-4">My Mentors List</h2>

            <!-- Loading Spinner -->
            <div *ngIf="mentorsOfMenteeLoading$ | async" class="text-center mb-4">
                <p>Loading mentors...</p>
            </div>

            <!-- Error Message -->
            <div *ngIf="mentorsOfMenteeError$ | async as error" class="text-red-500 mb-4">
                <p>Error loading mentees: {{ error }}</p>
            </div>

            <!-- My Mentors Table -->
            <table *ngIf="mentorsOfMenteeResponse$ | async as mentors"
                   class="min-w-full table-auto bg-[#1E1F22] rounded-lg overflow-hidden">
                <thead class="bg-[#2E2F33] text-left text-sm uppercase text-gray-400">
                <tr>
                    <th class="p-3">ID</th>
                    <th class="p-3">First Name</th>
                    <th class="p-3">Last Name</th>
                    <th class="p-3">Email</th>
                    <th class="p-3">Phone</th>
                    <th class="p-3">Bio</th>
                    <th class="p-3">Sessions</th>
                </tr>
                </thead>
                <tbody>
                <tr *ngFor="let mentor of mentors" class="border-t border-[#2E2F33] hover:bg-[#313338] transition">
                    <td class="p-3">{{ mentor.id }}</td>
                    <td class="p-3">{{ mentor.firstName }}</td>
                    <td class="p-3">{{ mentor.lastName }}</td>
                    <td class="p-3">{{ mentor.email }}</td>
                    <td class="p-3">{{ mentor.phone }}</td>
                    <td class="p-3">{{ mentor.bio }}</td>
                    <td class="p-3">
                        <a [routerLink]="['/dashboard/myMentors/menteeSession', mentor.id]" class="inline-block bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium px-4 py-2 rounded-full shadow transition">
                            See Sessions
                        </a>
                    </td>
                </tr>
                </tbody>
            </table>

            <!-- No Mentees Found -->
            <div *ngIf="(mentorsOfMenteeResponse$ | async)?.length === 0" class="text-gray-400 mt-4">
                No mentors found.
            </div>
        </div>
	`
})
export class ListMentorsComponent implements OnInit{
	mentorsOfMenteeResponse$
	mentorsOfMenteeLoading$
	mentorsOfMenteeError$

	constructor(private store:Store) {
		this.mentorsOfMenteeResponse$ = store.select(selectGetMentorsOfMenteeResponse)
		this.mentorsOfMenteeLoading$ = store.select(selectGetMentorsOfMenteeLoading)
		this.mentorsOfMenteeError$ = store.select(selectGetMentorsOfMenteeError)
	}

	ngOnInit() {
		this.store.dispatch(getMentorsOfMentee())

		this.mentorsOfMenteeResponse$.subscribe(val=> {
			console.log(val)
		})
	}
}