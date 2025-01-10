import React from 'react';
import styles from './ImageInput.module.css';
import { setCurrentImageSrc } from '../store/changeImgBack';
import { setCurrentImageSlideSrc } from '../store/addImageToSlide';

type ImageInputProps = {
    selectedImage: string;
    onChange: (imageSrc: string) => void;
};

function ImageInput({ selectedImage, onChange }: ImageInputProps) {
    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                const base64data = reader.result;
                setCurrentImageSlideSrc(base64data as string);
            };
            reader.readAsDataURL(file);
            const newImageSrc = URL.createObjectURL(file);
            onChange(newImageSrc);
            setCurrentImageSrc(newImageSrc);
        }
    };

    return (
        <div className={styles.imagePickerContainer}>

            <input
                className={styles.imagePicker__input}
                type="file"
                id="ImageInput"
                accept="image/*"
                onChange={handleFileChange}
                style={{ display: 'none' }}
                value={selectedImage ? undefined : ''}
            />
            <label htmlFor="ImageInput" className={styles.customButton}>
                {selectedImage ?
                    <span>Изображение выбрано</span> :
                    <span>Выберите изображение</span>
                }
            </label>
        </div>
    );
};

export { ImageInput };
