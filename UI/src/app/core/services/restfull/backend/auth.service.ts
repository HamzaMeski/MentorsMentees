import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {LoginRequest, LoginResponse} from "../../../types/auth/login.types";
import {Observable} from "rxjs";
import {RegisterRequest, RegisterResponse} from "../../../types/auth/register.types";
import {UserResponse} from "../../../types/user/user.types";
import {serverApiUrl} from "../../../../../environments/env";


@Injectable({
	providedIn: 'root'
})
export class AuthService {
	private readonly API_URL: string = serverApiUrl

	constructor(private http: HttpClient) {}

	login(request: LoginRequest): Observable<LoginResponse> {
		return this.http.post<LoginResponse>(`${this.API_URL}/auth/login`, request)
	}

	register(request: RegisterRequest): Observable<RegisterResponse> {
		return this.http.post<RegisterResponse>(`${this.API_URL}/users/register`, request)
	}

	getAuthenticatedUser(): Observable<UserResponse> {
		return this.http.get<UserResponse>(`${this.API_URL}/auth/authenticatedUser`)
	}
}
