import {createAction, props} from "@ngrx/store";
import {UserResponse} from "../../../core/types/user/user.types";
import {UpdateRequest} from "../../../core/types/auth/update.types";

// get user
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

// update user
export const updateUserProfile = createAction(
	'[UserProfile] Update UserProfile',
	props<{ request: UpdateRequest }>()
)

export const updateUserProfileSuccess = createAction(
	'[UserProfile] Update UserProfile Success',
	props<{ response: UserResponse }>()
)

export const updateUserProfileFailure = createAction(
	'[UserProfile] Update UserProfile Failure',
	props<{ error: string }>()
)


// delete user
export const deleteUserProfile = createAction(
	'[UserProfile] deleteUserProfile'
)