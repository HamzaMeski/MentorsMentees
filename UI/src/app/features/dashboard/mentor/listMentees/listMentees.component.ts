import {AsyncPipe, CommonModule, NgClass} from "@angular/common";
import {Component, OnInit} from "@angular/core";
import {Store} from "@ngrx/store";
import {
	selectGetMenteesOfMentorError,
	selectGetMenteesOfMentorLoading,
	selectGetMenteesOfMentorResponse
} from "../../../../ngrx/selectors/mentoring/mentoring.selectors";
import {getMenteesOfMentor} from "../../../../ngrx/actions/mentoring/mentoring.actions";
import {RouterLink} from "@angular/router";


@Component({
	standalone: true,
	selector: 'list-mentees',
	imports: [
		AsyncPipe,
		CommonModule,
		RouterLink
	],
	template: `
        <div class="p-6 text-white space-y-8">
            <!-- Header Section -->
            <div class="space-y-6">
                <div class="flex items-center justify-between">
                    <div>
                        <p class="text-gray-400 mt-2">Manage and track your mentorship relationships</p>
                    </div>
                </div>

                <!-- Stats Cards -->
                <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div class="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700/50">
                        <div class="flex items-center gap-4">
                            <div class="p-3 bg-indigo-500/10 rounded-lg">
                                <svg class="w-6 h-6 text-indigo-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"/>
                                </svg>
                            </div>
                            <div>
                                <p class="text-gray-400 text-sm">Total Mentees</p>
                                <h3 class="text-2xl font-bold">{{ (menteesOfMentorResponse$ | async)?.length || 0 }}</h3>
                            </div>
                        </div>
                    </div>

                    <div class="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700/50">
                        <div class="flex items-center gap-4">
                            <div class="p-3 bg-green-500/10 rounded-lg">
                                <svg class="w-6 h-6 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"/>
                                </svg>
                            </div>
                            <div>
                                <p class="text-gray-400 text-sm">Active Sessions</p>
                                <h3 class="text-2xl font-bold">12</h3>
                            </div>
                        </div>
                    </div>

                    <div class="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700/50">
                        <div class="flex items-center gap-4">
                            <div class="p-3 bg-purple-500/10 rounded-lg">
                                <svg class="w-6 h-6 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/>
                                </svg>
                            </div>
                            <div>
                                <p class="text-gray-400 text-sm">Hours Mentored</p>
                                <h3 class="text-2xl font-bold">48</h3>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Table Section -->
            <div class="bg-gray-800/30 rounded-xl border border-gray-700/50 overflow-hidden backdrop-blur-sm">
                <div class="p-6 border-b border-gray-700/50">
                    <h2 class="text-xl font-semibold">Mentees List</h2>
                </div>

                <!-- Loading Spinner -->
                <div *ngIf="menteesOfMentorLoading$ | async" class="p-8 flex justify-center">
                    <div class="flex items-center gap-3">
                        <svg class="animate-spin h-5 w-5 text-indigo-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                            <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        <span class="text-gray-400">Loading mentees...</span>
                    </div>
                </div>

                <!-- Error Message -->
                <div *ngIf="menteesOfMentorError$ | async as error" class="p-6 bg-red-500/10 border-l-4 border-red-500">
                    <div class="flex items-center gap-3 text-red-400">
                        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
                        </svg>
                        <p>Error loading mentees: {{ error }}</p>
                    </div>
                </div>

                <!-- Mentees Table -->
                <div class="overflow-x-auto">
                    <table *ngIf="menteesOfMentorResponse$ | async as mentees" class="w-full">
                        <thead class="bg-gray-800/50 text-left text-sm uppercase text-gray-400">
                        <tr>
                            <th class="px-6 py-4 font-medium">ID</th>
                            <th class="px-6 py-4 font-medium">First Name</th>
                            <th class="px-6 py-4 font-medium">Last Name</th>
                            <th class="px-6 py-4 font-medium">Email</th>
                            <th class="px-6 py-4 font-medium">Phone</th>
                            <th class="px-6 py-4 font-medium">Bio</th>
                            <th class="px-6 py-4 font-medium">Actions</th>
                        </tr>
                        </thead>
                        <tbody class="divide-y divide-gray-700/50">
                        <tr *ngFor="let mentee of mentees" class="hover:bg-gray-700/20 transition-colors">
                            <td class="px-6 py-4">{{ mentee.id }}</td>
                            <td class="px-6 py-4">{{ mentee.firstName }}</td>
                            <td class="px-6 py-4">{{ mentee.lastName }}</td>
                            <td class="px-6 py-4">{{ mentee.email }}</td>
                            <td class="px-6 py-4">{{ mentee.phone }}</td>
                            <td class="px-6 py-4 max-w-xs truncate">{{ mentee.bio }}</td>
                            <td class="px-6 py-4">
                                <a [routerLink]="['/dashboard/myMentees/mentorSession', mentee.id]"
                                   class="inline-flex items-center gap-2 px-4 py-2 bg-indigo-600 hover:bg-indigo-700 rounded-lg text-sm font-medium transition-colors duration-300">
                                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"/>
                                    </svg>
                                    Manage Sessions
                                </a>
                            </td>
                        </tr>
                        </tbody>
                    </table>

                    <!-- No Mentees Found -->
                    <div *ngIf="(menteesOfMentorResponse$ | async)?.length === 0" class="p-8 text-center">
                        <div class="max-w-sm mx-auto space-y-4">
                            <div class="p-4 bg-gray-700/20 rounded-full inline-block">
                                <svg class="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4"/>
                                </svg>
                            </div>
                            <h3 class="text-lg font-medium text-gray-300">No mentees found</h3>
                            <p class="text-gray-400 text-sm">Start by adding your first mentee to begin your mentorship journey.</p>
                        </div>
                    </div>
                </div>
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
	}
}