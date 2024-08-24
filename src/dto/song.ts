import { ApiProperty } from '@nestjs/swagger';

export class SongDto {
  @ApiProperty({
    example: 'The Last Unicorn',
    description: 'The name of the song',
  })
  song: string;

  @ApiProperty({
    example: 'Kendrick Lamar',
    description: 'The name of the artist',
  })
  artist: string;

  @ApiProperty({
    example: 'Kendrick Lamar',
    description: 'The name of the artist',
  })
  writer: string;

  @ApiProperty({
    example: 'DAMN.',
    description: 'The name of the album',
  })
  album: string;

  @ApiProperty({
    example: 2020,
    description: 'The year of the song',
  })
  year: number;

  @ApiProperty({
    example: 3,
    description: 'The month of the song',
  })
  june: number;

  @ApiProperty({
    example: 3,
    description: 'The month of the song',
  })
  july: number;

  @ApiProperty({
    example: 3,
    description: 'The month of the song',
  })
  august: number;

  @ApiProperty({
    example: 3,
    description: 'The month of the song',
  })
  overMonth: number;
}
