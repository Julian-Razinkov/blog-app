import { signToken } from '../helpers/auth';
import { toUserSchema } from '../mappings/toUserSchema';
import { prisma } from '../prisma';
import { LoginUserOutput, MutationResolvers } from '../types';
import { compare } from 'bcryptjs';

export const loginUserResolver: MutationResolvers['loginUser'] = async (
	_,
	{ input }
): Promise<LoginUserOutput> => {
	const user = await prisma.user.findUnique({
		where: {
			email: input.email,
		},
	});

	if (!user) throw new Error('User with this email does not exists');

	const passwordCorrect = await compare(input.password, user.password);

	if (!passwordCorrect) throw new Error('Incorect password');

	const token = await signToken(user.id);

	return {
		token,
		user: toUserSchema(user),
	};
};
