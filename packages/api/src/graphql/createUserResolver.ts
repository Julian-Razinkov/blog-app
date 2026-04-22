import { signToken } from '../helpers/auth';
import { toUserSchema } from '../mappings/toUserSchema';
import { prisma } from '../prisma';
import { CreateUserOutput, MutationResolvers, User } from '../types';
import { hash } from 'bcryptjs';
import { v7 as uuid } from 'uuid';

export const createUserResolver: MutationResolvers['createUser'] = async (
	_,
	{ input }
): Promise<CreateUserOutput> => {
	const passwordHash = await hash(input.password, 12);
	//Sign the token first so if it fails the user record does not gets created in the DB
	const userId = uuid();
	const token = await signToken(userId);

	const user = await prisma.user.create({
		data: {
			id: userId,
			name: input.name,
			email: input.email,
			password: passwordHash,
		},
	});

	return {
		token,
		user: toUserSchema(user),
	};
};
