import {createAction, props} from "@ngrx/store";
import {MentoringRequest, MentoringResponse} from "../../../core/types/mentoring/mentoring.types";
import {UserResponse} from "../../../core/types/user/user.types";


// Create Mentoring Relationship
export const createMentoring = createAction(
	'[Mentoring] Create Mentoring',
	props<{ request: MentoringRequest }>()
);

export const createMentoringSuccess = createAction(
	'[Mentoring] Create Mentoring Success',
	props<{ response: MentoringResponse }>()
);

export const createMentoringError = createAction(
	'[Mentoring] Create Mentoring Error',
	props<{ error: string }>()
);

// Get Mentees of Mentor
export const getMenteesOfMentor = createAction(
	'[Mentoring] Get Mentees of Mentor',
	props<{ mentorId: number }>()
);

export const getMenteesOfMentorSuccess = createAction(
	'[Mentoring] Get Mentees of Mentor Success',
	props<{ response: UserResponse }>()
);

export const getMenteesOfMentorError = createAction(
	'[Mentoring] Get Mentees of Mentor Error',
	props<{ error: string }>()
);

// Get Mentors of Mentee
export const getMentorsOfMentee = createAction(
	'[Mentoring] Get Mentors of Mentee',
	props<{ menteeId: number }>()
);

export const getMentorsOfMenteeSuccess = createAction(
	'[Mentoring] Get Mentors of Mentee Success',
	props<{ response: UserResponse }>()
);

export const getMentorsOfMenteeError = createAction(
	'[Mentoring] Get Mentors of Mentee Error',
	props<{ error: string }>()
);