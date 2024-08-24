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

    if (sortBy) {
      result = result.sort((a, b) => {
        const compare = (aProp: string, bProp: string) => b[bProp] - a[aProp];

        if (sortBy) {
          if (sortBy === SortBy.popularOverAll) {
            return compare('overMonth', 'overMonth');
          }

          // Assume last month is july
          if (sortBy === SortBy.popularLastMonth) {
            return compare('july', 'july');
          }

          return compare(sortBy, sortBy);
        }

        return compare('overMonth', 'overMonth');
      });
    } else {
      result = result.sort((a, b) => b.overMonth - a.overMonth);
    }

    return result || [];
  }
}
