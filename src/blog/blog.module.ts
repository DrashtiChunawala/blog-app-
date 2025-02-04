import { Module } from '@nestjs/common';
import { BlogController } from './blog.controller';
import { BlogService } from './blog.service';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from '../auth/auth.module'; // ✅ Import AuthModule
import { Blog, BlogSchema } from './blog.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Blog.name, schema: BlogSchema }]),
    AuthModule, 
  ],
  controllers: [BlogController],
  providers: [BlogService],
})
export class BlogModule {}
