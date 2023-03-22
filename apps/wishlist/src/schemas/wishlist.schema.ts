import {Prop, Schema, SchemaFactory} from "@nestjs/mongoose";
import {AbstractDocument} from "@app/common";

@Schema({versionKey: false})
export class Wishlist extends AbstractDocument {
    @Prop() title: string;
    @Prop() date: string;
    @Prop() url: string;


}

export const WishlistSchema = SchemaFactory.createForClass(Wishlist);