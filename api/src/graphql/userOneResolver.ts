import { QueryResolvers } from '../types';
import { prisma } from '../prisma';

export const userOneResolver = async (_: any, { id }: any) => {
	const { name, email, password } = await prisma.user.findUniqueOrThrow({
		where: {
			id,
		},
	});

	return {
		name,
		email,
		password,
	};
};
