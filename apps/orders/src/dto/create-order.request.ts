import {IsNotEmpty, IsPositive, IsString} from "class-validator";
import {ApiProperty} from "@nestjs/swagger";
import {Prop} from "@nestjs/mongoose";
import mongoose from "mongoose";

export class CreateOrderRequest {
    @ApiProperty({
        type: String,
        description: 'This is a required property',
    })
    imageFile: string;

    @ApiProperty({
        type: Date,
        description: 'This is a required property',
    })
    date: Date;

    @Prop({type: mongoose.Schema.Types.ObjectId, ref: 'User'})
    @ApiProperty({
        type: String,
        description: 'This is a required property',
    })
    user: string;
}