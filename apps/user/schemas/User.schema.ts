import {Prop, Schema, SchemaFactory} from "@nestjs/mongoose";
import {AbstractDocument} from "@app/common";

@Schema({versionKey: false})
export class User extends AbstractDocument {
    @Prop({ required: true }) firstname: string;
    @Prop({ required: true }) lastname: string;
    @Prop({unique: true}) email: string;
    @Prop({ required: true }) password: string;
    @Prop({ default: Date.now }) createdAt: Date;


}

export const UserSchema = SchemaFactory.createForClass(User);