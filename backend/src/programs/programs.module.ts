import { Module } from '@nestjs/common';
import { ProgramsService } from './programs.service';
import { ProgramsController } from './programs.controller';
import { ProgramsResolver } from './programs/programs.resolver';
import { DatabaseModule } from '../database/database.module';

@Module({
  imports: [DatabaseModule],
  controllers: [ProgramsController],
  providers: [ProgramsService, ProgramsResolver],
})
export class ProgramsModule {}
