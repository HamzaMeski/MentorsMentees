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
        <section class="p-8 max-w-xl mx-auto">
            <h1 class="text-3xl font-bold mb-6">Edit Profile</h1>

            <form [formGroup]="myForm" (ngSubmit)="onSubmit()" class="flex flex-col gap-4">
                <div *ngIf="authUserLoading$ | async">Loading user data...</div>
                <div *ngIf="authUserError$ | async as error" class="text-red-500">{{ error }}</div>

                <div class="flex flex-col">
                    <label for="">first name:</label>
                    <input type="text" formControlName="firstName" class="bg-gray-200 text-black p-1 rounded-md">
                    <div *ngIf="myForm.get('firstName')?.invalid && myForm.get('firstName')?.touched">
                        <small *ngIf="myForm.get('firstName')?.errors?.['required']" class="text-red-500">first name is
                            required</small>
                        <small *ngIf="myForm.get('firstName')?.errors?.['minlength']" class="text-red-500">min length is
                            3</small>
                    </div>
                </div>

                <div class="flex flex-col">
                    <label for="">last name:</label>
                    <input type="text" formControlName="lastName" class="bg-gray-200 text-black p-1 rounded-md">
                    <div *ngIf="myForm.get('lastName')?.invalid && myForm.get('lastName')?.touched">
                        <small *ngIf="myForm.get('lastName')?.errors?.['required']" class="text-red-500">last name is
                            required</small>
                        <small *ngIf="myForm.get('lastName')?.errors?.['minlength']" class="text-red-500">min length is
                            3</small>
                    </div>
                </div>

                <div class="flex flex-col">
                    <label for="">email:</label>
                    <input type="text" formControlName="email" class="bg-gray-200 text-black p-1 rounded-md">
                    <div *ngIf="myForm.get('email')?.invalid && myForm.get('email')?.touched">
                        <small *ngIf="myForm.get('email')?.errors?.['required']" class="text-red-500">Email is
                            required</small>
                        <small *ngIf="myForm.get('email')?.errors?.['email']" class="text-red-500">Set a valid
                            email</small>
                    </div>
                </div>

                <div class="flex flex-col">
                    <label for="">phone:</label>
                    <input type="text" formControlName="phone" class="bg-gray-200 text-black p-1 rounded-md">
                    <div *ngIf="myForm.get('phone')?.invalid && myForm.get('phone')?.touched">
                        <small *ngIf="myForm.get('phone')?.errors?.['required']" class="text-red-500">phone is
                            required</small>
                        <small *ngIf="myForm.get('phone')?.errors?.['minlength']" class="text-red-500">min length is
                            3</small>
                    </div>
                </div>

                <div class="flex flex-col">
                    <label for="">bio:</label>
                    <textarea formControlName="bio" class="bg-gray-200 text-black p-1 rounded-md"></textarea>
                    <small>optional</small>
                </div>

                <button
                    type="submit"
                    class="rounded-full py-2 px-10 text-white transition-all duration-300"
                    [disabled]="myForm.invalid"
                    [ngClass]="myForm.invalid ? 'bg-blue-300 text-gray-600': 'bg-blue-500 hover:bg-blue-600 cursor-pointer'"
                >
                    Update Profile
                </button>
            </form>
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
