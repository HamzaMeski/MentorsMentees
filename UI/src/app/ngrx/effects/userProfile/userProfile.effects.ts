import {Injectable} from "@angular/core";
import {Actions, createEffect, ofType} from "@ngrx/effects";
import {AuthService} from "../../../core/services/restfull/backend/auth.service";
import {
	loadUserProfile,
	loadUserProfileFailure,
	loadUserProfileSuccess
} from "../../actions/userProfile/userProfile.actions";
import {catchError, map, mergeMap, of, tap} from "rxjs";


@Injectable()
export class UserProfileEffects {
	loadUserProfile$

	constructor(
		private actions$ : Actions,
		private authService : AuthService,
	) {
		this.loadUserProfile$ = createEffect(() =>
			this.actions$.pipe(
				ofType(loadUserProfile),
				mergeMap(() =>
					this.authService.getAuthenticatedUser().pipe(
						map(response => loadUserProfileSuccess({response})),
						catchError(err => {
							const error: string = err.error.message || 'load user profile failed'
							return of(loadUserProfileFailure({error}))
						})
					)
				)
			)
		)
	}
}
