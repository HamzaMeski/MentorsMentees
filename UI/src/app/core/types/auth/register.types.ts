
export interface RegisterRequest {
	email: string,
	password: string,
	firstName: string,
	lastName: string,
	phone: string,
	bio: string
}

export interface RegisterResponse {
	id: number,
	email: string,
	password: string,
	firstName: string,
	lastName: string,
	phone: string,
	bio: string
	createdAt: Date,
	updatedAt: Date
}
