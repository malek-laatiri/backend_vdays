import {IsNotEmpty, IsPositive, IsString, IsPhoneNumber} from "class-validator";

export class CreateQrRequest {

    country:string;

    query:number;

    language:string;

    user:string;

}