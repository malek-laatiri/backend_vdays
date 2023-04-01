import {IsNotEmpty, IsString} from "class-validator";
import {ApiProperty} from "@nestjs/swagger";

export class DeleteWishlist {

    @IsString()
    @IsNotEmpty()
    @ApiProperty({
        type: String,
        description: 'This is a required property',
    })
    _id: string;


}