import { Test, TestingModule } from '@nestjs/testing';
import { ProgramsService } from './programs.service';
import { DatabaseService } from '../database/database.service';

describe('ProgramsService', () => {
  let service: ProgramsService;

  const mockDatabaseService = {
    query: jest.fn(),
    execute: jest.fn(),
  };

  const mockProgramsService = {
    findAll: jest.fn(),
    findOne: jest.fn(),
    create: jest.fn(),
    update: jest.fn(),
    remove: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ProgramsService,
        {
          provide: DatabaseService,
          useValue: mockDatabaseService,
        },
        {
          provide: ProgramsService,
          useValue: mockProgramsService,
        },
      ],
    }).compile();

    service = module.get<ProgramsService>(ProgramsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
