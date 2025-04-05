
export interface SessionRequest {
	menteeId: number,
	subject: string,
	sessionDate: Date
}

export interface SessionResponse {
	mentorId: number,
	menteeId: number,
	subject: string,
	sessionDate: Date,
	createdAt: Date,
	updateAt: Date
}