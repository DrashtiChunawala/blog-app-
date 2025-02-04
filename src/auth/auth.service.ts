import { Injectable, BadRequestException, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs';
import { User, UserDocument } from './user.schema';
import { SigninDto, SignupDto } from './dto/auth.dto';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User.name) private userModel: Model<UserDocument>, 
    private jwtService: JwtService,
  ) {}

  async signup(dto: SignupDto) {
    const { firstName, lastName, email, password, role } = dto;
    const existingUser = await this.userModel.findOne({ email });
    
    if (existingUser) throw new BadRequestException('Email already exists');
    
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new this.userModel({ firstName, lastName, email, password: hashedPassword, role });
    await newUser.save();
    
    return { message: 'Signup successful', userId: newUser._id };
  }

  async signin(dto: SigninDto) {
    const { email, password } = dto;
    const user = await this.userModel.findOne({ email });
    
    if (!user || !(await bcrypt.compare(password, user.password))) {
      throw new UnauthorizedException('Invalid credentials');
    }
    
    const token = this.jwtService.sign({ id: user._id, role: user.role });
    
    return { message: 'Welcome!', token };
  }
}
