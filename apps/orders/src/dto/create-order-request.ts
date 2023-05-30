import { IsNotEmpty, IsNumber, IsPhoneNumber, IsPositive, IsString } from "class-validator";

export class CreateOrderRequest {

    @IsNotEmpty()
    @IsString()
    name: string;

    @IsNotEmpty()
    @IsPositive()
    @IsNumber()
    price: number;

    @IsPhoneNumber()
    phoneNumber: string; 

}