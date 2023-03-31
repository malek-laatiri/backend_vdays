import {Prop, Schema, SchemaFactory} from "@nestjs/mongoose";
import {AbstractDocument} from "@app/common";
import mongoose from "mongoose";
import {User} from "../../../user/schemas/User.schema";
import {ApiProperty} from "@nestjs/swagger";

@Schema({versionKey: false})
export class Wishlist extends AbstractDocument {
    @Prop({ required: true })
    @ApiProperty({
        type: String,
        description: 'This is a required property',
    })
    title: string;

    @Prop({ default: Date.now })
    @ApiProperty({
        type: Date,
        description: 'This is a required property',
    })
    date: Date;
    @Prop({ required: true })
    @ApiProperty({
        type: String,
        description: 'This is a required property',
    })
    @ApiProperty({
        type: String,
        description: 'This is a required property',
    })
    url: string;
    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User' })
    @ApiProperty({
        type: String,
        description: 'This is a required property',
    })
    user: string;

}

export const WishlistSchema = SchemaFactory.createForClass(Wishlist);