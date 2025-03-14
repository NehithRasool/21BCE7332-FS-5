import { Controller, Post, Get, UploadedFile, Param, UseInterceptors } from "@nestjs/common";
import { FileInterceptor } from "@nestjs/platform-express";
import { VideosService } from "./videos.service";

@Controller("videos")
export class VideosController {
  constructor(private readonly videosService: VideosService) {}

  /**
   * Upload a video file to S3
   */
  @Post("upload")
  @UseInterceptors(FileInterceptor("file"))
  async uploadVideo(@UploadedFile() file: Express.Multer.File) {
    if (!file) {
      throw new Error("No file uploaded!");
    }
    const url = await this.videosService.uploadVideo(file.buffer, file.originalname);
    return { message: "Video uploaded successfully!", url };
  }

  /**
   * Get a signed URL to stream a video
   */
  @Get("stream/:key")
  async streamVideo(@Param("key") key: string) {
    return { signedUrl: await this.videosService.getSignedVideoUrl(key) };
  }
}
