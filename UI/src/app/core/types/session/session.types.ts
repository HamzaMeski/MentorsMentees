
export interface SessionRequest {
	menteeId: number,
	subject: string,
	sessionDate: string
}

export interface SessionResponse {
	id: number,
	mentorId: number,
	menteeId: number,
	subject: string,
	sessionDate: Date,
	createdAt: Date,
	updatedAt: Date
}