import {Component, OnInit} from "@angular/core";
import {ActivatedRoute} from "@angular/router";
import {AsyncPipe, NgClass, NgIf} from "@angular/common";
import {FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {Store} from "@ngrx/store";
import {
	selectCreateSessionError,
	selectCreateSessionLoading,
	selectCreateSessionResponse
} from "../../../../../ngrx/selectors/session/session.selectors";
import {createSession} from "../../../../../ngrx/actions/session/session.actions";

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
        <div class="fixed inset-0 z-50 flex items-center justify-center">
            <!-- Modal Content -->
            <div class="bg-[#2B2D31] w-full max-w-md p-6 rounded-2xl shadow-lg">
                <!-- Modal Header -->
                <div class="mb-4">
                    <h2 class="text-white text-[18px] font-semibold">Session Schedule</h2>
                    <p class="text-[#949BA4] text-[14px]">You can create sessions with your mentees.</p>
                </div>

                <!-- Form -->
                <form [formGroup]="myForm" (ngSubmit)="onSubmit()" class="space-y-4">
                    <input
                        formControlName="subject"
                        placeholder="Set session subject"
                        class="bg-[#1E1F22] border border-[#313338] rounded-md w-full text-[#DBDEE1] placeholder-[#949BA4] text-[15px] p-3 focus:outline-none focus:ring-2 focus:ring-[#5865F2]"
                    />

                    <input
                        type="datetime-local"
                        formControlName="sessionDate"
                        class="bg-[#1E1F22] border border-[#313338] rounded-md w-full text-[#DBDEE1] placeholder-[#949BA4] text-[15px] p-3 focus:outline-none focus:ring-2 focus:ring-[#5865F2]"
                    />

                    <button
                        [disabled]="myForm.invalid"
                        [ngClass]="myForm.invalid ? 'bg-[#4752C4] opacity-50 cursor-not-allowed' : 'bg-[#5865F2] hover:bg-[#4752C4]'"
                        class="w-full p-3 rounded-md text-white text-[14px] font-medium flex items-center justify-center transition-colors"
                        type="submit"
                    >
                        <div *ngIf="!(createSessionLoading$ | async)">Create Mentoring</div>
                        <div *ngIf="createSessionLoading$ | async" class="w-6 h-6">
                            <svg aria-hidden="true" class="w-5 h-5 text-[#1E1F22] animate-spin fill-white"
                                 viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path
                                    d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                                    fill="currentColor"/>
                                <path
                                    d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                                    fill="currentFill"/>
                            </svg>
                        </div>
                    </button>
                </form>

                <!-- Response / Error Messages -->
                <div *ngIf="createSessionResponse$ | async" class="mt-4 text-green-500 text-[15px]">
                    Session Schedule Created Successfully
                </div>
                <div *ngIf="createSessionError$ | async as error" class="mt-4 text-red-500 text-[15px]">
                    {{ error }}
                </div>
            </div>
        </div>
	`
})
export class AddSessionComponent implements OnInit {
	createSessionResponse$
	createSessionLoading$
	createSessionError$

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
		}
	}
}
