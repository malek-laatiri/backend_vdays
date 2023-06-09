import {IsBoolean, IsNotEmpty, IsString} from "class-validator";
import {ApiProperty} from "@nestjs/swagger";

export class CreateHistoryRequest {

    @ApiProperty({
        type: String,
        description: 'This is a required property',
    })
    @IsString()
    @IsNotEmpty()
    title: string;

    @ApiProperty({
        type: Date,
        description: 'This is a required property',
    })
    @IsString()
    @IsNotEmpty()
    date: Date;

    @IsBoolean()
    @IsNotEmpty()
    @ApiProperty({
        type: Boolean,
        description: 'This is a required property',
    })
    isQr: boolean;

    @IsString()
    @IsNotEmpty()
    @ApiProperty({
        type: String,
        description: 'This is a required property',
    })
    user: string;

}