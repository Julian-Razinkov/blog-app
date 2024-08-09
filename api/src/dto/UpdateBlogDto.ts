import { BlogDto } from './BlogDto';

export interface UpdateBlogDto extends Omit<Partial<BlogDto>, 'id'> {}
