import {IsNotEmpty, IsPositive, IsString, IsPhoneNumber, IsBoolean, IsEmail} from "class-validator";
import {Prop} from "@nestjs/mongoose";
import {ApiProperty} from "@nestjs/swagger";

export class SettingsRequest {

    @ApiProperty({
        type: Boolean,
        description: 'This is a required property',
    })
    week: boolean;

    @ApiProperty({
        type: Boolean,
        description: 'This is a required property',
    })
    emailReceive: boolean;

    @ApiProperty({
        type: Boolean,
        description: 'This is a required property',
    })
    recommendation: boolean;

    @ApiProperty({
        type: String,
        description: 'This is a required property',
    })
    user: string;

}