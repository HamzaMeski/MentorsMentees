import { createFeatureSelector, createSelector } from '@ngrx/store';
import { SessionState } from '../../state/session/session.state';

// Create Session
export const selectCreateSessionState = createFeatureSelector<SessionState['create']>('createSession');

export const selectCreateSessionResponse = createSelector(
	selectCreateSessionState,
	(state: SessionState['create']) => state.response
);

export const selectCreateSessionLoading = createSelector(
	selectCreateSessionState,
	(state: SessionState['create']) => state.loading
);

export const selectCreateSessionError = createSelector(
	selectCreateSessionState,
	(state: SessionState['create']) => state.error
);

// Get Mentor Sessions
export const selectGetMentorSessionsState = createFeatureSelector<SessionState['getMentorSessions']>('getMentorSessions');

export const selectGetMentorSessionsResponse = createSelector(
	selectGetMentorSessionsState,
	(state: SessionState['getMentorSessions']) => state.response
);

export const selectGetMentorSessionsLoading = createSelector(
	selectGetMentorSessionsState,
	(state: SessionState['getMentorSessions']) => state.loading
);

export const selectGetMentorSessionsError = createSelector(
	selectGetMentorSessionsState,
	(state: SessionState['getMentorSessions']) => state.error
);

// Get Mentee Sessions
export const selectGetMenteeSessionsState = createFeatureSelector<SessionState['getMenteeSessions']>('getMenteeSessions');

export const selectGetMenteeSessionsResponse = createSelector(
	selectGetMenteeSessionsState,
	(state: SessionState['getMenteeSessions']) => state.response
);

export const selectGetMenteeSessionsLoading = createSelector(
	selectGetMenteeSessionsState,
	(state: SessionState['getMenteeSessions']) => state.loading
);

export const selectGetMenteeSessionsError = createSelector(
	selectGetMenteeSessionsState,
	(state: SessionState['getMenteeSessions']) => state.error
);
