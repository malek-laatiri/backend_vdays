import {Schema, Prop, SchemaFactory} from "@nestjs/mongoose";
import {AbstractDocument} from "@app/common";
import {User} from "../../../user/schemas/User.schema";
import mongoose from "mongoose";

@Schema({versionKey: false})
export class History extends AbstractDocument {
    @Prop({ required: true })
    title: string;
    @Prop({ default: Date.now })
    date: Date;
    @Prop()
    isQr:boolean;
    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User' })
    user: string;

}

export const HistorySchema = SchemaFactory.createForClass(History);