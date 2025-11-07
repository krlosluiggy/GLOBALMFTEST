import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Query,
  ParseIntPipe,
} from '@nestjs/common';
import { ProgramsService } from './programs.service';
import { CreateProgramDto } from './dto/create-program.dto';
import { UpdateProgramDto } from './dto/update-program.dto';
import { FilterProgramDto } from './dto/filter-program.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('programs')
export class ProgramsController {
  constructor(private readonly programsService: ProgramsService) {}

  @UseGuards(JwtAuthGuard) 
  @Post()
  create(@Body() createProgramDto: CreateProgramDto) {
    return this.programsService.create(createProgramDto);
  }

  @Get()
  findAll(@Query() filterDto: FilterProgramDto) {
    return this.programsService.findAll(filterDto);
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.programsService.findOne(id);
  }

  @UseGuards(JwtAuthGuard) 
  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateProgramDto: UpdateProgramDto,
  ) {
    return this.programsService.update(id, updateProgramDto);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.programsService.remove(id);
  }

  @Get(':id/users')
  getUsersByProgram(@Param('id', ParseIntPipe) id: number) {
    return this.programsService.getUsersByProgram(id);
  }
}
