import { NextRequest, NextResponse } from 'next/server';
import sharp from 'sharp';

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const file = formData.get('image') as File;
    const quality = Number(formData.get('quality')) || 80;
    const width = Number(formData.get('width'));
    const height = Number(formData.get('height'));
    
    if (!file) {
      return NextResponse.json(
        { error: '没有找到图片文件' },
        { status: 400 }
      );
    }

    const buffer = Buffer.from(await file.arrayBuffer());
    let sharpInstance = sharp(buffer);
    
    // 调整尺寸
    if (width && height) {
      sharpInstance = sharpInstance.resize(width, height, {
        fit: 'fill',
      });
    }
    
    // 根据文件类型选择压缩方法
    let compressedBuffer: Buffer;
    if (file.type === 'image/jpeg') {
      compressedBuffer = await sharpInstance
        .jpeg({ quality })
        .toBuffer();
    } else if (file.type === 'image/png') {
      compressedBuffer = await sharpInstance
        .png({ quality })
        .toBuffer();
    } else {
      return NextResponse.json(
        { error: '不支持的图片格式' },
        { status: 400 }
      );
    }

    // 返回压缩后的图片
    return new NextResponse(compressedBuffer, {
      headers: {
        'Content-Type': file.type,
        'Content-Disposition': `attachment; filename="compressed_${file.name}"`,
      },
    });
  } catch (error) {
    console.error('压缩过程出错:', error);
    return NextResponse.json(
      { error: '图片压缩失败' },
      { status: 500 }
    );
  }
} 