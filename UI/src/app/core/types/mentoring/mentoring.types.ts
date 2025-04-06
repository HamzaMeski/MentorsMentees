
export interface MentoringRequest {
	menteeId: number
}

export interface MentoringResponse {
	menteeId: number,
	mentorId: number,
	createdAt: Date,
	updateAt: Date
}
