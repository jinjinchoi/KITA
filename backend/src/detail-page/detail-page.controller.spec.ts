import { Test, TestingModule } from '@nestjs/testing';
import { DetailPageController } from './detail-page.controller';
import { DetailPageService } from './detail-page.service';

describe('DetailPageController', () => {
  let controller: DetailPageController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [DetailPageController],
      providers: [DetailPageService],
    }).compile();

    controller = module.get<DetailPageController>(DetailPageController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
