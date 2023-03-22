import {IsNotEmpty, IsString} from "class-validator";

export class CreateWishlistRequest {


    @IsString()
    @IsNotEmpty()
    title: string;
    @IsString()
    @IsNotEmpty()
    date: string;

    @IsString()
    @IsNotEmpty()
    url: string;
}