import { Test, TestingModule } from '@nestjs/testing';
import { BusServiceService } from '../bus-service/bus-service.service';

describe('BusServiceService', () => {
  let service: BusServiceService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [BusServiceService],
    }).compile();

    service = module.get<BusServiceService>(BusServiceService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
