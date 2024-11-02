import { GraphQLResolveInfo } from 'graphql';
import { InvocationContext } from './context';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
export type RequireFields<T, K extends keyof T> = Omit<T, K> & { [P in K]-?: NonNullable<T[P]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
};

export type Blog = {
  __typename?: 'Blog';
  author: User;
  body: Scalars['String']['output'];
  createdAt: Scalars['String']['output'];
  description?: Maybe<Scalars['String']['output']>;
  id: Scalars['String']['output'];
  title: Scalars['String']['output'];
  topic: Scalars['String']['output'];
};

export type BlogCreateInput = {
  authorId: Scalars['ID']['input'];
  body: Scalars['String']['input'];
  description?: InputMaybe<Scalars['String']['input']>;
  title: Scalars['String']['input'];
  topic: Scalars['String']['input'];
};

export type CreateUserInput = {
  email: Scalars['String']['input'];
  name: Scalars['String']['input'];
  password: Scalars['String']['input'];
};

export type CreateUserOutput = {
  __typename?: 'CreateUserOutput';
  token: Scalars['String']['output'];
  user: User;
};

export type LoginUserInput = {
  email: Scalars['String']['input'];
  password: Scalars['String']['input'];
};

export type LoginUserOutput = {
  __typename?: 'LoginUserOutput';
  token: Scalars['String']['output'];
  user: User;
};

export type Mutation = {
  __typename?: 'Mutation';
  createBlog: Blog;
  createUser: CreateUserOutput;
  deleteBlog: Blog;
  loginUser: LoginUserOutput;
};


export type MutationCreateBlogArgs = {
  input: BlogCreateInput;
};


export type MutationCreateUserArgs = {
  input: CreateUserInput;
};


export type MutationDeleteBlogArgs = {
  id: Scalars['ID']['input'];
};


export type MutationLoginUserArgs = {
  input: LoginUserInput;
};

export type Query = {
  __typename?: 'Query';
  getBlog: Blog;
  getBlogs: Array<Blog>;
  userOne: User;
};


export type QueryGetBlogArgs = {
  id: Scalars['ID']['input'];
};

export type User = {
  __typename?: 'User';
  email: Scalars['String']['output'];
  id: Scalars['String']['output'];
  name: Scalars['String']['output'];
};



export type ResolverTypeWrapper<T> = Promise<T> | T;


export type ResolverWithResolve<TResult, TParent, TContext, TArgs> = {
  resolve: ResolverFn<TResult, TParent, TContext, TArgs>;
};
export type Resolver<TResult, TParent = {}, TContext = {}, TArgs = {}> = ResolverFn<TResult, TParent, TContext, TArgs> | ResolverWithResolve<TResult, TParent, TContext, TArgs>;

export type ResolverFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => Promise<TResult> | TResult;

export type SubscriptionSubscribeFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => AsyncIterable<TResult> | Promise<AsyncIterable<TResult>>;

export type SubscriptionResolveFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

export interface SubscriptionSubscriberObject<TResult, TKey extends string, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<{ [key in TKey]: TResult }, TParent, TContext, TArgs>;
  resolve?: SubscriptionResolveFn<TResult, { [key in TKey]: TResult }, TContext, TArgs>;
}

export interface SubscriptionResolverObject<TResult, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<any, TParent, TContext, TArgs>;
  resolve: SubscriptionResolveFn<TResult, any, TContext, TArgs>;
}

export type SubscriptionObject<TResult, TKey extends string, TParent, TContext, TArgs> =
  | SubscriptionSubscriberObject<TResult, TKey, TParent, TContext, TArgs>
  | SubscriptionResolverObject<TResult, TParent, TContext, TArgs>;

export type SubscriptionResolver<TResult, TKey extends string, TParent = {}, TContext = {}, TArgs = {}> =
  | ((...args: any[]) => SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>)
  | SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>;

export type TypeResolveFn<TTypes, TParent = {}, TContext = {}> = (
  parent: TParent,
  context: TContext,
  info: GraphQLResolveInfo
) => Maybe<TTypes> | Promise<Maybe<TTypes>>;

export type IsTypeOfResolverFn<T = {}, TContext = {}> = (obj: T, context: TContext, info: GraphQLResolveInfo) => boolean | Promise<boolean>;

export type NextResolverFn<T> = () => Promise<T>;

export type DirectiveResolverFn<TResult = {}, TParent = {}, TContext = {}, TArgs = {}> = (
  next: NextResolverFn<TResult>,
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;



/** Mapping between all available schema types and the resolvers types */
export type ResolversTypes = {
  Blog: ResolverTypeWrapper<Blog>;
  BlogCreateInput: BlogCreateInput;
  Boolean: ResolverTypeWrapper<Scalars['Boolean']['output']>;
  CreateUserInput: CreateUserInput;
  CreateUserOutput: ResolverTypeWrapper<CreateUserOutput>;
  ID: ResolverTypeWrapper<Scalars['ID']['output']>;
  LoginUserInput: LoginUserInput;
  LoginUserOutput: ResolverTypeWrapper<LoginUserOutput>;
  Mutation: ResolverTypeWrapper<{}>;
  Query: ResolverTypeWrapper<{}>;
  String: ResolverTypeWrapper<Scalars['String']['output']>;
  User: ResolverTypeWrapper<User>;
};

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = {
  Blog: Blog;
  BlogCreateInput: BlogCreateInput;
  Boolean: Scalars['Boolean']['output'];
  CreateUserInput: CreateUserInput;
  CreateUserOutput: CreateUserOutput;
  ID: Scalars['ID']['output'];
  LoginUserInput: LoginUserInput;
  LoginUserOutput: LoginUserOutput;
  Mutation: {};
  Query: {};
  String: Scalars['String']['output'];
  User: User;
};

export type BlogResolvers<ContextType = InvocationContext, ParentType extends ResolversParentTypes['Blog'] = ResolversParentTypes['Blog']> = {
  author?: Resolver<ResolversTypes['User'], ParentType, ContextType>;
  body?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  createdAt?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  description?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  id?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  title?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  topic?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type CreateUserOutputResolvers<ContextType = InvocationContext, ParentType extends ResolversParentTypes['CreateUserOutput'] = ResolversParentTypes['CreateUserOutput']> = {
  token?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  user?: Resolver<ResolversTypes['User'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type LoginUserOutputResolvers<ContextType = InvocationContext, ParentType extends ResolversParentTypes['LoginUserOutput'] = ResolversParentTypes['LoginUserOutput']> = {
  token?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  user?: Resolver<ResolversTypes['User'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type MutationResolvers<ContextType = InvocationContext, ParentType extends ResolversParentTypes['Mutation'] = ResolversParentTypes['Mutation']> = {
  createBlog?: Resolver<ResolversTypes['Blog'], ParentType, ContextType, RequireFields<MutationCreateBlogArgs, 'input'>>;
  createUser?: Resolver<ResolversTypes['CreateUserOutput'], ParentType, ContextType, RequireFields<MutationCreateUserArgs, 'input'>>;
  deleteBlog?: Resolver<ResolversTypes['Blog'], ParentType, ContextType, RequireFields<MutationDeleteBlogArgs, 'id'>>;
  loginUser?: Resolver<ResolversTypes['LoginUserOutput'], ParentType, ContextType, RequireFields<MutationLoginUserArgs, 'input'>>;
};

export type QueryResolvers<ContextType = InvocationContext, ParentType extends ResolversParentTypes['Query'] = ResolversParentTypes['Query']> = {
  getBlog?: Resolver<ResolversTypes['Blog'], ParentType, ContextType, RequireFields<QueryGetBlogArgs, 'id'>>;
  getBlogs?: Resolver<Array<ResolversTypes['Blog']>, ParentType, ContextType>;
  userOne?: Resolver<ResolversTypes['User'], ParentType, ContextType>;
};

export type UserResolvers<ContextType = InvocationContext, ParentType extends ResolversParentTypes['User'] = ResolversParentTypes['User']> = {
  email?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type Resolvers<ContextType = InvocationContext> = {
  Blog?: BlogResolvers<ContextType>;
  CreateUserOutput?: CreateUserOutputResolvers<ContextType>;
  LoginUserOutput?: LoginUserOutputResolvers<ContextType>;
  Mutation?: MutationResolvers<ContextType>;
  Query?: QueryResolvers<ContextType>;
  User?: UserResolvers<ContextType>;
};

