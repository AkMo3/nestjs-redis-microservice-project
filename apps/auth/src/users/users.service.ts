import { Injectable, UnauthorizedException, UnprocessableEntityException } from "@nestjs/common";
import { UserRepository } from './users.repository';
import { CreateUserRequest } from "./dto/create-user.request";
import { User } from "./schemas/user.schema";
import * as bcrypt from 'bcrypt'
import { use } from "passport";

@Injectable()
export class UserService {
    constructor(private readonly userRepository : UserRepository) {}

    async createUser(request: CreateUserRequest) {
        await this.validateCreateUserRequest(request);
        const user = this.userRepository.create({
            ...request,
            password: await bcrypt.hash(request.password, 10),
        });
        return user;
    }

    private async validateCreateUserRequest(request: CreateUserRequest) {
        let user: User;
        try {
            user = await this.userRepository.findOne({email: request.email});
        }
        catch(err){}

        if (user) throw new UnprocessableEntityException('Email already exists');
    }

    async validateUser(email: string, password: string) {
        try {
            const user = await this.userRepository.findOne({email});
            const passwordIsValid = await bcrypt.compare(password, user.password);
            if (!passwordIsValid) {
                throw new UnauthorizedException('Credentials not valid');
            }
            return user;
        }
        catch (err) {
            throw new UnauthorizedException('Credentials not valid');
        }
    }

    async getUser(getUserArgs: Partial<User>) {
        return this.userRepository.findOne(getUserArgs);
    }
}