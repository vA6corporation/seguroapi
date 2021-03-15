import { Test, TestingModule } from '@nestjs/testing';
import { DirectsController } from './directs.controller';

describe('DirectsController', () => {
  let controller: DirectsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [DirectsController],
    }).compile();

    controller = module.get<DirectsController>(DirectsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
