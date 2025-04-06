import {Component, EventEmitter, OnInit, Output} from "@angular/core";
import {ActivatedRoute} from "@angular/router";
import {AsyncPipe, NgClass, NgIf} from "@angular/common";
import {FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {Store} from "@ngrx/store";
import {
	selectCreateSessionError,
	selectCreateSessionLoading,
	selectCreateSessionResponse
} from "../../../../../ngrx/selectors/session/session.selectors";
import {createSession, getMentorSessions} from "../../../../../ngrx/actions/session/session.actions";

@Component({
	standalone: true,
	selector: 'add-session',
	imports: [
		AsyncPipe,
		FormsModule,
		NgIf,
		ReactiveFormsModule,
		NgClass
	],
	template: `
        <!-- Modal Container -->
        <div class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-gray-900/80 backdrop-blur-sm">
            <!-- Modal Content -->
            <div class="w-full max-w-md transform transition-all scale-100 opacity-100 animate-modal-in">
                <div class="bg-gradient-to-b from-gray-800 to-gray-900 rounded-2xl shadow-2xl border border-gray-700/50 overflow-hidden">
                    <!-- Header -->
                    <div class="px-6 pt-6 pb-4 border-b border-gray-700/50">
                        <div class="flex justify-between items-center mb-4">
                            <div class="flex items-center gap-3">
                                <div class="p-2 bg-indigo-500/10 rounded-lg">
                                    <svg class="w-5 h-5 text-indigo-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"/>
                                    </svg>
                                </div>
                                <h2 class="text-xl font-semibold text-white">Schedule Session</h2>
                            </div>
                            <button (click)="closeModal()"
                                    class="p-2 hover:bg-gray-700/50 rounded-lg transition-colors duration-200 group">
                                <svg class="w-5 h-5 text-gray-400 group-hover:text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
                                </svg>
                            </button>
                        </div>
                        <p class="text-gray-400 text-sm">Create and schedule mentoring sessions with your mentees</p>
                    </div>

                    <!-- Form Section -->
                    <div class="p-6">
                        <form [formGroup]="myForm" (ngSubmit)="onSubmit()" class="space-y-6">
                            <!-- Subject Input -->
                            <div class="space-y-2">
                                <label class="text-sm font-medium text-gray-300">Session Subject</label>
                                <div class="relative">
                                    <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                        <svg class="h-5 w-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"/>
                                        </svg>
                                    </div>
                                    <input
                                        formControlName="subject"
                                        placeholder="Enter session topic"
                                        class="w-full pl-10 pr-4 py-3 bg-gray-900/50 border border-gray-700 focus:border-indigo-500 rounded-lg text-gray-100 placeholder-gray-500 focus:ring-2 focus:ring-indigo-500/20 transition-all duration-300"
                                    />
                                </div>
                            </div>

                            <!-- Date/Time Input -->
                            <div class="space-y-2">
                                <label class="text-sm font-medium text-gray-300">Session Date & Time</label>
                                <div class="relative">
                                    <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                        <svg class="h-5 w-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"/>
                                        </svg>
                                    </div>
                                    <input
                                        type="datetime-local"
                                        formControlName="sessionDate"
                                        class="w-full pl-10 pr-4 py-3 bg-gray-900/50 border border-gray-700 focus:border-indigo-500 rounded-lg text-gray-100 focus:ring-2 focus:ring-indigo-500/20 transition-all duration-300"
                                    />
                                </div>
                            </div>

                            <!-- Submit Button -->
                            <button
                                type="submit"
                                [disabled]="myForm.invalid"
                                class="w-full flex items-center justify-center gap-2 px-6 py-3 rounded-lg text-white font-medium transition-all duration-300 transform hover:scale-[1.02]"
                                [ngClass]="myForm.invalid ? 
                            'bg-gray-600 cursor-not-allowed opacity-50' : 
                            'bg-gradient-to-r from-indigo-600 to-indigo-500 hover:from-indigo-500 hover:to-indigo-600'"
                            >
                        <span *ngIf="!(createSessionLoading$ | async)">
                            Schedule Session
                            <svg class="w-5 h-5 inline-block ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7l5 5m0 0l-5 5m5-5H6"/>
                            </svg>
                        </span>
                                <svg *ngIf="createSessionLoading$ | async"
                                     class="animate-spin h-5 w-5"
                                     xmlns="http://www.w3.org/2000/svg"
                                     fill="none"
                                     viewBox="0 0 24 24">
                                    <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                                    <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                </svg>
                            </button>
                        </form>

                        <!-- Response Messages -->
                        <div class="mt-6 space-y-4">
                            <!-- Success Message -->
                            <div *ngIf="createSessionResponse$ | async"
                                 class="flex items-center gap-3 p-4 bg-green-500/10 border border-green-500/50 rounded-lg text-green-400">
                                <svg class="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
                                </svg>
                                <span>Session scheduled successfully!</span>
                            </div>

                            <!-- Error Message -->
                            <div *ngIf="createSessionError$ | async as error"
                                 class="flex items-center gap-3 p-4 bg-red-500/10 border border-red-500/50 rounded-lg text-red-400">
                                <svg class="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
                                </svg>
                                <span>{{ error }}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
	`
})
export class AddSessionComponent implements OnInit {
	createSessionResponse$
	createSessionLoading$
	createSessionError$
	@Output() close = new EventEmitter<void>()

	menteeId!: number

	constructor(
		private route: ActivatedRoute,
		private store: Store
	) {
		this.createSessionResponse$ = this.store.select(selectCreateSessionResponse)
		this.createSessionLoading$ = this.store.select(selectCreateSessionLoading)
		this.createSessionError$ = this.store.select(selectCreateSessionError)
	}

	ngOnInit() {
		this.menteeId = Number(this.route.snapshot.paramMap.get('id'));
	}

	myForm = new FormGroup({
		subject: new FormControl('', [Validators.required]),
		sessionDate: new FormControl('', [Validators.required]),
	})

	onSubmit() {
		if (this.myForm.valid) {
			this.store.dispatch(createSession({
				request: {
					menteeId: this.menteeId,
					subject: this.myForm.value.subject!,
					sessionDate: this.myForm.value.sessionDate!,
				}
			}))

			this.createSessionResponse$.subscribe(()=> {
				this.store.dispatch(getMentorSessions({menteeId: this.menteeId}))
			})
		}
	}

	closeModal() {
		this.close.emit()
	}
}
