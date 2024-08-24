import { Injectable } from '@nestjs/common';
import db from './constant/database.json';
import { SongDto } from './dto/song';

@Injectable()
export class DatabaseService {
  async db(): Promise<SongDto[]> {
    const data = db.data.map((item) => {
      return {
        ...item,
        overMonth: item.july + item.june + item.august,
      };
    }) as SongDto[];
    return data;
  }
}
