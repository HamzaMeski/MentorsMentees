import {MentoringResponse} from "../../../core/types/mentoring/mentoring.types";


export interface MentoringState {
	create: {
		response: MentoringResponse | null,
		loading: boolean,
		error: string | null
	},

	getMenteesOfMentor: {
		response: MentoringResponse | null,
		loading: boolean,
		error: string | null
	},

	getMentorsOfMentee: {

	},

	getMentoring: {

	},

	delete: {

	}
}

