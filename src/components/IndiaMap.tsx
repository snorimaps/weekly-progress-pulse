
import React from 'react';

export const IndiaMap = () => {
  return (
    <div className="bg-white rounded-lg shadow-sm border p-4 h-full flex items-center justify-center">
      <div className="w-full h-full max-w-48 max-h-72">
        <svg
          viewBox="0 0 300 400"
          className="w-full h-full text-blue-600"
          fill="currentColor"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Simplified India map outline */}
          <path
            d="M150 50 
               C160 45, 170 50, 175 60
               L180 70
               C185 75, 190 80, 195 90
               L200 100
               C205 110, 210 120, 215 130
               L220 150
               C225 160, 230 170, 235 180
               L240 200
               C245 220, 250 240, 245 260
               L240 280
               C235 300, 230 320, 220 340
               L210 360
               C200 370, 190 375, 180 370
               L170 365
               C160 360, 150 355, 140 350
               L130 345
               C120 340, 110 335, 100 330
               L90 320
               C80 310, 70 300, 65 285
               L60 270
               C55 250, 50 230, 55 210
               L60 190
               C65 180, 70 170, 75 160
               L80 140
               C85 130, 90 120, 95 110
               L100 90
               C105 80, 110 70, 115 60
               L120 55
               C130 50, 140 48, 150 50 Z"
            className="fill-blue-100 stroke-blue-400 stroke-2"
          />
          
          {/* Title */}
          <text x="150" y="30" textAnchor="middle" className="text-xs font-semibold fill-gray-700">
            India
          </text>
          
          {/* Some major states/regions as dots */}
          <circle cx="120" cy="120" r="3" className="fill-blue-500" />
          <circle cx="160" cy="140" r="3" className="fill-blue-500" />
          <circle cx="180" cy="180" r="3" className="fill-blue-500" />
          <circle cx="140" cy="200" r="3" className="fill-blue-500" />
          <circle cx="120" cy="240" r="3" className="fill-blue-500" />
          <circle cx="180" cy="260" r="3" className="fill-blue-500" />
        </svg>
      </div>
    </div>
  );
};
