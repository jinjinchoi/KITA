import { Test, TestingModule } from '@nestjs/testing';
import { DetailPageService } from './detail-page.service';

describe('DetailPageService', () => {
  let service: DetailPageService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DetailPageService],
    }).compile();

    service = module.get<DetailPageService>(DetailPageService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
