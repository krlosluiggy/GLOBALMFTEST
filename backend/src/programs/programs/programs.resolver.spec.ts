import { Test, TestingModule } from '@nestjs/testing';
import { ProgramsResolver } from './programs.resolver';
import { ProgramsService } from '../programs.service';
import { DatabaseService } from '../../database/database.service';

describe('ProgramsResolver', () => {
  let resolver: ProgramsResolver;
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
      providers: [ProgramsResolver,
        {
          provide: ProgramsService,
          useValue: mockProgramsService,
        },
        {
          provide: DatabaseService,
          useValue: mockDatabaseService,
        }
      ],
    }).compile();

    resolver = module.get<ProgramsResolver>(ProgramsResolver);
    
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();

  });
});
