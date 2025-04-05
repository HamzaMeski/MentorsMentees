import { createReducer, on } from '@ngrx/store';
import {
	createMentoring,
	createMentoringSuccess,
	createMentoringError,
	getMenteesOfMentor,
	getMenteesOfMentorSuccess,
	getMenteesOfMentorError,
	getMentorsOfMentee,
	getMentorsOfMenteeSuccess,
	getMentorsOfMenteeError
} from "../../actions/mentoring/mentoring.actions";
import {initialMentoringState} from "../../state/mentoring/mentoring.state";

export const createMentoringReducer = createReducer(
	initialMentoringState.create,

	on(createMentoring, (state) => ({
		...state,
		response: null,
		loading: true,
		error: null
	})),

	on(createMentoringSuccess, (state, action) => ({
		...state,
		response: action.response,
		loading: false,
		error: null
	})),

	on(createMentoringError, (state, action) => ({
		...state,
		response: null,
		loading: false,
		error: action.error
	}))
);

export const getMenteesOfMentorReducer = createReducer(
	initialMentoringState.getMenteesOfMentor,

	on(getMenteesOfMentor, (state) => ({
		...state,
		response: null,
		loading: true,
		error: null
	})),

	on(getMenteesOfMentorSuccess, (state, action) => ({
		...state,
		response: action.response,
		loading: false,
		error: null
	})),

	on(getMenteesOfMentorError, (state, action) => ({
		...state,
		response: null,
		loading: false,
		error: action.error
	}))
);

export const getMentorsOfMenteeReducer = createReducer(
	initialMentoringState.getMentorsOfMentee,

	on(getMentorsOfMentee, (state) => ({
		...state,
		response: null,
		loading: true,
		error: null
	})),

	on(getMentorsOfMenteeSuccess, (state, action) => ({
		...state,
		response: action.response,
		loading: false,
		error: null
	})),

	on(getMentorsOfMenteeError, (state, action) => ({
		...state,
		response: null,
		loading: false,
		error: action.error
	}))
);
