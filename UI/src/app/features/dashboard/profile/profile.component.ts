import {Component, OnInit} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { NgIf } from '@angular/common';
import {
	selectUserProfile,
	selectUserProfileError,
	selectUserProfileLoading
} from "../../../ngrx/selectors/userProfile/userProfile.selectors";
import {loadUserProfile, updateUserProfile} from "../../../ngrx/actions/userProfile/userProfile.actions";
import {UpdateRequest} from "../../../core/types/auth/update.types";

@Component({
	standalone: true,
	selector: 'profile',
	imports: [
		CommonModule,
		ReactiveFormsModule,
		NgIf
	],
	template: `
        <section class="min-h-screen bg-gradient-to-br from-gray-900 to-zinc-900 p-8">
            <div class="max-w-2xl mx-auto">
                <!-- Header -->
                <div class="text-center mb-8 space-y-4">
                    <div class="inline-block p-2 bg-indigo-500/10 rounded-xl backdrop-blur-sm border border-indigo-500/20">
                        <svg class="w-8 h-8 text-indigo-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"/>
                        </svg>
                    </div>
                    <h1 class="text-3xl font-bold text-white">Edit Your Profile</h1>
                    <p class="text-gray-400">Update your personal information and bio</p>
                </div>

                <!-- Form Card -->
                <div class="bg-gray-800/30 backdrop-blur-sm rounded-xl border border-gray-700/50 overflow-hidden">
                    <!-- Loading State -->
                    <div *ngIf="authUserLoading$ | async" class="p-8 flex justify-center">
                        <div class="flex items-center gap-3">
                            <svg class="animate-spin h-5 w-5 text-indigo-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                                <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                            </svg>
                            <span class="text-gray-400">Loading your profile...</span>
                        </div>
                    </div>

                    <!-- Error Message -->
                    <div *ngIf="authUserError$ | async as error"
                         class="p-6 bg-red-500/10 border-l-4 border-red-500">
                        <div class="flex items-center gap-3 text-red-400">
                            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
                            </svg>
                            <p>{{ error }}</p>
                        </div>
                    </div>

                    <!-- Form -->
                    <form [formGroup]="myForm" (ngSubmit)="onSubmit()" class="p-8 space-y-6">
                        <!-- First Name -->
                        <div class="space-y-2">
                            <label class="text-sm font-medium text-gray-300">First Name</label>
                            <div class="relative">
                                <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <svg class="h-5 w-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"/>
                                    </svg>
                                </div>
                                <input
                                    type="text"
                                    formControlName="firstName"
                                    class="w-full pl-10 pr-4 py-3 bg-gray-900/50 border border-gray-700 focus:border-indigo-500 rounded-lg text-gray-100 placeholder-gray-500 focus:ring-2 focus:ring-indigo-500/20 transition-all duration-300"
                                    placeholder="Enter your first name"
                                >
                            </div>
                            <div *ngIf="myForm.get('firstName')?.invalid && myForm.get('firstName')?.touched" class="space-y-1">
                                <small *ngIf="myForm.get('firstName')?.errors?.['required']" class="text-red-400 text-xs flex items-center gap-1">
                                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
                                    </svg>
                                    First name is required
                                </small>
                                <small *ngIf="myForm.get('firstName')?.errors?.['minlength']" class="text-red-400 text-xs flex items-center gap-1">
                                    Minimum 3 characters required
                                </small>
                            </div>
                        </div>

                        <!-- Last Name -->
                        <div class="space-y-2">
                            <label class="text-sm font-medium text-gray-300">Last Name</label>
                            <div class="relative">
                                <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <svg class="h-5 w-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"/>
                                    </svg>
                                </div>
                                <input
                                    type="text"
                                    formControlName="lastName"
                                    class="w-full pl-10 pr-4 py-3 bg-gray-900/50 border border-gray-700 focus:border-indigo-500 rounded-lg text-gray-100 placeholder-gray-500 focus:ring-2 focus:ring-indigo-500/20 transition-all duration-300"
                                    placeholder="Enter your last name"
                                >
                            </div>
                            <div *ngIf="myForm.get('lastName')?.invalid && myForm.get('lastName')?.touched" class="space-y-1">
                                <small *ngIf="myForm.get('lastName')?.errors?.['required']" class="text-red-400 text-xs">Last name is required</small>
                                <small *ngIf="myForm.get('lastName')?.errors?.['minlength']" class="text-red-400 text-xs">Minimum 3 characters required</small>
                            </div>
                        </div>

                        <!-- Email -->
                        <div class="space-y-2">
                            <label class="text-sm font-medium text-gray-300">Email Address</label>
                            <div class="relative">
                                <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <svg class="h-5 w-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207"/>
                                    </svg>
                                </div>
                                <input
                                    type="email"
                                    formControlName="email"
                                    class="w-full pl-10 pr-4 py-3 bg-gray-900/50 border border-gray-700 focus:border-indigo-500 rounded-lg text-gray-100 placeholder-gray-500 focus:ring-2 focus:ring-indigo-500/20 transition-all duration-300"
                                    placeholder="you@example.com"
                                >
                            </div>
                            <div *ngIf="myForm.get('email')?.invalid && myForm.get('email')?.touched" class="space-y-1">
                                <small *ngIf="myForm.get('email')?.errors?.['required']" class="text-red-400 text-xs">Email is required</small>
                                <small *ngIf="myForm.get('email')?.errors?.['email']" class="text-red-400 text-xs">Please enter a valid email</small>
                            </div>
                        </div>

                        <!-- Phone -->
                        <div class="space-y-2">
                            <label class="text-sm font-medium text-gray-300">Phone Number</label>
                            <div class="relative">
                                <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <svg class="h-5 w-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"/>
                                    </svg>
                                </div>
                                <input
                                    type="tel"
                                    formControlName="phone"
                                    class="w-full pl-10 pr-4 py-3 bg-gray-900/50 border border-gray-700 focus:border-indigo-500 rounded-lg text-gray-100 placeholder-gray-500 focus:ring-2 focus:ring-indigo-500/20 transition-all duration-300"
                                    placeholder="Enter your phone number"
                                >
                            </div>
                            <div *ngIf="myForm.get('phone')?.invalid && myForm.get('phone')?.touched" class="space-y-1">
                                <small *ngIf="myForm.get('phone')?.errors?.['required']" class="text-red-400 text-xs">Phone number is required</small>
                                <small *ngIf="myForm.get('phone')?.errors?.['minlength']" class="text-red-400 text-xs">Minimum 3 characters required</small>
                            </div>
                        </div>

                        <!-- Bio -->
                        <div class="space-y-2">
                            <label class="text-sm font-medium text-gray-300">Bio <span class="text-gray-500 text-xs">(optional)</span></label>
                            <textarea
                                formControlName="bio"
                                rows="4"
                                class="w-full px-4 py-3 bg-gray-900/50 border border-gray-700 focus:border-indigo-500 rounded-lg text-gray-100 placeholder-gray-500 focus:ring-2 focus:ring-indigo-500/20 transition-all duration-300"
                                placeholder="Tell us about yourself..."
                            ></textarea>
                        </div>

                        <!-- Submit Button -->
                        <button
                            type="submit"
                            [disabled]="myForm.invalid"
                            class="w-full flex items-center justify-center gap-2 px-6 py-3 rounded-lg text-white font-medium transition-all duration-300 transform hover:scale-105"
                            [ngClass]="myForm.invalid ? 
	                        'bg-gray-600 cursor-not-allowed opacity-50' : 
	                        'bg-gradient-to-r from-indigo-600 to-indigo-500 hover:from-indigo-500 hover:to-indigo-600'"
                        >
                            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
                            </svg>
                            Update Profile
                        </button>
                    </form>
                </div>
            </div>
        </section>
	`
})
export class ProfileComponent implements OnInit{
	authUserResponse$: Observable<any>
	authUserLoading$: Observable<boolean>
	authUserError$: Observable<any>

	myForm = new FormGroup({
		firstName: new FormControl('', [Validators.required, Validators.minLength(3)]),
		lastName: new FormControl('', [Validators.required, Validators.minLength(3)]),
		email: new FormControl('', [Validators.required, Validators.email]),
		phone: new FormControl('', [Validators.required, Validators.minLength(10)]),
		bio: new FormControl('', []),
	})

	constructor(private store: Store) {
		this.authUserResponse$ = this.store.select(selectUserProfile)
		this.authUserLoading$ = this.store.select(selectUserProfileLoading)
		this.authUserError$ = this.store.select(selectUserProfileError)

		// Pre-fill the form when user profile data is available
		this.authUserResponse$.subscribe((user) => {
			console.log(user)

			if (user) {
				this.myForm.patchValue({
					firstName: user.firstName,
					lastName: user.lastName,
					email: user.email,
					phone: user.phone,
					bio: user.bio
				});
			}
		});
	}

	onSubmit() {
		if (this.myForm.valid) {
			const request: UpdateRequest = this.myForm.value as UpdateRequest
			this.store.dispatch(updateUserProfile({ request: request }));
		}
	}

	ngOnInit() {
		this.store.dispatch(loadUserProfile())
	}
}
