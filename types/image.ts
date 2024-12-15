export interface ImageInfo {
  url: string;
  file: File;
  size: number;
  name: string;
  dimensions?: {
    width: number;
    height: number;
  };
} 