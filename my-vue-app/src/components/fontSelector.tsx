import React from 'react';

type FontSelectorProps = {
    selectedFont: string;
    onFontChange: (newFont: string) => void;
};

const fonts = ['Arial', 'Verdana', 'Times New Roman', 'Courier New', 'Georgia'];

const FontSelector: React.FC<FontSelectorProps> = ({ selectedFont, onFontChange }) => {
    return (
        <select value={selectedFont} onChange={(e) => onFontChange(e.target.value)}>
            {fonts.map(font => (
                <option key={font} value={font}>{font}</option>
            ))}
        </select>
    );
};

export default FontSelector;
