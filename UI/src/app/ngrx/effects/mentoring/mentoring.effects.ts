import {Injectable} from "@angular/core";
import {Actions, createEffect, ofType} from "@ngrx/effects";
import {MentoringService} from "../../../core/services/restfull/backend/mentoring.service";
import {catchError, map, mergeMap, of} from "rxjs";
import {
	createMentoring,
	createMentoringError,
	createMentoringSuccess,
	getMenteesOfMentor,
	getMenteesOfMentorError,
	getMenteesOfMentorSuccess,
	getMentorsOfMentee, getMentorsOfMenteeError,
	getMentorsOfMenteeSuccess
} from "../../actions/mentoring/mentoring.actions";


@Injectable()
export class MentoringEffects {
	create$
	getMenteesOfMentor$
	getMentorsOfMentee$

	constructor(
		private actions$: Actions,
		private mentoringService: MentoringService
	) {
		this.create$ = createEffect(() =>
			this.actions$.pipe(
				ofType(createMentoring),
				mergeMap(({ request }) =>
					this.mentoringService.create(request).pipe(
						map(response => createMentoringSuccess({ response })),
						catchError(error => of(createMentoringError({ error: error.message })))
					)
				)
			)
		);

		this.getMenteesOfMentor$ = createEffect(() =>
			this.actions$.pipe(
				ofType(getMenteesOfMentor),
				mergeMap(() =>
					this.mentoringService.getMenteesOfMentor().pipe(
						map(response => getMenteesOfMentorSuccess({ response })),
						catchError(error => of(getMenteesOfMentorError({ error: error.message })))
					)
				)
			)
		);

		this.getMentorsOfMentee$ = createEffect(() =>
			this.actions$.pipe(
				ofType(getMentorsOfMentee),
				mergeMap(() =>
					this.mentoringService.getMentorsOfMentee().pipe(
						map(response => getMentorsOfMenteeSuccess({ response })),
						catchError(error => of(getMentorsOfMenteeError({ error: error.message })))
					)
				)
			)
		);
	}
}