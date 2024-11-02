import { prisma } from '../prisma';
import { User } from '../types';
import { verify, sign } from 'jsonwebtoken';

export async function getUserByToken(token: string): Promise<User | null> {
	const payload = verify(token, process.env.JWT_SECRET as string) as {
		userId: string;
	};
	//TODO: FIND OUT HOW TO LOGG THE APPLICATION
	const user = await prisma.user.findUnique({
		where: {
			id: payload.userId,
		},
	});

	if (user == null) return null;

	return {
		email: user.email,
		password: user.password,
		name: user.name,
	};
}

export async function signToken(payload: string): Promise<string> {
	return sign({ userId: payload }, process.env.JWT_SECRET as string, {
		expiresIn: '1d',
	});
}
