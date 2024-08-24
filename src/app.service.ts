import { Injectable } from '@nestjs/common';
import { DatabaseService } from './database.service';
import { SearchSongDto, SortBy } from './dto/search';
import { SongDto } from './dto/song';

@Injectable()
export class AppService {
  constructor(private readonly databaseService: DatabaseService) {}

  async getSearch({ q, year, sortBy }: SearchSongDto): Promise<SongDto[]> {
    const data = await this.databaseService.db();

    let result = data;

    if (q) {
      result = result.filter(
        (item) =>
          new RegExp(q, 'ig').test(item.song) ||
          new RegExp(q, 'ig').test(item.album) ||
          new RegExp(q, 'ig').test(item.artist),
      );
    }

    if (year) {
      result = result.filter((item) => item.year === +year);
    }

    // Logic to get last month here in real project.
    // Assume last month is july
    const lastMonth = 'july';

    result = result.sort((a, b) => {
      const compare = (aProp: string, bProp: string) => b[bProp] - a[aProp];

      if (sortBy === SortBy.popularLastMonth) {
        return compare(lastMonth, lastMonth);
      }

      return compare('overMonth', 'overMonth');
    });

    return result || [];
  }
}
