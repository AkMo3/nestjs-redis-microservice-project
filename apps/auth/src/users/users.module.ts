import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { User, UserSchema } from "./schemas/user.schema";
import { UserController } from "./users.controller";
import { UserService } from "./users.service";
import { UserRepository } from "./users.repository";

@Module({
    imports: [MongooseModule.forFeature([{name: User.name, schema: UserSchema}])],
    controllers: [UserController],
    providers: [UserService, UserRepository],
    exports: [UserService],
})

export class UsersModule {}