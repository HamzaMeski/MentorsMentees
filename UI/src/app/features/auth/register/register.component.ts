import {Component} from '@angular/core';
import {RouterLink} from "@angular/router";
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {CommonModule, NgClass} from "@angular/common";
import {Store} from "@ngrx/store";
import {selectRegisterError, selectRegisterLoading} from "../../../ngrx/selectors/auth/register.selectors";
import {Observable} from "rxjs";
import {RegisterRequest} from "../../../core/types/auth/register.types";
import {register} from "../../../ngrx/actions/auth/register.actions";

@Component({
    standalone: true,
    selector: 'register',
    imports: [
        RouterLink,
        ReactiveFormsModule,
        CommonModule
    ],
    template: `
        <section class="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-zinc-900 flex items-center justify-center p-4 md:p-8">
            <div class="w-full max-w-xl bg-gray-800/30 rounded-2xl shadow-2xl overflow-hidden backdrop-blur-sm border border-gray-700/50">
                <!-- Form Section -->
                <div class="w-full p-6 md:p-8">
                    <form [formGroup]="myForm" (ngSubmit)="onSubmit()" class="space-y-6">
                        <div class="text-center mb-8">
                            <h1 class="text-3xl font-bold text-white mb-2">Create Account</h1>
                            <p class="text-gray-400">Join our community of mentors and mentees</p>
                        </div>

                        <!-- Alert Messages -->
                        <div class="mb-6">
                            <div *ngIf="loading$ | async" class="text-center text-gray-300">
                                <div class="animate-pulse">Processing...</div>
                            </div>
                            <div *ngIf="error$ | async as error" class="bg-red-500/10 border border-red-500/50 text-red-400 px-4 py-2 rounded-lg">
                                {{ error }}
                            </div>
                        </div>

                        <!-- Form Grid -->
                        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <!-- First Name -->
                            <div class="space-y-2">
                                <label class="text-sm font-medium text-gray-300">First Name</label>
                                <input
                                    type="text"
                                    formControlName="firstName"
                                    class="w-full px-4 py-2.5 bg-gray-900/50 border border-gray-700 focus:border-indigo-500 rounded-lg text-gray-100 placeholder-gray-500 focus:ring-2 focus:ring-indigo-500/20 transition-all duration-300"
                                    placeholder="Enter your first name"
                                >
                                <div *ngIf="myForm.get('firstName')?.invalid && myForm.get('firstName')?.touched" class="space-y-1">
                                    <small *ngIf="myForm.get('firstName')?.errors?.['required']" class="text-red-400 text-xs">First name is required</small>
                                    <small *ngIf="myForm.get('firstName')?.errors?.['minlength']" class="text-red-400 text-xs">Minimum 3 characters</small>
                                </div>
                            </div>

                            <!-- Last Name -->
                            <div class="space-y-2">
                                <label class="text-sm font-medium text-gray-300">Last Name</label>
                                <input
                                    type="text"
                                    formControlName="lastName"
                                    class="w-full px-4 py-2.5 bg-gray-900/50 border border-gray-700 focus:border-indigo-500 rounded-lg text-gray-100 placeholder-gray-500 focus:ring-2 focus:ring-indigo-500/20 transition-all duration-300"
                                    placeholder="Enter your last name"
                                >
                                <div *ngIf="myForm.get('lastName')?.invalid && myForm.get('lastName')?.touched" class="space-y-1">
                                    <small *ngIf="myForm.get('lastName')?.errors?.['required']" class="text-red-400 text-xs">Last name is required</small>
                                    <small *ngIf="myForm.get('lastName')?.errors?.['minlength']" class="text-red-400 text-xs">Minimum 3 characters</small>
                                </div>
                            </div>
                        </div>

                        <!-- Email -->
                        <div class="space-y-2">
                            <label class="text-sm font-medium text-gray-300">Email Address</label>
                            <input
                                type="email"
                                formControlName="email"
                                class="w-full px-4 py-2.5 bg-gray-900/50 border border-gray-700 focus:border-indigo-500 rounded-lg text-gray-100 placeholder-gray-500 focus:ring-2 focus:ring-indigo-500/20 transition-all duration-300"
                                placeholder="you@example.com"
                            >
                            <div *ngIf="myForm.get('email')?.invalid && myForm.get('email')?.touched" class="space-y-1">
                                <small *ngIf="myForm.get('email')?.errors?.['required']" class="text-red-400 text-xs">Email is required</small>
                                <small *ngIf="myForm.get('email')?.errors?.['email']" class="text-red-400 text-xs">Please enter a valid email</small>
                            </div>
                        </div>

                        <!-- Password -->
                        <div class="space-y-2">
                            <label class="text-sm font-medium text-gray-300">Password</label>
                            <input
                                type="password"
                                formControlName="password"
                                class="w-full px-4 py-2.5 bg-gray-900/50 border border-gray-700 focus:border-indigo-500 rounded-lg text-gray-100 placeholder-gray-500 focus:ring-2 focus:ring-indigo-500/20 transition-all duration-300"
                                placeholder="••••••••"
                            >
                            <div *ngIf="myForm.get('password')?.invalid && myForm.get('password')?.touched" class="space-y-1">
                                <small *ngIf="myForm.get('password')?.errors?.['required']" class="text-red-400 text-xs">Password is required</small>
                                <small *ngIf="myForm.get('password')?.errors?.['minlength']" class="text-red-400 text-xs">Minimum 3 characters</small>
                            </div>
                        </div>

                        <!-- Phone -->
                        <div class="space-y-2">
                            <label class="text-sm font-medium text-gray-300">Phone Number</label>
                            <input
                                type="tel"
                                formControlName="phone"
                                class="w-full px-4 py-2.5 bg-gray-900/50 border border-gray-700 focus:border-indigo-500 rounded-lg text-gray-100 placeholder-gray-500 focus:ring-2 focus:ring-indigo-500/20 transition-all duration-300"
                                placeholder="Enter your phone number"
                            >
                            <div *ngIf="myForm.get('phone')?.invalid && myForm.get('phone')?.touched" class="space-y-1">
                                <small *ngIf="myForm.get('phone')?.errors?.['required']" class="text-red-400 text-xs">Phone is required</small>
                                <small *ngIf="myForm.get('phone')?.errors?.['minlength']" class="text-red-400 text-xs">Minimum 3 characters</small>
                            </div>
                        </div>

                        <!-- Bio -->
                        <div class="space-y-2">
                            <label class="text-sm font-medium text-gray-300">Bio <span class="text-gray-500 text-xs">(optional)</span></label>
                            <textarea
                                formControlName="bio"
                                rows="3"
                                class="w-full px-4 py-2.5 bg-gray-900/50 border border-gray-700 focus:border-indigo-500 rounded-lg text-gray-100 placeholder-gray-500 focus:ring-2 focus:ring-indigo-500/20 transition-all duration-300"
                                placeholder="Tell us about yourself..."
                            ></textarea>
                        </div>

                        <!-- Actions -->
                        <div class="space-y-4 pt-4">
                            <button
                                type="submit"
                                [disabled]="myForm.invalid"
                                class="w-full py-3 px-4 bg-gradient-to-r from-indigo-600 to-indigo-500 hover:from-indigo-500 hover:to-indigo-600 text-white font-medium rounded-lg transition-all duration-300 transform hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 disabled:hover:bg-gray-700"
                            >
                                Create Account
                            </button>

                            <div class="text-center space-y-4">
                                <a
                                    routerLink="/auth/login"
                                    class="block text-indigo-400 hover:text-indigo-300 text-sm font-medium transition-colors duration-300"
                                >
                                    Already have an account? Sign in
                                </a>

                                <div class="relative">
                                    <div class="absolute inset-0 flex items-center">
                                        <div class="w-full border-t border-gray-700"></div>
                                    </div>
                                    <div class="relative flex justify-center text-xs uppercase">
                                        <span class="bg-gray-800/30 px-2 text-gray-500">or</span>
                                    </div>
                                </div>

                                <a
                                    routerLink="/"
                                    class="flex items-center justify-center gap-2 text-gray-400 hover:text-gray-300 text-sm font-medium transition-colors duration-300"
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                                    </svg>
                                    Back to home
                                </a>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </section>
    `
})
export class RegisterComponent {
    loading$: Observable<boolean>;
    error$: Observable<any>;

    myForm = new FormGroup({
        firstName: new FormControl('', [Validators.required, Validators.minLength(3)]),
        lastName: new FormControl('', [Validators.required, Validators.minLength(3)]),
        email: new FormControl('', [Validators.required, Validators.email]),
        password: new FormControl('', [Validators.required, Validators.minLength(8)]),
        phone: new FormControl('', [Validators.required, Validators.minLength(10)]),
        bio: new FormControl('', []),
    })

    constructor(private store: Store) {
        this.loading$ = this.store.select(selectRegisterLoading)
        this.error$ = this.store.select(selectRegisterError)
    }

    onSubmit() {
        if(this.myForm.valid) {
            const request: RegisterRequest = this.myForm.value as RegisterRequest
            this.store.dispatch(register({request}))
        }
    }
}
