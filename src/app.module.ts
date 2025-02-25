import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from './auth/auth.module';
import { BlogModule } from './blog/blog.module';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb+srv://drashtichunawala:pKNlHzH9B0TOA2kU@cluster0.1l3zq.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0'), 
    AuthModule,
    BlogModule
  ],
})
export class AppModule {}
