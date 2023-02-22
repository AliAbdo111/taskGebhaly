
import { IsEmail, IsNotEmpty ,IsString, MinLength } from 'class-validator';

export class SignUpDto {
  @IsString()
  @IsNotEmpty()
  readonly  name: string;
  @IsEmail({},{message:"enter your email address valid"})
  @IsNotEmpty()
  readonly  email: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(6)
  readonly password: string;
}