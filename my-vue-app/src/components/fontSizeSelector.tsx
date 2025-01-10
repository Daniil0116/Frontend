import React from 'react';

type FontSizeSelectorProps = {
    selectedSize: number;
    onSizeChange: (newSize: number) => void;
};

const FontSizeSelector: React.FC<FontSizeSelectorProps> = ({ selectedSize, onSizeChange }) => {
    const sizes = [12, 14, 16, 18, 20, 24, 30, 36, 48, 60, 72];

    return (
        <select value={selectedSize} onChange={(e) => onSizeChange(Number(e.target.value))}>
            {sizes.map(size => (
                <option key={size} value={size}>{size}</option>
            ))}
        </select>
    );
};

export default FontSizeSelector;
