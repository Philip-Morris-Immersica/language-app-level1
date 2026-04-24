'use client';

import { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { useTranslate } from '@/i18n/useTranslate';

export interface MapLabel {
  x: number;   // percentage from left (0–100)
  y: number;   // percentage from top (0–100)
  name: string; // institution name in Bulgarian
}

export interface MapLegendItem {
  imageUrl: string;
  name: string;
}

interface MapWithLabelsProps {
  imageUrl: string;
  labels: MapLabel[];
  legendItems?: MapLegendItem[];
  legendTitle?: string;
}

export function MapWithLabels({ imageUrl, labels, legendItems, legendTitle }: MapWithLabelsProps) {
  const [legendOpen, setLegendOpen] = useState(false);
  const translatedLegendTitle = useTranslate(legendTitle ?? 'Легенда');

  return (
    <div className="mb-5 space-y-2">
      {/* Map image with overlaid labels */}
      <div className="relative w-full overflow-hidden rounded-xl border border-gray-200 shadow-sm">
        <img
          src={imageUrl}
          alt="Карта"
          className="w-full h-auto block"
          draggable={false}
        />
        {labels.map((label, i) => (
          <div
            key={i}
            className="absolute flex items-center justify-center"
            style={{
              left: `${label.x}%`,
              top: `${label.y}%`,
              transform: 'translate(-50%, -50%)',
            }}
          >
            <span
              className="bg-white/90 text-[#0279C3] font-semibold text-[10px] sm:text-xs md:text-sm
                         px-1 py-0.5 rounded leading-tight text-center whitespace-nowrap
                         border border-[#0279C3]/30 shadow-sm"
            >
              {label.name}
            </span>
          </div>
        ))}
      </div>

      {/* Collapsible legend */}
      {legendItems && legendItems.length > 0 && (
        <div className="rounded-xl border border-gray-200 overflow-hidden">
          <button
            onClick={() => setLegendOpen(o => !o)}
            className="w-full flex items-center justify-between px-4 py-2.5
                       bg-gray-50 hover:bg-gray-100 transition-colors text-sm font-semibold text-gray-700"
          >
            <span>{translatedLegendTitle}</span>
            {legendOpen ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
          </button>
          {legendOpen && (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2 p-3 bg-white">
              {legendItems.map((item, i) => (
                <div key={i} className="flex items-center gap-2">
                  <img
                    src={item.imageUrl}
                    alt={item.name}
                    className="w-8 h-8 object-contain flex-shrink-0 rounded"
                  />
                  <span className="text-xs md:text-sm text-gray-700 font-medium leading-tight">
                    {item.name}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
