import {UserResponse} from "../../../core/types/user/user.types";


export interface UserProfileState {
	user: UserResponse | null,
	loading: boolean,
	error: string | null
}

export const initialUserProfileState: UserProfileState = {
	user: null,
	loading: false,
	error: null
}
