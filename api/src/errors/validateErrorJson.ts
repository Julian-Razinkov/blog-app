export interface ValidateErrorJson {
	message: 'Validation failed';
	details: { [name: string]: unknown };
}
