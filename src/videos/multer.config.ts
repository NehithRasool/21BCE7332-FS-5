import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { VideosService } from './videos.service';
import { VideosController } from './videos.controller';
import { Video } from './video.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Video])],
  providers: [VideosService],
  controllers: [VideosController],
})
export class VideosModule {}
