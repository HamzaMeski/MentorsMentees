import {Injectable} from "@angular/core";
import {Actions, createEffect, ofType} from "@ngrx/effects";
import {SessionService} from "../../../core/services/restfull/backend/session.service";
import {catchError, map, mergeMap, of, tap} from "rxjs";
import {
	createSession,
	createSessionFailure,
	createSessionSuccess, getMenteeSessions, getMenteeSessionsFailure, getMenteeSessionsSuccess,
	getMentorSessions, getMentorSessionsFailure, getMentorSessionsSuccess
} from "../../actions/session/session.actions";

@Injectable()
export class SessionEffects{
	create$
	getMentorSessions$
	getMenteeSessions$

	constructor(
		private actions$: Actions,
		private sessionService: SessionService
	) {
		this.create$ = createEffect(() =>
			this.actions$.pipe(
				ofType(createSession),
				mergeMap(({ request }) =>
					this.sessionService.create(request).pipe(
						map((response) => createSessionSuccess({ response })),
						catchError((error) =>
							of(createSessionFailure({ error: error.message }))
						)
					)
				)
			)
		);

		this.getMentorSessions$ = createEffect(() =>
			this.actions$.pipe(
				ofType(getMentorSessions),
				mergeMap(({menteeId}) => {
					return this.sessionService.getMentorSessions(menteeId).pipe(
						map((response) => getMentorSessionsSuccess({ response })),
						catchError((error) =>
							of(getMentorSessionsFailure({ error: error.message }))
						)
					);
				})
			)
		);

		this.getMenteeSessions$ = createEffect(() =>
			this.actions$.pipe(
				ofType(getMenteeSessions),
				mergeMap(({mentorId}) =>
					this.sessionService.getMenteeSessions(mentorId).pipe(
						map((response) => getMenteeSessionsSuccess({ response })),
						catchError((error) =>
							of(getMenteeSessionsFailure({ error: error.message }))
						)
					)
				)
			)
		);
	}
}