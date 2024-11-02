import { signToken } from '../helpers/auth';
import { toUserSchema } from '../mappings/toUserSchema';
import { prisma } from '../prisma';
import { CreateUserOutput, MutationResolvers, User } from '../types';
import { hash } from 'bcryptjs';

export const createUserResolver: MutationResolvers['createUser'] = async (
	_,
	{ input }
): Promise<CreateUserOutput> => {
	const passwordHash = await hash(input.password, 12);

	const user = await prisma.user.create({
		data: {
			name: input.name,
			email: input.email,
			password: passwordHash,
		},
	});

	const token = await signToken(user.id);

	return {
		token,
		user: toUserSchema(user),
	};
};
