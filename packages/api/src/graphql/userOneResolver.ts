import { toUserSchema } from '../mappings/toUserSchema';
import { prisma } from '../prisma';
import { QueryResolvers } from '../types';

export const userOneResolver: QueryResolvers['userOne'] = async (
	_,
	{},
	{ user }
) => {
	if (!user) throw new Error('Unauthenticated');

	return user;
};
