import {Body, Controller, Post, Put} from '@nestjs/common';
import {UserService} from './user.service';
import {RmqService} from "@app/common";
import {CreateUserRequest} from "../dto/create-user.request";
import {getUser} from "../dto/get-user.request";
import {AuthRequest} from "../dto/auth.request";
import {UpdateUserRequest} from "../dto/update-user.request";

@Controller("/api/users")
export class UserController {
    constructor(private readonly userService: UserService, private readonly rmqService: RmqService) {
    }

    @Post('/new')
    async createUser(@Body() request: CreateUserRequest): Promise<any> {
        try {
            const user = await this.userService.savingUser(request);
            return user;
        } catch (e) {
            return {
                "statusCode":400,
                "message":"Email should be unique"
            }
        }
    }

    @Post('/getOne')
    async getOneUser(@Body() request: getUser): Promise<any> {
        try {
            const user = await this.userService.getUser(request);
            return user;
        } catch (e) {
            return "User not Found"
        }
    }

    @Post('/auth')
    async authentication(@Body() request: AuthRequest): Promise<any> {
        console.log(request)
        try {
            const user = await this.userService.authentication(request);
            return user;
        } catch (e) {
            return "User not Found"
        }
    }

    @Put('/update')
    async updateUSer(@Body() request: UpdateUserRequest): Promise<any> {
        try {
            const user = await this.userService.update(request);
            return user;
        } catch (e) {
            return "User not Found"
        }
    }
}
