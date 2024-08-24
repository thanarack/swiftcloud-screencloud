import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsOptional } from 'class-validator';

export enum SortBy {
  year = 'year',
  album = 'album',
  song = 'song',
  popularLastMonth = 'popularLastMonth',
  popularOverAll = 'popularOverAll',
}

export class SearchSongDto {
  @ApiProperty({
    type: String,
    description: 'The name of the song',
    required: false,
  })
  @IsOptional()
  q?: string;

  @ApiProperty({
    type: String,
    description: 'The year of the song',
    required: false,
  })
  @IsOptional()
  year?: number;

  @ApiProperty({
    type: String,
    description: 'The year of the song',
    required: false,
    enum: SortBy,
  })
  @IsEnum(SortBy)
  @IsOptional()
  sortBy?: string;
}
