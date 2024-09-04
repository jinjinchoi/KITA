import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsNumber, IsString } from "class-validator";

export class CreateUserDto {
    @ApiProperty({
        description: 'The unique identifier for the user',
        example: 'user123',
    })
    @IsString()
    @IsNotEmpty()
    uid : string;


    @ApiProperty({
        description: 'The user password',
        example: 'password123',
    })
    @IsString()
    @IsNotEmpty()
    upw : string;

    @ApiProperty({
        description: 'The user nickname',
        example: 'nickname123',
    })
    @IsString()
    @IsNotEmpty()
    unickname : string;

    @ApiProperty({
        description: 'The user email',
        example: 'user@example.com',
    })
    @IsString()
    @IsNotEmpty()
    uemail : string;

    @ApiProperty({
        description: 'The user phone number',
        example: '01045678900',
    })
    @IsNumber()
    @IsNotEmpty()
    uphone : number;
}

export class LoginUserDto {
    @IsString()
    @IsNotEmpty()
    uid : string;

    @IsString()
    @IsNotEmpty()
    upw : string;
}