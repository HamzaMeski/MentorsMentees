import {createReducer, on} from "@ngrx/store";
import {initialUserProfileState} from "../../state/userProfile/userProfile.state";
import {
	loadUserProfile,
	loadUserProfileFailure,
	loadUserProfileSuccess, updateUserProfile, updateUserProfileFailure, updateUserProfileSuccess
} from "../../actions/userProfile/userProfile.actions";


// get user
export const userProfileGetReducer = createReducer(
	initialUserProfileState.getUser,

	on(loadUserProfile, (state) => ({
		...state,
		user: null,
		loading: true,
		error: null
	})),

	on(loadUserProfileSuccess, (state, action) => ({
		...state,
		user: action.response,
		loading: false,
		error: null
	})),

	on(loadUserProfileFailure, (state, action) => ({
		...state,
		user: null,
		loading: false,
		error: action.error
	})),
)

// update user
export const userProfileUpdateReducer = createReducer(
	initialUserProfileState.update,

	on(updateUserProfile, (state) => ({
		...state,
		loading: true,
		error: null
	})),

	on(updateUserProfileSuccess, (state, { response }) => ({
		...state,
		user: response,
		loading: false,
		error: null
	})),

	on(updateUserProfileFailure, (state, { error }) => ({
		...state,
		loading: false,
		error
	}))
)
