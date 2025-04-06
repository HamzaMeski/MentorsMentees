import { createAction, props } from '@ngrx/store';
import {SessionRequest, SessionResponse} from '../../../core/types/session/session.types';


// Create Session
export const createSession = createAction(
	'[Session] Create Session',
	props<{ request: SessionRequest }>()
);

export const createSessionSuccess = createAction(
	'[Session] Create Session Success',
	props<{ response: SessionResponse }>()
);

export const createSessionFailure = createAction(
	'[Session] Create Session Failure',
	props<{ error: string }>()
);


// Get Mentor Sessions
export const getMentorSessions = createAction(
	'[Session] Get Mentor Sessions',
	props<{ menteeId: number }>()
);

export const getMentorSessionsSuccess = createAction(
	'[Session] Get Mentor Sessions Success',
	props<{ response: SessionResponse[] }>()
);

export const getMentorSessionsFailure = createAction(
	'[Session] Get Mentor Sessions Failure',
	props<{ error: string }>()
);


// Get Mentee Sessions
export const getMenteeSessions = createAction(
	'[Session] Get Mentee Sessions',
	props<{ mentorId: number }>()
);

export const getMenteeSessionsSuccess = createAction(
	'[Session] Get Mentee Sessions Success',
	props<{ response: SessionResponse[] }>()
);

export const getMenteeSessionsFailure = createAction(
	'[Session] Get Mentee Sessions Failure',
	props<{ error: string }>()
);
