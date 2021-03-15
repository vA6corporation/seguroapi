import { Test, TestingModule } from '@nestjs/testing';
import { DirectsService } from './directs.service';

describe('DirectsService', () => {
  let service: DirectsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DirectsService],
    }).compile();

    service = module.get<DirectsService>(DirectsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
