import { Test, TestingModule } from '@nestjs/testing';
import { PartnershipsController } from './partnerships.controller';

describe('PartnershipsController', () => {
  let controller: PartnershipsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PartnershipsController],
    }).compile();

    controller = module.get<PartnershipsController>(PartnershipsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
