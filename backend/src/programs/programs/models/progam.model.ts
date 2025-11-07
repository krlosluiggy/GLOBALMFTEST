import { Field, Int, ObjectType } from "@nestjs/graphql";

@ObjectType()
export class ProgramModel{
@Field(()=>Int)
id: number;

@Field()
name: string;

@Field({nullable: true})
description: string;

@Field()
start_date: Date;

@Field()
status: string;

@Field()
created_at: Date;

@Field()
updated_at: Date;

}


@ObjectType()
export class ProgramResponse {
    @Field(()=>[ProgramModel])
    data: ProgramModel[];

    @Field(()=>Int)
    total: number;
}
