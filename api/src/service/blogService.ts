import { BlogDto, CreateBlogDto } from '../dto';
import { prisma } from '../prisma';

export class BlogService {
	public async createBlog(dto: CreateBlogDto): Promise<BlogDto> {
		try {
			return await prisma.blog.create({ data: dto });
		} catch (error) {
			throw new Error(`Failed to create a blog ${error}`);
		}
	}

	public async getBlogById(id: string): Promise<BlogDto> {
		try {
			const blog = prisma.blog.findUniqueOrThrow({
				where: {
					id,
				},
			});

			if (!blog) throw new Error(`Blog is not found`);

			return blog;
		} catch (error) {
			throw new Error(`failed to get blog by id ${error}`);
		}
	}

	public async getBlogs(): Promise<BlogDto[]> {
		const blogs = await prisma.blog.findMany({});
		return blogs;
	}
}
