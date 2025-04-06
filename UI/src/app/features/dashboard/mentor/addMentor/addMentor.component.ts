import {Component, OnInit} from "@angular/core";
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {Store} from "@ngrx/store";
import {AsyncPipe, CommonModule, NgClass} from "@angular/common";
import {
	selectCreateMentoringError,
	selectCreateMentoringLoading, selectCreateMentoringResponse
} from "../../../../ngrx/selectors/mentoring/mentoring.selectors";
import {createMentoring, getMenteesOfMentor} from "../../../../ngrx/actions/mentoring/mentoring.actions";


@Component({
	standalone: true,
	selector: 'add-mentor',
	imports: [
		ReactiveFormsModule,
		NgClass,
		AsyncPipe,
		CommonModule
	],
	template: `
        <section class=" bg-gradient-to-br from-gray-900 to-zinc-900 p-6 md:p-8">
            <div class=" mx-auto">
                <!-- Header Section -->
                <div class="mb-8 space-y-4">
                    <div class="flex items-center gap-3">
                        <div class="p-2 bg-indigo-500/10 rounded-lg">
                            <svg class="w-6 h-6 text-indigo-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"/>
                            </svg>
                        </div>
                        <h1 class="text-2xl font-bold text-white">Create Mentoring Relationship</h1>
                    </div>
                    <p class="text-gray-400 text-lg">Connect with mentors or mentees to start your learning journey</p>
                </div>

                <!-- Main Content -->
                <div class="bg-gray-800/30 backdrop-blur-sm rounded-xl border border-gray-700/50 overflow-hidden">
                    <!-- Form Section -->
                    <div class="p-6">
                        <form [formGroup]="myForm" (ngSubmit)="onSubmit()" class="space-y-6">
                            <!-- Input Field -->
                            <div class="space-y-4">
                                <label class="block text-sm font-medium text-gray-300">Mentee ID</label>
                                <div class="relative">
                                    <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                        <svg class="h-5 w-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"/>
                                        </svg>
                                    </div>
                                    <input
                                        formControlName="menteeId"
                                        type="number"
                                        placeholder="Enter mentee's ID number"
                                        class="w-full pl-10 pr-4 py-3 bg-gray-900/50 border border-gray-700 focus:border-indigo-500 rounded-lg text-gray-100 placeholder-gray-500 focus:ring-2 focus:ring-indigo-500/20 transition-all duration-300"
                                    >
                                </div>

                                <!-- Validation Messages -->
                                <div class="space-y-2">
                                    <div *ngIf="myForm.get('individualId')?.invalid && myForm.get('individualId')?.touched"
                                         class="flex items-center gap-2 text-red-400 text-sm">
                                        <svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
                                        </svg>
                                        <span *ngIf="myForm.get('individualId')?.errors?.['required']">
                                    Individual ID is required
                                </span>
                                        <span *ngIf="myForm.get('individualId')?.errors?.['pattern']">
                                    Individual ID should be a number
                                </span>
                                    </div>
                                </div>
                            </div>

                            <!-- Submit Button -->
                            <button
                                type="submit"
                                [disabled]="myForm.invalid"
                                class=" flex items-center justify-center gap-2 px-6 py-3 rounded-lg text-white font-medium transition-all duration-300 transform hover:scale-[1.02]"
                                [ngClass]="myForm.invalid ? 
	                            'bg-gray-600 cursor-not-allowed opacity-50' : 
	                            'bg-gradient-to-r from-indigo-600 to-indigo-500 hover:from-indigo-500 hover:to-indigo-600'"
                            >
		                        <span *ngIf="!(createMentoringLoading$ | async)">
		                            <svg class="w-5 h-5 inline-block mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
		                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z"/>
		                            </svg>
		                            Create Mentoring Relationship
		                        </span>
                                <svg *ngIf="createMentoringLoading$ | async"
                                     class="animate-spin h-5 w-5 text-white"
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
                            <div *ngIf="createMentoringResponse$ | async"
                                 class="flex items-center gap-3 p-4 bg-green-500/10 border border-green-500/50 rounded-lg text-green-400">
                                <svg class="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
                                </svg>
                                <span>Mentoring request sent successfully!</span>
                            </div>

                            <!-- Error Message -->
                            <div *ngIf="createMentoringError$ | async as error"
                                 class="flex items-center gap-3 p-4 bg-red-500/10 border border-red-500/50 rounded-lg text-red-400">
                                <svg class="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
                                </svg>
                                <span>{{ error }}</span>
                            </div>
                        </div>
                    </div>

                    <!-- Help Section -->
                    <div class="border-t border-gray-700/50 bg-gray-800/30 p-6">
                        <div class="flex items-start gap-4">
                            <div class="p-2 bg-blue-500/10 rounded-lg">
                                <svg class="w-5 h-5 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
                                </svg>
                            </div>
                            <div>
                                <h3 class="text-sm font-medium text-gray-300">How it works</h3>
                                <p class="mt-1 text-sm text-gray-400">
                                    Enter the ID of the person you'd like to mentor. Once submitted, they'll receive a notification
                                    to accept or decline your mentoring request. You'll be notified of their response.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
	`
})
export class AddMentorComponent implements OnInit{
	createMentoringResponse$
	createMentoringLoading$
	createMentoringError$

	myForm = new FormGroup({
		menteeId: new FormControl('', [Validators.required, Validators.pattern('^[0-9]+$')])
	})

	constructor(private store:Store) {
		this.createMentoringResponse$ = this.store.select(selectCreateMentoringResponse)
		this.createMentoringLoading$ = this.store.select(selectCreateMentoringLoading)
		this.createMentoringError$ = this.store.select(selectCreateMentoringError)
	}

	onSubmit() {
		if(this.myForm.valid) {
			const menteeId: number  = Number(this.myForm.value.menteeId)
			this.store.dispatch(createMentoring({request: {menteeId: menteeId}}))
		}
	}

	ngOnInit() {
		this.createMentoringResponse$.subscribe(()=> {
			this.store.dispatch(getMenteesOfMentor())
		})
	}
}
