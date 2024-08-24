import { Injectable } from '@nestjs/common';
import { DatabaseService } from './database.service';
import { SearchSongDto } from './dto/search';
import { SongDto } from './dto/song';

@Injectable()
export class AppService {
  constructor(private readonly databaseService: DatabaseService) {}

  async getSearch(body: SearchSongDto): Promise<SongDto[]> {
    const data = await this.databaseService.db();

    let result = data;

    if (body.q) {
      result = result.filter((item) => {
        return (
          new RegExp(body.q, 'ig').test(item.song) ||
          new RegExp(body.q, 'ig').test(item.album) ||
          new RegExp(body.q, 'ig').test(item.artist)
        );
      });
    }

    if (body.year) {
      result = result.filter((item) => {
        return item.year === +body.year;
      });
    }

    if (body.month) {
      result = result.sort((a, b) => {
        if (body.month === 'overMonth') return b.overMonth - a.overMonth;
        if (b[body.month] > a[body.month]) return 1;
        if (b[body.month] < a[body.month]) return -1;
        return b.overMonth - a.overMonth;
      });
    }

    if (body.sortBy) {
      result = result.sort((a, b) => {
        return b[body.sortBy] - a[body.sortBy];
      });
    } else {
      result = result.sort((a, b) => {
        return b.overMonth - a.overMonth;
      });
    }

    return result || [];
  }
}
