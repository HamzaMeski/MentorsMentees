import {AsyncPipe, CommonModule, NgClass} from "@angular/common";
import {Component, OnInit} from "@angular/core";
import {Store} from "@ngrx/store";
import {
	selectGetMenteesOfMentorError,
	selectGetMenteesOfMentorLoading,
	selectGetMenteesOfMentorResponse
} from "../../../../ngrx/selectors/mentoring/mentoring.selectors";
import {getMenteesOfMentor} from "../../../../ngrx/actions/mentoring/mentoring.actions";


@Component({
	standalone: true,
	selector: 'mentees-list',
	imports: [
		AsyncPipe,
		CommonModule
	],
	template: `
        <div class="p-6 text-white">
            <h2 class="text-2xl font-semibold mb-4">Mentees List</h2>

            <!-- Loading Spinner -->
            <div *ngIf="menteesOfMentorLoading$ | async" class="text-center mb-4">
                <p>Loading mentees...</p>
            </div>

            <!-- Error Message -->
            <div *ngIf="menteesOfMentorError$ | async as error" class="text-red-500 mb-4">
                <p>Error loading mentees: {{ error }}</p>
            </div>

            <!-- Mentees Table -->
            <table *ngIf="menteesOfMentorResponse$ | async as mentees"
                   class="min-w-full table-auto bg-[#1E1F22] rounded-lg overflow-hidden">
                <thead class="bg-[#2E2F33] text-left text-sm uppercase text-gray-400">
                <tr>
                    <th class="p-3">ID</th>
                    <th class="p-3">First Name</th>
                    <th class="p-3">Last Name</th>
                    <th class="p-3">Email</th>
                    <th class="p-3">Phone</th>
                    <th class="p-3">Bio</th>
                </tr>
                </thead>
                <tbody>
                <tr *ngFor="let mentee of mentees" class="border-t border-[#2E2F33] hover:bg-[#313338] transition">
                    <td class="p-3">{{ mentee.id }}</td>
                    <td class="p-3">{{ mentee.firstName }}</td>
                    <td class="p-3">{{ mentee.lastName }}</td>
                    <td class="p-3">{{ mentee.email }}</td>
                    <td class="p-3">{{ mentee.phone }}</td>
                    <td class="p-3">{{ mentee.bio }}</td>
                </tr>
                </tbody>
            </table>

            <!-- No Mentees Found -->
            <div *ngIf="(menteesOfMentorResponse$ | async)?.length === 0" class="text-gray-400 mt-4">
                No mentees found.
            </div>
        </div>
	`
})
export class ListMenteesComponent implements OnInit{
	menteesOfMentorResponse$
	menteesOfMentorLoading$
	menteesOfMentorError$

	constructor(private store:Store) {
		this.menteesOfMentorResponse$ = store.select(selectGetMenteesOfMentorResponse)
		this.menteesOfMentorLoading$ = store.select(selectGetMenteesOfMentorLoading)
		this.menteesOfMentorError$ = store.select(selectGetMenteesOfMentorError)
	}

	ngOnInit() {
		this.store.dispatch(getMenteesOfMentor())

		this.menteesOfMentorResponse$.subscribe(val=> {
			console.log(val)
		})
	}
}