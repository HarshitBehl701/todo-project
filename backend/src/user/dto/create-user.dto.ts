import { IsString, Min, MinLength } from "class-validator";

export class CreateUserDTO {
    @IsString()
    @MinLength(10)
    username: string;
    @IsString()
    @MinLength(6)
    password: string;
}