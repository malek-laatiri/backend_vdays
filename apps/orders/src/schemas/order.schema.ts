import {Schema, Prop, SchemaFactory} from "@nestjs/mongoose";
import {AbstractDocument} from "@app/common";
import {ApiProperty} from "@nestjs/swagger";
import mongoose from "mongoose";

@Schema({versionKey: false})
export class Order extends AbstractDocument {
    @Prop()
    @ApiProperty({
        type: Date,
        description: 'This is a required property',
    })
    imageFile: string;
    @Prop({ default: Date.now })
    @ApiProperty({
        type: Date,
        description: 'This is a required property',
    })
    date: Date;
    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User' })
    @ApiProperty({
        type: String,
        description: 'This is a required property',
    })
    user: string;


}

export const OrderSchema = SchemaFactory.createForClass(Order);