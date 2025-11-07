import { Args, Int, Query, Resolver } from '@nestjs/graphql';
import { ProgramsService } from '../programs.service';
import { ProgramResponse } from './models/progam.model';

@Resolver()
export class ProgramsResolver {

    constructor(private readonly programsService: ProgramsService) {}

    @Query(() => ProgramResponse,{name: 'programs'})
    async getPrograms(
        @Args('filter', { type: () => String, defaultValue: '' }) filter: string,
        @Args('page', { type: () => Int, defaultValue: 1 }) page: number,
        @Args('limit', { type: () => Int, defaultValue: 10 }) limit: number,
    ) {
        const result =  await this.programsService.findAll({
            search:filter,
            page:page || 1,
            limit:limit || 10
        });
        return {
            items:result.data,
            pagination:result.pagination.total
        };
    }
    
}
