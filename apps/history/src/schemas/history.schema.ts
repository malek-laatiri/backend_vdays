import {Schema, Prop, SchemaFactory} from "@nestjs/mongoose";
import {AbstractDocument} from "@app/common";

@Schema({versionKey: false})
export class History extends AbstractDocument {
    @Prop()
    title: string;
    @Prop()
    date: string;
    @Prop()
    isQr:boolean;


}

export const HistorySchema = SchemaFactory.createForClass(History);