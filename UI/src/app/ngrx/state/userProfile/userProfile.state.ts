import {UserResponse} from "../../../core/types/user/user.types";


export interface UserProfileState {
	getUser: {
		user: UserResponse | null,
		loading: boolean,
		error: string | null
	},

	update: {
		user: UserResponse | null,
		loading: boolean,
		error: string | null
	}
}

export const initialUserProfileState: UserProfileState = {
	getUser: {
		user: null,
		loading: false,
		error: null
	},

	update: {
		user: null,
		loading: false,
		error: null
	}
}
