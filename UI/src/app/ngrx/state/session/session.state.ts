import {SessionResponse} from "../../../core/types/session/session.types";


export interface SessionState {
	create: {
		response: SessionResponse | null,
		loading: boolean,
		error: string | null
	},

	getMentorSessions: {
		response: SessionResponse[] | null,
		loading: boolean,
		error: string | null
	},

	getMenteeSessions: {
		response: SessionResponse[] | null,
		loading: boolean,
		error: string | null
	}
}

export const initialSessionState: SessionState = {
	create: {
		response: null,
		loading: false,
		error: null
	},
	getMentorSessions: {
		response: null,
		loading: false,
		error: null
	},
	getMenteeSessions: {
		response: null,
		loading: false,
		error: null
	}
};