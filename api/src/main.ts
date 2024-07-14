import express, {
	NextFunction,
	Request,
	Response,
	json,
	urlencoded,
} from 'express';
import swaggerUi from 'swagger-ui-express';
import { ValidateError } from 'tsoa';
import { RegisterRoutes } from '../build/routes';
import { StatusCodes } from './enum/statusCodes';

const app = express();

app.use(
	urlencoded({
		extended: true,
	}),
	json({})
);

RegisterRoutes(app);

app.use('/docs', swaggerUi.serve, async (_req: Request, res: Response) => {
	res.send(swaggerUi.generateHTML(await import('../build/swagger.json')));
});


//TODO: Split global middlewares into separrate files
app.use(function routeNotFound(req: Request, res: Response): Response {
	return res.status(StatusCodes.NOT_FOUND).json({
		message: 'Not Found',
	});
});

app.use(function errorHandler(
	error: unknown,
	req: Request,
	res: Response,
	next: NextFunction
): Response | void {
	if (error instanceof ValidateError) {
		return res.status(StatusCodes.BAD_REQUEST).json({
			message: 'Validation Failed',
			details: error?.fields,
		});
	}
	if (error instanceof Error) {
		return res.status(StatusCodes.SERVER_ERROR).json({
			message: 'Internal Server Error',
		});
	}

	next();
});

app.listen(3000, () => {
	console.log(`Server is listening on port ${3000}`);
});
