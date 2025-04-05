import {createAction, props} from "@ngrx/store";
import {UserResponse} from "../../../core/types/user/user.types";


export const loadUserProfile = createAction(
	'[UserProfile] Load UserProfile'
)

export const loadUserProfileSuccess = createAction(
	'[UserProfile] Load UserProfileSuccess',
	props<{ response: UserResponse}>()
)

export const loadUserProfileFailure = createAction(
	'[UserProfile] Load UserProfileFailure',
	props<{ error: string}>()
)

export const deleteUserProfile = createAction(
	'[UserProfile] deleteUserProfile'
)
