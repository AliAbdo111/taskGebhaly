import { Injectable ,UnauthorizedException } from '@nestjs/common';
import { InjectModel } from "@nestjs/mongoose" 
import { User } from './Schemas/User.schema';
import { Model } from 'mongoose';
import * as bcrypt from 'bcryptjs'
import { JwtService } from '@nestjs/jwt';
import {SignUpDto} from './dto/signUp.dto';
import { LoginDto } from './dto/login.dto';
@Injectable()
export class AuthService {

constructor(
    @InjectModel(User.name)
    private userModel: Model<User>,
    private jwtService:JwtService
){}
async signup(data:SignUpDto):Promise<{token:string}>
{
    const{ name, email, password}=data;
    const hashPassword =await bcrypt.hash(password,10)
    const user =await this.userModel.create({
            name,
            email,
            password:hashPassword
    })
    const token =await this.jwtService.sign({id:user.id})
    return {token}
}

async login(loginDto: LoginDto): Promise<{ token: string }> {
    const { email, password } = loginDto;

    const user = await this.userModel.findOne({ email });

    if (!user) {
      throw new UnauthorizedException('Invalid email or password');
    }

    const isPasswordMatched = await bcrypt.compare(password, user.password);

    if (!isPasswordMatched) {
      throw new UnauthorizedException('Invalid email or password');
    }

    const token = this.jwtService.sign({ id: user._id });

    return { token };
  }

}
