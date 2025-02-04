import { Injectable, ForbiddenException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Blog, BlogDocument } from './blog.schema';
import { CreateBlogDto } from './dto/blog.dto';

@Injectable()
export class BlogService {
  constructor(@InjectModel(Blog.name) private blogModel: Model<BlogDocument>) {}

  async getAllBlogs() {
    return this.blogModel.find().exec();
  }

  async addBlog(createBlogDto: CreateBlogDto, user: any) {
    if (user.role !== 'writer') {
      throw new ForbiddenException('Only writers can add blogs');
    }
    
    const newBlog = new this.blogModel({
      ...createBlogDto,
      authorId: user.id,
      authorName: user.firstName + ' ' + user.lastName,
    });

    return newBlog.save();
  }
}
