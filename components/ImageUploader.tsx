'use client';

import { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { ImageInfo } from '@/types/image';

interface Props {
  onImageSelect: (image: ImageInfo) => void;
}

export default function ImageUploader({ onImageSelect }: Props) {
  const onDrop = useCallback(async (acceptedFiles: File[]) => {
    const file = acceptedFiles[0];
    if (!file) return;

    // 创建预览URL
    const url = URL.createObjectURL(file);
    
    // 获取图片尺寸
    const img = new Image();
    img.src = url;
    await new Promise((resolve) => {
      img.onload = resolve;
    });

    onImageSelect({
      url,
      file,
      size: file.size,
      name: file.name,
      dimensions: {
        width: img.width,
        height: img.height,
      },
    });
  }, [onImageSelect]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'image/png': ['.png'],
      'image/jpeg': ['.jpg', '.jpeg'],
    },
    maxFiles: 1,
  });

  return (
    <div
      {...getRootProps()}
      className={`
        p-8 border-2 border-dashed rounded-xl
        transition-colors duration-200
        ${isDragActive
          ? 'border-blue-400 bg-blue-50 dark:bg-blue-900/20'
          : 'border-gray-300 dark:border-gray-600'
        }
      `}
    >
      <input {...getInputProps()} />
      <div className="text-center">
        <div className="text-4xl mb-4">📸</div>
        <p className="text-gray-600 dark:text-gray-300">
          {isDragActive
            ? '放开以上传图片'
            : '拖放图片到这里，或点击选择图片'
        }
        </p>
        <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
          支持 PNG、JPG 格式
        </p>
      </div>
    </div>
  );
} 