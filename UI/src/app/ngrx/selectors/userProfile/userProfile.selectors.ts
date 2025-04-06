import {createFeatureSelector, createSelector} from "@ngrx/store";
import {UserProfileState} from "../../state/userProfile/userProfile.state";


// get user
export const selectUserProfileState  = createFeatureSelector<UserProfileState['getUser']>('getUserProfile')

export const selectUserProfile = createSelector(
	selectUserProfileState,
	(state: UserProfileState['getUser'])=> state.user
)

export const selectUserProfileLoading = createSelector(
	selectUserProfileState,
	(state: UserProfileState['getUser'])=> state.loading
)

export const selectUserProfileError = createSelector(
	selectUserProfileState,
	(state: UserProfileState['getUser'])=> state.error
)


// update user
export const selectUpdateProfileState  = createFeatureSelector<UserProfileState['update']>('updateUserProfile')

export const selectUpdateProfile = createSelector(
	selectUserProfileState,
	(state: UserProfileState['update'])=> state.user
)

export const selectUpdateProfileLoading = createSelector(
	selectUserProfileState,
	(state: UserProfileState['update'])=> state.loading
)

export const selectUpdateProfileError = createSelector(
	selectUserProfileState,
	(state: UserProfileState['update'])=> state.error
)
