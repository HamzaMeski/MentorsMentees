import {Component, OnInit} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { NgIf, AsyncPipe } from '@angular/common';
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

            <form [formGroup]="profileForm" (ngSubmit)="onSubmit()" class="flex flex-col gap-4">
                <div *ngIf="authUserLoading$ | async">Loading user data...</div>
                <div *ngIf="authUserError$ | async as error" class="text-red-500">{{ error }}</div>

                <div class="flex flex-col">
                    <label>First Name</label>
                    <input type="text" formControlName="firstName" class="bg-gray-200 text-black p-1 rounded-md">
                </div>

                <div class="flex flex-col">
                    <label>Last Name</label>
                    <input type="text" formControlName="lastName" class="bg-gray-200 text-black p-1 rounded-md">
                </div>

                <div class="flex flex-col">
                    <label>Email</label>
                    <input type="email" formControlName="email" class="bg-gray-200 text-black p-1 rounded-md">
                </div>

                <div class="flex flex-col">
                    <label>Phone</label>
                    <input type="text" formControlName="phone" class="bg-gray-200 text-black p-1 rounded-md">
                </div>

                <div class="flex flex-col">
                    <label>Bio</label>
                    <textarea formControlName="bio" class="bg-gray-200 text-black p-1 rounded-md"></textarea>
                </div>

                <button
                    type="submit"
                    class="rounded-full py-2 px-10 text-white transition-all duration-300"
                    [disabled]="profileForm.invalid"
                    [ngClass]="profileForm.invalid ? 'bg-blue-300 text-gray-600': 'bg-blue-500 hover:bg-blue-600 cursor-pointer'"
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

	profileForm = new FormGroup({
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
				this.profileForm.patchValue({
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
		if (this.profileForm.valid) {
			const request: UpdateRequest = this.profileForm.value as UpdateRequest
			this.store.dispatch(updateUserProfile({ request: request }));
		}
	}

	ngOnInit() {
		this.store.dispatch(loadUserProfile())
	}
}
