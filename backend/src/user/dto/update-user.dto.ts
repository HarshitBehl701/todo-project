import { IsString, MinLength } from "class-validator";

export class UpdateUserDTO {
    @IsString()
    @MinLength(10)
    username: string;
    @IsString()
    @MinLength(6)
    password: string;
}