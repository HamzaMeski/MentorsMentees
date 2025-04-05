import { createFeatureSelector, createSelector } from '@ngrx/store';
import { MentoringState } from '../../state/mentoring/mentoring.state';

// create a mentoring create selector
export const selectCreateMentoringState = createFeatureSelector<MentoringState['create']>('createMentoring');

export const selectCreateMentoringResponse = createSelector(
	selectCreateMentoringState,
	(state: MentoringState['create']) => state.response
);

export const selectCreateMentoringLoading = createSelector(
	selectCreateMentoringState,
	(state: MentoringState['create']) => state.loading
);

export const selectCreateMentoringError = createSelector(
	selectCreateMentoringState,
	(state: MentoringState['create']) => state.error
);


// get mentees of mentor selector
export const selectGetMenteesOfMentorState = createFeatureSelector<MentoringState['getMenteesOfMentor']>('getMenteesOfMentor');

export const selectGetMenteesOfMentorResponse = createSelector(
	selectGetMenteesOfMentorState,
	(state: MentoringState['getMenteesOfMentor']) => state.response
);

export const selectGetMenteesOfMentorLoading = createSelector(
	selectGetMenteesOfMentorState,
	(state: MentoringState['getMenteesOfMentor']) => state.loading
);

export const selectGetMenteesOfMentorError = createSelector(
	selectGetMenteesOfMentorState,
	(state: MentoringState['getMenteesOfMentor']) => state.error
);


// get mentors of mentee selector
export const selectGetMentorsOfMenteeState = createFeatureSelector<MentoringState['getMentorsOfMentee']>('getMentorsOfMentee');

export const selectGetMentorsOfMenteeResponse = createSelector(
	selectGetMentorsOfMenteeState,
	(state: MentoringState['getMentorsOfMentee']) => state.response
);

export const selectGetMentorsOfMenteeLoading = createSelector(
	selectGetMentorsOfMenteeState,
	(state: MentoringState['getMentorsOfMentee']) => state.loading
);

export const selectGetMentorsOfMenteeError = createSelector(
	selectGetMentorsOfMenteeState,
	(state: MentoringState['getMentorsOfMentee']) => state.error
);
