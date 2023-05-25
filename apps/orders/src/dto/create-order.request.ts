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
        type: String,
        description: 'This is a required property',
    })
    top: string;
    @ApiProperty({
        type: String,
        description: 'This is a required property',
    })
    bottom: string;
    @ApiProperty({
        type: String,
        description: 'This is a required property',
    })
    left: string;
    @ApiProperty({
        type: String,
        description: 'This is a required property',
    })
    right: string;
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