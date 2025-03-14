import { Injectable, NotFoundException } from "@nestjs/common";
import { S3Client, PutObjectCommand, GetObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import * as dotenv from "dotenv";
dotenv.config();

@Injectable()
export class VideosService {
  private s3: S3Client;
  private bucketName: string;
  private videosDB: { id: string; title: string; url: string }[] = []; // Simulated DB

  constructor() {
    this.bucketName = process.env.AWS_S3_BUCKET_NAME || "your-default-bucket";
    
    this.s3 = new S3Client({
      region: process.env.AWS_REGION || "us-east-1",
      credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!,
      },
    });
  }

  /**
   * Upload video to AWS S3
   */
  async uploadVideo(file: Buffer, filename: string): Promise<string> {
    const uploadParams = {
      Bucket: this.bucketName,
      Key: filename,
      Body: file,
      ContentType: "video/mp4",
    };

    await this.s3.send(new PutObjectCommand(uploadParams));

    const url = `https://${this.bucketName}.s3.amazonaws.com/${filename}`;
    
    // Simulate saving video to DB
    this.videosDB.push({ id: filename, title: filename, url });

    return url;
  }

  /**
   * Generate a signed URL to stream a video
   */
  async getSignedVideoUrl(key: string): Promise<string> {
    const command = new GetObjectCommand({
      Bucket: this.bucketName,
      Key: key,
    });

    const signedUrl = await getSignedUrl(this.s3, command, { expiresIn: 3600 });
    return signedUrl;
  }

  /**
   * Get video details by ID
   */
  async getVideoById(id: string) {
    const video = this.videosDB.find((v) => v.id === id);
    if (!video) {
      throw new NotFoundException("Video not found");
    }
    return video;
  }

  /**
   * Get all uploaded videos
   */
  async getAllVideos() {
    return this.videosDB;
  }
}
