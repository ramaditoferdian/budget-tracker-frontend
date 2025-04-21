'use client';

import { useState, useEffect } from 'react';

interface ColorPickerProps {
  color: string;
  setColor: (color: string) => void;
}

export default function ColorPicker({ color, setColor }: ColorPickerProps) {
  const [hexColor, setHexColor] = useState(color);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setHexColor(color);
  }, [color]);

  // Validate hex color input format
  const validateHexColor = (color: string) => /^#[0-9A-Fa-f]{6}$/i.test(color);

  const handleHexChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newHexColor = e.target.value;
    setHexColor(newHexColor);

    if (validateHexColor(newHexColor)) {
      setError(null);
      setColor(newHexColor); // Save the color to store if valid
    } else {
      setError('Invalid color format');
    }
  };

  const handleColorPickerChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newColor = e.target.value;
    setColor(newColor); // Update color in store
    setHexColor(newColor); // Update hex input field
    setError(null); // Reset any previous error
  };

  return (
    <div className="flex flex-col items-start gap-3">
      <label className="text-sm text-muted-foreground" htmlFor="color-picker">
        Choose Color
      </label>
      <div className="flex items-center gap-4">
        {/* Color Preview */}
        <div className="relative w-8 h-8">
          <div
            className="w-8 h-8 rounded-full border border-gray-300"
            style={{ backgroundColor: hexColor }}
          />
          <input
            id="color-picker"
            type="color"
            value={hexColor}
            onChange={handleColorPickerChange}
            className="absolute inset-0 opacity-0 cursor-pointer"
          />
        </div>

        {/* Hex Input */}
        <input
          type="text"
          value={hexColor}
          onChange={handleHexChange}
          className={`w-24 h-8 px-2 py-1 rounded-md text-sm border ${
            error ? 'border-red-500' : 'border-gray-200'
          } bg-transparent focus:outline-none focus:ring-1 focus:ring-gray-300`}
          placeholder="#000000"
        />
      </div>

      {/* Error message */}
      {error && <p className="text-sm text-red-500">{error}</p>}
    </div>
  );
}
