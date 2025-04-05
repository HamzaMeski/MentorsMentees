
export interface RegisterRequest {
	email: string,
	password: string
}

export interface RegisterResponse {
	id: number,
	email: string,
	password: string,
	createdAt: Date,
	updatedAt: Date
}
