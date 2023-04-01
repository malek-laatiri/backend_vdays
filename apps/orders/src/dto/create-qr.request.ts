import {IsNotEmpty, IsPositive, IsString, IsPhoneNumber} from "class-validator";
import {ApiProperty} from "@nestjs/swagger";

export class CreateQrRequest {
    @ApiProperty({
        type: String,
        description: 'This is a required property',
    })
    country:string;
    @ApiProperty({
        type: String,
        description: 'This is a required property',
    })
    query:number;
    @ApiProperty({
        type: String,
        description: 'This is a required property',
    })
    language:string;
    @ApiProperty({
        type: String,
        description: 'This is a required property',
    })
    user:string;

}