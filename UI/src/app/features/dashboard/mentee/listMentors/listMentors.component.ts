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
        <div class="p-6 space-y-8">
            <!-- Header Section -->
            <div class="space-y-6">
                <div class="flex items-center justify-between">
                    <div>
                        <h1 class="text-3xl font-bold bg-gradient-to-r from-blue-400 to-indigo-400 bg-clip-text text-transparent">
                            My Mentors
                        </h1>
                        <p class="text-gray-400 mt-2">Connect and track your mentorship journey</p>
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
                                <p class="text-gray-400 text-sm">Total Mentors</p>
                                <h3 class="text-2xl font-bold text-white">{{ (mentorsOfMenteeResponse$ | async)?.length || 0 }}</h3>
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
                                <h3 class="text-2xl font-bold text-white">12</h3>
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
                                <p class="text-gray-400 text-sm">Hours Learned</p>
                                <h3 class="text-2xl font-bold text-white">48</h3>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Table Section -->
            <div class="bg-gray-800/30 rounded-xl border border-gray-700/50 overflow-hidden backdrop-blur-sm">
                <!-- Loading Spinner -->
                <div *ngIf="mentorsOfMenteeLoading$ | async" class="p-8 flex justify-center">
                    <div class="flex items-center gap-3">
                        <svg class="animate-spin h-5 w-5 text-indigo-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                            <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        <span class="text-gray-400">Loading your mentors...</span>
                    </div>
                </div>

                <!-- Error Message -->
                <div *ngIf="mentorsOfMenteeError$ | async as error" class="p-6 bg-red-500/10 border-l-4 border-red-500">
                    <div class="flex items-center gap-3 text-red-400">
                        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
                        </svg>
                        <p>{{ error }}</p>
                    </div>
                </div>

                <!-- Mentors Table -->
                <div class="overflow-x-auto">
                    <table *ngIf="mentorsOfMenteeResponse$ | async as mentors" class="w-full">
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
                        <tr *ngFor="let mentor of mentors" class="hover:bg-gray-700/20 transition-colors">
                            <td class="px-6 py-4">{{ mentor.id }}</td>
                            <td class="px-6 py-4">{{ mentor.firstName }}</td>
                            <td class="px-6 py-4">{{ mentor.lastName }}</td>
                            <td class="px-6 py-4">{{ mentor.email }}</td>
                            <td class="px-6 py-4">{{ mentor.phone }}</td>
                            <td class="px-6 py-4 max-w-xs truncate">{{ mentor.bio }}</td>
                            <td class="px-6 py-4">
                                <a [routerLink]="['/dashboard/myMentors/menteeSession', mentor.id]"
                                   class="inline-flex items-center gap-2 px-4 py-2 bg-indigo-600 hover:bg-indigo-700 rounded-lg text-sm font-medium transition-colors duration-300">
                                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/>
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"/>
                                    </svg>
                                    View Sessions
                                </a>
                            </td>
                        </tr>
                        </tbody>
                    </table>

                    <!-- No Mentors Found -->
                    <div *ngIf="(mentorsOfMenteeResponse$ | async)?.length === 0" class="p-8 text-center">
                        <div class="max-w-sm mx-auto space-y-4">
                            <div class="p-4 bg-gray-700/20 rounded-full inline-block">
                                <svg class="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"/>
                                </svg>
                            </div>
                            <h3 class="text-lg font-medium text-gray-300">No mentors found</h3>
                            <p class="text-gray-400 text-sm">Start by connecting with mentors to begin your learning journey.</p>
                        </div>
                    </div>
                </div>
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
	}
}