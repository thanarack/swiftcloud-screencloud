import { Test, TestingModule } from '@nestjs/testing';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseService } from './database.service';
import { SortBy } from './dto/search';

describe('AppController', () => {
  let appController: AppController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [AppController],
      providers: [DatabaseService, AppService],
    }).compile();

    appController = app.get<AppController>(AppController);
  });

  describe('root', () => {
    it('should return song list', async () => {
      expect(await appController.search({})).toEqual({
        data: expect.any(Array),
      });
    });

    it('should return song list with q search and response is only 1 item', async () => {
      const result = await appController.search({
        q: '22',
        sortBy: SortBy.popularOverAll,
      });
      expect(result.data.length).toBe(1);
    });
  });
});
