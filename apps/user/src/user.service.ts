import {Injectable, Logger} from '@nestjs/common';
import {HttpService} from "@nestjs/axios";
import {UserRepository} from "./User.repository";
import {CreateUserRequest} from "../dto/create-user.request";

@Injectable()
export class UserService {
    private readonly logger = new Logger(UserService.name);

    constructor(private readonly httpService: HttpService, private readonly userRepository: UserRepository) {
    }

    async savingUser(request: CreateUserRequest) {
        this.logger.log('saving new user...');
        try {
            const user = await this.userRepository.create(request);
            return user;
        } catch (err) {
            throw err;
        }
    }

    async getUser(request: any) {
        this.logger.log('fetching user...');
        try {
            const user = await this.userRepository.find({_id:request._id});
            return user;
        } catch (err) {
            throw err;
        }
    }

    async authentication(request: any) {
        this.logger.log('fetching user...');
        try {
            const user = await this.userRepository.find({email:request.email,password:request.password});
            return user;
        } catch (err) {
            throw err;
        }
    }
}
