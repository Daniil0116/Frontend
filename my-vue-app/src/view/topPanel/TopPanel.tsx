import styles from './TopPanel.module.css'
import { Button } from "../../components/Button"
import {removeSlide} from "../../store/removeSlide"
import {addSlide} from "../../store/addSlide"
import {dispatch} from '../../store/editor';
import addTextIcon from '../../icons/addTextIcon.svg'
import addImg from '../../icons/addImg.svg'
import changeColorIcon from '../../icons/changeColorIcon.svg'
import changeImgIcon from '../../icons/changeImgIcon.svg'
import removeObj from '../../icons/removeObj.svg'
import { addTextToSlide } from '../../store/addTextToSlide';
import {addImageToSlide} from '../../store/addImageToSlide'
import {removeObjectOnSlide} from '../../store/removeObjectOnSlide'
import { changeColorBack } from '../../store/changeColorBack';
import { changeImgBack } from '../../store/changeImgBack';
import { ColorPicker } from '../../components/colorPicker';
import { useState } from 'react';
import { ImageInput } from '../../components/ImageInput';

type TopPanelProps = {
    title: string;
}

function TopPanel({title}: TopPanelProps) {
    const [selectedColor, setSelectedColor] = useState("#000000");
    const [selectedImage, setSelectedImage] = useState("");
    
    function onAddSlide() : void {
        dispatch(addSlide)
    }

    function onRemoveSlide() : void {
        dispatch(removeSlide)
    }

    function addText() : void {
        dispatch(addTextToSlide)
    }

    function addImage() : void {
        dispatch(addImageToSlide)
    }

    function removeObject() : void {
        dispatch(removeObjectOnSlide)
    }

    function changeColor(): void {
        dispatch(changeColorBack)
    }

    function changeImg(): void {
        if (selectedImage) {  
            dispatch(changeImgBack); 
            setSelectedImage(""); 
        } else {
            alert("Пожалуйста, выберите изображение перед изменением фона."); 
        }
    }

    return (
        <div className={styles.topPanel}>
            <input className={styles.topPanel_input} type="text" defaultValue={title}/>
            <div className={styles.topPanel_buttons}>
                <Button className={styles.button} text={'Добавить слайд'} onClick={onAddSlide} image={""}></Button>
                <Button className={styles.button} text={'Удалить слайд'} onClick={onRemoveSlide} image={""}></Button>
                <Button className={styles.button} text={''} onClick={addText} image={addTextIcon}></Button>
                <Button className={styles.button} text={''} onClick={addImage} image={addImg}></Button>
                <Button className={styles.button} text={''} onClick={removeObject} image={removeObj}></Button>
                <ColorPicker selectedColor={selectedColor} onChange={setSelectedColor} />
                <Button className={styles.button} text={''} onClick={changeColor} image={changeColorIcon}></Button>
                <ImageInput selectedImage={selectedImage} onChange={setSelectedImage} />
                <Button className={styles.button} text={''} onClick={changeImg} image={changeImgIcon}></Button>
            </div>
        </div>
    )
}

export {
    TopPanel,
}