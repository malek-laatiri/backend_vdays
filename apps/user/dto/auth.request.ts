import {IsNotEmpty, IsPositive, IsString, IsPhoneNumber, IsBoolean, IsEmail} from "class-validator";
import {Prop} from "@nestjs/mongoose";
import {ApiProperty} from "@nestjs/swagger";

export class AuthRequest {

    @ApiProperty({
        type: String,
        description: 'This is a required property',
    })
    email: string;

    @ApiProperty({
        type: String,
        description: 'This is a required property',
    })

    password: string;

}