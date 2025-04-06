import {Injectable} from "@angular/core";
import {serverApiUrl} from "../../../../../environments/env";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {SessionRequest, SessionResponse} from "../../../types/session/session.types";


@Injectable({
	providedIn: 'root'
})
export class SessionService {
	private readonly API_URL: string = serverApiUrl

	constructor(private http: HttpClient) {}

	create(request: SessionRequest): Observable<SessionResponse> {
		return this.http.post<SessionResponse>(`${this.API_URL}/session`, request)
	}

	getMentorSessions(menteeId: number): Observable<SessionResponse[]> {
		return this.http.get<SessionResponse[]>(`${this.API_URL}/session/mentorSessions/${menteeId}`)
	}

	getMenteeSessions(mentorId: number): Observable<SessionResponse[]> {
		return this.http.get<SessionResponse[]>(`${this.API_URL}/session/menteeSessions/${mentorId}`)
	}
}