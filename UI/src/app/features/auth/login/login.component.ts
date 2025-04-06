import {Component} from '@angular/core';
import {RouterLink} from "@angular/router";
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {CommonModule, NgClass} from "@angular/common";
import {Observable} from "rxjs";
import {Store} from "@ngrx/store";
import {LoginRequest} from "../../../core/types/auth/login.types";
import {login} from "../../../ngrx/actions/auth/login.actions";
import {selectLoginError, selectLoginLoading} from "../../../ngrx/selectors/auth/login.selectors";

@Component({
    standalone: true,
    selector: 'login',
    imports: [
        RouterLink,
        ReactiveFormsModule,
        NgClass,
        CommonModule
    ],
    template: `
        <section class="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-zinc-900 flex items-center justify-center p-4 md:p-8">
            <div class="w-full max-w-md bg-gray-800/30 rounded-2xl shadow-2xl overflow-hidden backdrop-blur-sm border border-gray-700/50">
                <!-- Form Section -->
                <div class="w-full p-6 md:p-8">
                    <form [formGroup]="myForm" (ngSubmit)="onSubmit()" class="space-y-6">
                        <div class="text-center mb-8">
                            <h1 class="text-3xl font-bold text-white mb-2">Welcome Back</h1>
                            <p class="text-gray-400">Sign in to your account</p>
                        </div>

                        <!-- Alert Messages -->
                        <div class="mb-6">
                            <div *ngIf="loading$ | async" class="text-center text-gray-300">
                                <div class="flex items-center justify-center gap-2">
                                    <svg class="animate-spin h-5 w-5 text-indigo-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                        <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                                        <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                    </svg>
                                    <span>Signing in...</span>
                                </div>
                            </div>
                            <div *ngIf="error$ | async as error"
                                 class="bg-red-500/10 border border-red-500/50 text-red-400 px-4 py-3 rounded-lg flex items-center gap-2">
                                <svg class="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"/>
                                </svg>
                                {{ error }}
                            </div>
                        </div>

                        <!-- Email -->
                        <div class="space-y-2">
                            <label class="text-sm font-medium text-gray-300">Email Address</label>
                            <div class="relative">
                                <input
                                    type="email"
                                    formControlName="email"
                                    class="w-full px-4 py-2.5 bg-gray-900/50 border border-gray-700 focus:border-indigo-500 rounded-lg text-gray-100 placeholder-gray-500 focus:ring-2 focus:ring-indigo-500/20 transition-all duration-300 pl-10"
                                    placeholder="you@example.com"
                                >
                                <svg class="h-5 w-5 text-gray-500 absolute left-3 top-1/2 transform -translate-y-1/2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207" />
                                </svg>
                            </div>
                            <div *ngIf="myForm.get('email')?.invalid && myForm.get('email')?.touched" class="space-y-1">
                                <small *ngIf="myForm.get('email')?.errors?.['required']" class="text-red-400 text-xs">Email is required</small>
                                <small *ngIf="myForm.get('email')?.errors?.['email']" class="text-red-400 text-xs">Please enter a valid email</small>
                            </div>
                        </div>

                        <!-- Password -->
                        <div class="space-y-2">
                            <label class="text-sm font-medium text-gray-300">Password</label>
                            <div class="relative">
                                <input
                                    type="password"
                                    formControlName="password"
                                    class="w-full px-4 py-2.5 bg-gray-900/50 border border-gray-700 focus:border-indigo-500 rounded-lg text-gray-100 placeholder-gray-500 focus:ring-2 focus:ring-indigo-500/20 transition-all duration-300 pl-10"
                                    placeholder="••••••••"
                                >
                                <svg class="h-5 w-5 text-gray-500 absolute left-3 top-1/2 transform -translate-y-1/2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                                </svg>
                            </div>
                            <div *ngIf="myForm.get('password')?.invalid && myForm.get('password')?.touched" class="space-y-1">
                                <small *ngIf="myForm.get('password')?.errors?.['required']" class="text-red-400 text-xs">Password is required</small>
                                <small *ngIf="myForm.get('password')?.errors?.['minlength']" class="text-red-400 text-xs">Minimum 3 characters</small>
                            </div>
                        </div>

                        <!-- Remember Me & Forgot Password -->
                        <div class="flex items-center justify-between">
                            <div class="flex items-center">
                                <input type="checkbox" id="remember" class="h-4 w-4 rounded border-gray-700 bg-gray-900/50 text-indigo-500 focus:ring-indigo-500/20">
                                <label for="remember" class="ml-2 text-sm text-gray-400">Remember me</label>
                            </div>
                            <a href="#" class="text-sm text-indigo-400 hover:text-indigo-300 transition-colors duration-300">Forgot password?</a>
                        </div>

                        <!-- Actions -->
                        <div class="space-y-4 pt-4">
                            <button
                                type="submit"
                                [disabled]="myForm.invalid"
                                class="w-full py-3 px-4 bg-gradient-to-r from-indigo-600 to-indigo-500 hover:from-indigo-500 hover:to-indigo-600 text-white font-medium rounded-lg transition-all duration-300 transform hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 disabled:hover:bg-gray-700 flex items-center justify-center gap-2"
                            >
                                <span>Sign In</span>
                                <svg *ngIf="!(loading$ | async)" class="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                                </svg>
                            </button>

                            <div class="text-center space-y-4">
                                <a
                                    routerLink="/auth/register"
                                    class="block text-indigo-400 hover:text-indigo-300 text-sm font-medium transition-colors duration-300"
                                >
                                    Don't have an account? Sign up
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
export class LoginComponent  {
    loading$: Observable<boolean>;
    error$: Observable<any>;

    myForm = new FormGroup({
        email: new FormControl('', [Validators.required, Validators.email]),
        password: new FormControl('', [Validators.required, Validators.minLength(8)])
    })

    constructor(private store: Store) {
        this.loading$ = this.store.select(selectLoginLoading)
        this.error$ = this.store.select(selectLoginError)
    }

    onSubmit() {
        if(this.myForm.valid) {
            const request: LoginRequest = this.myForm.value as LoginRequest
            this.store.dispatch(login({request}))
        }
    }
}
