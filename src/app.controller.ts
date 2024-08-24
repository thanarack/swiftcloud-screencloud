import { Controller, Get, Query } from '@nestjs/common';
import { AppService } from './app.service';
import { SearchSongDto } from './dto/search';
import { ApiOkResponse, ApiProperty } from '@nestjs/swagger';
import { SongDto } from './dto/song';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('search')
  @ApiProperty({ type: SearchSongDto })
  @ApiOkResponse({ type: [SongDto] })
  async search(
    @Query() searchSongDto: SearchSongDto,
  ): Promise<{ data: SongDto[] }> {
    const getSearch = await this.appService.getSearch(searchSongDto);
    return {
      data: getSearch,
    };
  }
}
