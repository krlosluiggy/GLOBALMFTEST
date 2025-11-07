import { Test, TestingModule } from '@nestjs/testing';
import { ProgramsController } from './programs.controller';
import { ProgramsService } from './programs.service';
import { DatabaseService } from '../database/database.service';

describe('ProgramsController', () => {
  let controller: ProgramsController;

  const mockDatabaseService = {
    query: jest.fn(),
    execute: jest.fn(),
  };




  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ProgramsController],
      providers: [
        ProgramsService,
        {
          provide: DatabaseService,
          useValue: mockDatabaseService,
        },
      ],
    }).compile();

    controller = module.get<ProgramsController>(ProgramsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
