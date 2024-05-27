import { IsNotEmpty, IsEmail, IsPhoneNumber, IsString } from 'class-validator';

export class CreateUserDto {
  @IsNotEmpty()
  @IsString()
  readonly name: string;

  @IsNotEmpty()
  @IsEmail()
  readonly email: string;

  @IsNotEmpty()
  readonly phone: string;

  @IsNotEmpty()
  @IsString()
  readonly address: string;
}

export class UpdateUserDto {
  @IsString()
  readonly name?: string;

  @IsEmail()
  readonly email?: string;

  @IsNotEmpty()
  readonly phone?: string;

  @IsString()
  readonly address?: string;
}