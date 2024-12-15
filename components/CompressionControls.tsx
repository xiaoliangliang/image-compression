'use client';

interface Props {
  quality: number;
  onQualityChange: (quality: number) => void;
  width: string;
  height: string;
  onDimensionsChange: (width: string, height: string) => void;
  originalDimensions: { width: number; height: number };
  maintainAspectRatio: boolean;
  onAspectRatioChange: (maintain: boolean) => void;
  onCompress: () => Promise<void>;
}

export default function CompressionControls({
  quality,
  onQualityChange,
  width,
  height,
  onDimensionsChange,
  originalDimensions,
  maintainAspectRatio,
  onAspectRatioChange,
  onCompress,
}: Props) {
  const handleWidthChange = (newWidth: string) => {
    if (newWidth === '') {
      onDimensionsChange('', maintainAspectRatio ? '' : height);
      return;
    }

    const numWidth = parseInt(newWidth);
    if (isNaN(numWidth)) return;

    if (maintainAspectRatio) {
      const aspectRatio = originalDimensions.width / originalDimensions.height;
      const newHeight = Math.round(numWidth / aspectRatio);
      onDimensionsChange(
        numWidth.toString(),
        newHeight.toString()
      );
    } else {
      onDimensionsChange(numWidth.toString(), height);
    }
  };

  const handleHeightChange = (newHeight: string) => {
    if (newHeight === '') {
      onDimensionsChange(maintainAspectRatio ? '' : width, '');
      return;
    }

    const numHeight = parseInt(newHeight);
    if (isNaN(numHeight)) return;

    if (maintainAspectRatio) {
      const aspectRatio = originalDimensions.width / originalDimensions.height;
      const newWidth = Math.round(numHeight * aspectRatio);
      onDimensionsChange(
        newWidth.toString(),
        numHeight.toString()
      );
    } else {
      onDimensionsChange(width, numHeight.toString());
    }
  };

  return (
    <div className="p-6 rounded-xl bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm shadow-lg">
      <h3 className="text-lg font-semibold mb-4">压缩设置</h3>
      
      <div className="space-y-6">
        {/* 质量设置 */}
        <div>
          <label className="block text-sm text-gray-600 dark:text-gray-300 mb-2">
            压缩质量：{quality}%
          </label>
          <input
            type="range"
            min="1"
            max="100"
            value={quality}
            onChange={(e) => onQualityChange(Number(e.target.value))}
            className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-blue-500"
          />
        </div>

        {/* 尺寸设置 */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-600 dark:text-gray-300">尺寸调整</span>
            <label className="flex items-center space-x-2">
              <input
                type="checkbox"
                checked={maintainAspectRatio}
                onChange={(e) => onAspectRatioChange(e.target.checked)}
                className="rounded text-blue-500"
              />
              <span className="text-sm text-gray-600 dark:text-gray-300">保持宽高比</span>
            </label>
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm text-gray-600 dark:text-gray-300 mb-1">
                宽度 (px)
              </label>
              <input
                type="text"
                inputMode="numeric"
                pattern="[0-9]*"
                value={width}
                onChange={(e) => handleWidthChange(e.target.value)}
                placeholder={originalDimensions.width.toString()}
                className="w-full px-3 py-2 border rounded-lg bg-white dark:bg-gray-700 dark:border-gray-600"
              />
            </div>
            <div>
              <label className="block text-sm text-gray-600 dark:text-gray-300 mb-1">
                高度 (px)
              </label>
              <input
                type="text"
                inputMode="numeric"
                pattern="[0-9]*"
                value={height}
                onChange={(e) => handleHeightChange(e.target.value)}
                placeholder={originalDimensions.height.toString()}
                className="w-full px-3 py-2 border rounded-lg bg-white dark:bg-gray-700 dark:border-gray-600"
              />
            </div>
          </div>
        </div>
        
        {/* 压缩按钮 */}
        <button
          onClick={onCompress}
          className="w-full py-2 px-4 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition-colors"
        >
          开始压缩
        </button>
      </div>
    </div>
  );
} 