import {Prop, Schema, SchemaFactory} from "@nestjs/mongoose";
import {AbstractDocument} from "@app/common";
import mongoose from "mongoose";

@Schema({versionKey: false})
export class Settings_user extends AbstractDocument {
    @Prop() week: boolean;
    @Prop() emailReceive: boolean;
    @Prop() recommendation: boolean;
    @Prop({type: mongoose.Schema.Types.ObjectId, ref: 'User'}) user: string;

}

export const Settings_userSchema = SchemaFactory.createForClass(Settings_user);