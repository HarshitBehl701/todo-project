import { IsNotEmpty, IsString, MaxLength, MinLength } from "class-validator";

export class UpdateTodoDto {
    @IsString()
    @IsNotEmpty()
    @MinLength(3)
    @MaxLength(30)
    name: string;
    @IsString()
    @IsNotEmpty()
    @MinLength(10)
    task: string;
}