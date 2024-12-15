'use client';

import Image from 'next/image';
import { ImageInfo } from '@/types/image';
import { formatFileSize } from '@/utils/format';

interface Props {
  title: string;
  image: ImageInfo;
  showDownload?: boolean;
}

export default function ImagePreview({ title, image, showDownload }: Props) {
  return (
    <div className="p-6 rounded-xl bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm shadow-lg">
      <h3 className="text-lg font-semibold mb-4">{title}</h3>
      
      {/* 图片预览 */}
      <div className="relative aspect-video w-full mb-4 bg-gray-100 dark:bg-gray-700 rounded-lg overflow-hidden">
        <Image
          src={image.url}
          alt={image.name}
          fill
          className="object-contain"
        />
      </div>
      
      {/* 图片信息 */}
      <div className="space-y-2 text-sm text-gray-600 dark:text-gray-300">
        <p>文件名：{image.name}</p>
        <p>大小：{formatFileSize(image.size)}</p>
        {image.dimensions && (
          <p>尺寸：{image.dimensions.width} × {image.dimensions.height}</p>
        )}
      </div>
      
      {/* 下载按钮 */}
      {showDownload && (
        <button
          onClick={() => {
            const link = document.createElement('a');
            link.href = image.url;
            link.download = `compressed_${image.name}`;
            link.click();
          }}
          className="mt-4 w-full py-2 px-4 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition-colors"
        >
          下载压缩后的图片
        </button>
      )}
    </div>
  );
} 