import {IsNotEmpty, IsPositive, IsString, IsPhoneNumber} from "class-validator";
import {ApiProperty} from "@nestjs/swagger";

export class CreateOrderRequest {
    @IsString()
    @IsNotEmpty()
    @ApiProperty({
        type: String,
        description: 'This is a required property',
    })
    name:string;

    @IsPositive()
    @ApiProperty({
        type: Number,
        description: 'This is a required property',
    })
    price:number;

    phoneNumber:string;
}