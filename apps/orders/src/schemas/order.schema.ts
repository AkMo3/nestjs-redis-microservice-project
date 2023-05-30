import { AbstractDocument } from "@app/common";
import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { string } from "joi";

@Schema({versionKey: false})
export class Order extends AbstractDocument {
    @Prop()
    name: string;

    @Prop()
    price: number;

    @Prop()
    phoneNumber: string;
}

export const OrderSchema = SchemaFactory.createForClass(Order);
