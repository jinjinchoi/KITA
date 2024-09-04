import { IsString } from "class-validator";

export class UpdateUserDto{
    @IsString()
    upw? : string;

    @IsString()
    unickname? : string;

    @IsString()
    uprofile? : string;

    @IsString()
    uemail? : string;

    @IsString()
    uphone? : number;
}
