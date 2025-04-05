import {Injectable} from "@angular/core";
import {serverApiUrl} from "../../../../../environments/env";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {UserResponse} from "../../../types/user/user.types";
import {MentoringRequest, MentoringResponse} from "../../../types/mentoring/mentoring.types";

@Injectable({
	providedIn: 'root'
})
export class MentoringService {
	private readonly API_URL: string = serverApiUrl

	constructor(private http: HttpClient) {}

	create(request: MentoringRequest): Observable<MentoringResponse> {
		return this.http.post<MentoringResponse>(`${this.API_URL}/mentoring`, request)
	}

	getMenteesOfMentor(): Observable<UserResponse[]> {
		return this.http.get<UserResponse[]>(`${this.API_URL}/mentoring/menteesOfMentor}`)
	}

	getMentorsOfMentee(): Observable<UserResponse[]> {
		return this.http.get<UserResponse[]>(`${this.API_URL}/mentoring/mentorsOfMentee`)
	}

}