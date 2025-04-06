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
        <section class="p-6 space-y-8">
            <!-- Header Section -->
            <div class="max-w-4xl mx-auto text-center space-y-4">
                <div class="inline-block p-2 bg-indigo-500/10 rounded-xl backdrop-blur-sm border border-indigo-500/20 mb-4">
                    <svg class="w-8 h-8 text-indigo-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"/>
                    </svg>
                </div>
                <h1 class="text-3xl font-bold text-white">My Mentoring Sessions</h1>
                <p class="text-gray-400 text-lg max-w-2xl mx-auto">
                    Track and manage all your scheduled mentoring sessions. Stay organized and never miss an appointment.
                </p>
            </div>

            <!-- Stats Overview -->
            <div class="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <div class="bg-gray-800/30 backdrop-blur-sm rounded-xl p-6 border border-gray-700/50">
                    <div class="flex items-center gap-4">
                        <div class="p-3 bg-blue-500/10 rounded-lg">
                            <svg class="w-6 h-6 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/>
                            </svg>
                        </div>
                        <div>
                            <p class="text-gray-400 text-sm">Upcoming Sessions</p>
                            <h3 class="text-2xl font-bold text-white">{{ (mentorSessionsResponse$ | async)?.length || 0 }}</h3>
                        </div>
                    </div>
                </div>

                <div class="bg-gray-800/30 backdrop-blur-sm rounded-xl p-6 border border-gray-700/50">
                    <div class="flex items-center gap-4">
                        <div class="p-3 bg-green-500/10 rounded-lg">
                            <svg class="w-6 h-6 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
                            </svg>
                        </div>
                        <div>
                            <p class="text-gray-400 text-sm">Completed Sessions</p>
                            <h3 class="text-2xl font-bold text-white">0</h3>
                        </div>
                    </div>
                </div>

                <div class="bg-gray-800/30 backdrop-blur-sm rounded-xl p-6 border border-gray-700/50">
                    <div class="flex items-center gap-4">
                        <div class="p-3 bg-purple-500/10 rounded-lg">
                            <svg class="w-6 h-6 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/>
                            </svg>
                        </div>
                        <div>
                            <p class="text-gray-400 text-sm">Total Hours</p>
                            <h3 class="text-2xl font-bold text-white">0</h3>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Loading State -->
            <div *ngIf="mentorSessionsLoading$ | async" class="flex justify-center items-center py-12">
                <div class="flex items-center gap-3">
                    <svg class="animate-spin h-8 w-8 text-indigo-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                        <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    <span class="text-lg text-gray-400">Loading your sessions...</span>
                </div>
            </div>

            <!-- Error State -->
            <div *ngIf="mentorSessionsError$ | async as error"
                 class="max-w-2xl mx-auto p-6 bg-red-500/10 border-l-4 border-red-500 rounded-r-lg">
                <div class="flex items-center gap-3 text-red-400">
                    <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
                    </svg>
                    <p class="text-lg">{{ error }}</p>
                </div>
            </div>

            <!-- Sessions Grid -->
            <div *ngIf="mentorSessionsResponse$ | async">
                <ng-container *ngIf="mentorSessionsResponse$ | async as sessions">
                    <!-- Empty State -->
                    <div *ngIf="sessions.length === 0" class="text-center py-12">
                        <div class="max-w-sm mx-auto space-y-4">
                            <div class="p-4 bg-gray-700/20 rounded-full inline-block">
                                <svg class="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"/>
                                </svg>
                            </div>
                            <h3 class="text-xl font-medium text-gray-300">No Sessions Yet</h3>
                            <p class="text-gray-400">Start by creating your first mentoring session.</p>
                            <button class="mt-4 px-6 py-3 bg-indigo-600 hover:bg-indigo-700 rounded-lg text-white transition-colors">
                                Schedule New Session
                            </button>
                        </div>
                    </div>

                    <!-- Sessions Cards -->
                    <div *ngIf="sessions.length > 0" class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        <div *ngFor="let session of sessions"
                             class="group bg-gray-800/30 backdrop-blur-sm rounded-xl border border-gray-700/50 overflow-hidden hover:border-gray-600/50 transition-all duration-300">
                            <div class="p-6 space-y-4">
                                <div class="flex items-center justify-between">
                                    <div class="p-2 bg-indigo-500/10 rounded-lg">
                                        <svg class="w-5 h-5 text-indigo-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"/>
                                        </svg>
                                    </div>
                                    <span class="text-sm text-gray-400">Session ID: #{{ session.id }}</span>
                                </div>

                                <div>
                                    <h3 class="text-xl font-semibold text-white group-hover:text-indigo-400 transition-colors">
                                        {{ session.subject }}
                                    </h3>
                                    <p class="mt-2 text-sm text-gray-400">
                                        Scheduled for {{ session.sessionDate | date: 'MMM d, y, h:mm a' }}
                                    </p>
                                </div>

                                <div class="pt-4 border-t border-gray-700/50">
                                    <p class="text-sm text-gray-400">
                                        Created {{ session.createdAt | date: 'MMM d, y' }}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </ng-container>
            </div>
        </section>
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

		this.mentorSessionsResponse$.subscribe(val => console.log(val))
	}
}