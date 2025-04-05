import {MentoringResponse} from "../../../core/types/mentoring/mentoring.types";
import {UserResponse} from "../../../core/types/user/user.types";


export interface MentoringState {
	create: {
		response: MentoringResponse | null,
		loading: boolean,
		error: string | null
	},

	getMenteesOfMentor: {
		response: UserResponse | null,
		loading: boolean,
		error: string | null
	},

	getMentorsOfMentee: {
		response: UserResponse | null,
		loading: boolean,
		error: string | null
	}
}

export const initialMentoringState: MentoringState = {
	create: {
		response: null,
		loading: false,
		error: null
	},
	getMenteesOfMentor: {
		response: null,
		loading: false,
		error: null
	},
	getMentorsOfMentee: {
		response: null,
		loading: false,
		error: null
	}
};