import {IsNotEmpty, IsPositive, IsString, IsPhoneNumber, IsBoolean, IsEmail} from "class-validator";
import {Prop} from "@nestjs/mongoose";
import {ApiProperty} from "@nestjs/swagger";

export class getUser {

    @ApiProperty({
        type: String,
        description: 'This is a required property',
    })
    @IsString()
    @IsNotEmpty()
    _id: string;


}