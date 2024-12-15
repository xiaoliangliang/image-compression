'use client';

import { useState } from 'react';
import ImageUploader from '@/components/ImageUploader';
import ImagePreview from '@/components/ImagePreview';
import CompressionControls from '@/components/CompressionControls';
import { ImageInfo } from '@/types/image';

export default function Home() {
  const [originalImage, setOriginalImage] = useState<ImageInfo | null>(null);
  const [compressedImage, setCompressedImage] = useState<ImageInfo | null>(null);
  const [quality, setQuality] = useState(80);
  const [width, setWidth] = useState('');
  const [height, setHeight] = useState('');
  const [maintainAspectRatio, setMaintainAspectRatio] = useState(true);

  const handleImageSelect = (image: ImageInfo) => {
    setOriginalImage(image);
    if (image.dimensions) {
      setWidth(image.dimensions.width.toString());
      setHeight(image.dimensions.height.toString());
    }
  };

  const handleCompress = async () => {
    if (!originalImage) return;

    try {
      const formData = new FormData();
      formData.append('image', originalImage.file);
      formData.append('quality', quality.toString());
      const numWidth = width ? parseInt(width) : originalImage.dimensions?.width;
      const numHeight = height ? parseInt(height) : originalImage.dimensions?.height;
      
      if (!numWidth || !numHeight) {
        throw new Error('请输入有效的宽度和高度');
      }

      formData.append('width', numWidth.toString());
      formData.append('height', numHeight.toString());

      const response = await fetch('/api/compress', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || '压缩失败');
      }

      const blob = await response.blob();
      const url = URL.createObjectURL(blob);

      setCompressedImage({
        url,
        file: new File([blob], `compressed_${originalImage.name}`, { type: blob.type }),
        size: blob.size,
        name: `compressed_${originalImage.name}`,
        dimensions: { width: numWidth, height: numHeight },
      });
    } catch (error) {
      console.error('压缩失败:', error);
      alert(error instanceof Error ? error.message : '图片压缩失败，请重试');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
      <main className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold text-center mb-8 bg-clip-text text-transparent bg-gradient-to-r from-gray-900 to-gray-600 dark:from-gray-100 dark:to-gray-400">
          图片压缩工具
        </h1>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="space-y-6">
            <ImageUploader onImageSelect={handleImageSelect} />
            {originalImage?.dimensions && (
              <CompressionControls
                quality={quality}
                onQualityChange={setQuality}
                width={width}
                height={height}
                onDimensionsChange={(w, h) => {
                  setWidth(w);
                  setHeight(h);
                }}
                originalDimensions={originalImage.dimensions}
                maintainAspectRatio={maintainAspectRatio}
                onAspectRatioChange={setMaintainAspectRatio}
                onCompress={handleCompress}
              />
            )}
          </div>

          <div className="space-y-6">
            {originalImage && (
              <ImagePreview
                title="原始图片"
                image={originalImage}
              />
            )}
            {compressedImage && (
              <ImagePreview
                title="压缩后"
                image={compressedImage}
                showDownload
              />
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
