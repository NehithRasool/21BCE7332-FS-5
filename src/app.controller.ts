import { Controller, Get, Param, Post, UploadedFile, UseInterceptors } from "@nestjs/common";
import { FileInterceptor } from "@nestjs/platform-express";
import { VideosService } from "./videos/videos.service";

@Controller()
export class AppController {
  constructor(private readonly videosService: VideosService) {}

  /**
   * Upload a video file
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
   * Get signed URL for video streaming
   */
  @Get("stream/:id")
  async getSignedVideoUrl(@Param("id") id: string) {
    return { signedUrl: await this.videosService.getSignedVideoUrl(id) };
  }

  /**
   * Get video details by ID
   */
  @Get("video/:id")
  async getVideoById(@Param("id") id: string) {
    return await this.videosService.getVideoById(id);
  }

  /**
   * Get all videos
   */
  @Get("videos")
  async getAllVideos() {
    return await this.videosService.getAllVideos();
  }
}
