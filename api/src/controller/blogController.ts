import { Blog } from '@prisma/client';
import {
	Body,
	Controller,
	Example,
	Get,
	Middlewares,
	Path,
	Post,
	Response,
	Route,
	SuccessResponse,
} from 'tsoa';
import { BlogDto, CreateBlogDto } from '../dto';
import { StatusCodes } from '../enum/statusCodes';
import { ValidateErrorJson } from '../errors/validateErrorJson';
import { BlogService } from '../service/blogService';

@Route('blogs')
export class BlogController extends Controller {
	private blogService: BlogService = new BlogService();

	/**
	 * Endpoint for getting the blog post by ID
	 * @param blogId
	 *
	 */

	@Get('{blogId}')
	public async getBlog(@Path() blogId: string): Promise<BlogDto> {
		return this.blogService.getBlogById(blogId);
	}

	/**
	 * Endpoint for creating a blog post
	 * @param CreateBlogDto
	 *
	 */
	@Example<Blog>({
		id: '52907745-7672-470e-a803-a2f8feb52944',
		title: 'Blog Post',
		description: 'Short summary of the post',
		body: 'The text of the post',
		image: 'http://url/to/image',
	})
	@Response<ValidateErrorJson>(StatusCodes.BAD_REQUEST, 'Validation failed', {
		message: 'Validation failed',
		details: {
			requestBody: {
				message: 'id is an excess property and therefore not allowed',
				value: '52907745-7672-470e-a803-a2f8feb52944',
			},
		},
	})
	@SuccessResponse(StatusCodes.SUCCESSFULY_CREATED, 'Created')
	@Post()
	public async createBlog(
		@Body() requestBody: CreateBlogDto
	): Promise<BlogDto> {
		this.setStatus(StatusCodes.SUCCESSFULY_CREATED);
		return this.blogService.createBlog(requestBody);
	}
}