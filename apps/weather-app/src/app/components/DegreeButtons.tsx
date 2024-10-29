'use client'
import React, { useState } from 'react';

interface TemperatureSwitcherProps {
  onUnitChange: (unit: string) => void;
}

function TemperatureSwitcher({ onUnitChange }: TemperatureSwitcherProps) {
  const [selectedUnit, setSelectedUnit] = useState('C');

  // Function to handle the unit change
  const handleUnitChange = (unit: string) => {
    setSelectedUnit(unit);
    onUnitChange(unit);
  };

  return (
    <div className="flex gap-2">
      {/* Celsius Button */}
      <button
        className={`w-10 h-10 flex items-center justify-center rounded-full font-bold ${
          selectedUnit === 'C' ? 'bg-white text-black' : 'bg-gray-700 text-white'
        }`}
        onClick={() => handleUnitChange('C')}
      >
        °C
      </button>

      {/* Fahrenheit Button */}
      <button
        className={`w-10 h-10 flex items-center justify-center rounded-full font-bold ${
          selectedUnit === 'F' ? 'bg-white text-black' : 'bg-gray-700 text-white'
        }`}
        onClick={() => handleUnitChange('F')}
      >
        °F
      </button>
    </div>
  );
}

export default TemperatureSwitcher;
