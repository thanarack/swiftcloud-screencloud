import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsOptional } from 'class-validator';

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
    description: 'The month of the song',
    required: false,
    enum: ['overMonth', 'june', 'july', 'august'],
  })
  @IsEnum(['overMonth', 'june', 'july', 'august'])
  @IsOptional()
  month?: string;

  @ApiProperty({
    type: String,
    description: 'The year of the song',
    required: false,
    enum: ['year', 'album', 'song'],
  })
  @IsEnum(['year', 'album', 'song'])
  @IsOptional()
  sortBy?: string;
}
