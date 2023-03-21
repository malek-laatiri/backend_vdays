import {IsNotEmpty, IsPositive, IsString, IsPhoneNumber, IsBoolean} from "class-validator";
import {Prop} from "@nestjs/mongoose";

export class CreateHistoryRequest {


    @IsString()
    @IsNotEmpty()
    title: string;
    @IsString()
    @IsNotEmpty()
    date: string;

    @IsBoolean()
    @IsNotEmpty()
    isQr: boolean;
}