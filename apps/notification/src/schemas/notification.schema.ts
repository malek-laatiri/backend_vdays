import {Prop, Schema, SchemaFactory} from "@nestjs/mongoose";
import {AbstractDocument} from "@app/common";
import {User} from "../../../user/schemas/User.schema";
import mongoose from "mongoose";

@Schema({versionKey: false})
export class Notification extends AbstractDocument {
    @Prop({required: true})
    title: string;
    @Prop({required: true})
    url: string;
    @Prop({type: mongoose.Schema.Types.ObjectId, ref: 'User'})
    user: string;

}

export const NotificationSchema = SchemaFactory.createForClass(Notification);