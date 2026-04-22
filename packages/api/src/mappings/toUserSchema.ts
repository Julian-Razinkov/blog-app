import { User } from '@prisma/client';
import { User as UserSchema } from '../types';

export function toUserSchema(user: User): UserSchema {
	return {
		id: user.id,
		name: user.name,
		email: user.email,
	};
}
