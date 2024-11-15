import styles from './ColorPicker.module.css'; 

type ColorPickerProps = {
    selectedColor: string; 
    onChange: (color: string) => void; 
};

function ColorPicker ({ selectedColor, onChange }: ColorPickerProps) {
    return (
        <div className={styles.colorPickerContainer}>
            <label htmlFor="colorPicker">Выберите цвет фона:</label>
            <input
                className={styles.colorPicker__input}
                type="color"
                id="colorPicker"
                value={selectedColor} 
                onChange={(e) => onChange(e.target.value)} 
            />
        </div>
    );
};

export { ColorPicker, };
