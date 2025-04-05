import { createReducer, on } from '@ngrx/store';
import {
	createSession,
	createSessionSuccess,
	createSessionFailure,
	getMentorSessions,
	getMentorSessionsSuccess,
	getMentorSessionsFailure,
	getMenteeSessions,
	getMenteeSessionsSuccess,
	getMenteeSessionsFailure
} from '../../actions/session/session.actions';

import { initialSessionState } from '../../state/session/session.state';


export const createSessionReducer = createReducer(
	initialSessionState.create,

	on(createSession, (state) => ({
		...state,
		response: null,
		loading: true,
		error: null
	})),

	on(createSessionSuccess, (state, { response }) => ({
		...state,
		response,
		loading: false,
		error: null
	})),

	on(createSessionFailure, (state, { error }) => ({
		...state,
		response: null,
		loading: false,
		error
	}))
);


export const getMentorSessionsReducer = createReducer(
	initialSessionState.getMentorSessions,

	on(getMentorSessions, (state) => ({
		...state,
		response: null,
		loading: true,
		error: null
	})),

	on(getMentorSessionsSuccess, (state, { response }) => ({
		...state,
		response,
		loading: false,
		error: null
	})),

	on(getMentorSessionsFailure, (state, { error }) => ({
		...state,
		response: null,
		loading: false,
		error
	}))
);


export const getMenteeSessionsReducer = createReducer(
	initialSessionState.getMenteeSessions,

	on(getMenteeSessions, (state) => ({
		...state,
		response: null,
		loading: true,
		error: null
	})),

	on(getMenteeSessionsSuccess, (state, { response }) => ({
		...state,
		response,
		loading: false,
		error: null
	})),

	on(getMenteeSessionsFailure, (state, { error }) => ({
		...state,
		response: null,
		loading: false,
		error
	}))
);
