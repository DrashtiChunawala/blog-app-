import { Controller, Get, Post, Body, UseGuards, Request } from '@nestjs/common';
import { BlogService } from './blog.service';
import { CreateBlogDto } from './dto/blog.dto';
import { AuthGuard } from '../auth/auth.guard';
import { RolesGuard } from '../auth/roles.guard';
import { Roles } from 'src/auth/roles.decorator';

@Controller('blogs')
export class BlogController {
  constructor(private readonly blogService: BlogService) {}

  @UseGuards(AuthGuard)
  @Get()
  async getAllBlogs() {
    return this.blogService.getAllBlogs();
  }

  @UseGuards(AuthGuard, RolesGuard)
  @Roles('writer') // Only writers can access this
  @Post('add')
  async addBlog(@Body() createBlogDto: CreateBlogDto, @Request() req) {
    return this.blogService.addBlog(createBlogDto, req.user);
  }
}
