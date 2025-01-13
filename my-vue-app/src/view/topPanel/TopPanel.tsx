import styles from './TopPanel.module.css'
import { Button } from "../../components/Button"
import addTextIcon from '../../icons/addTextIcon.svg'
import addImg from '../../icons/addImg.svg'
import changeColorIcon from '../../icons/changeColorIcon.svg'
import changeImgIcon from '../../icons/changeImgIcon.svg'
import removeObj from '../../icons/removeObj.svg'
import exportPres from '../../icons/exportPres.svg'
import importPres from '../../icons/importPres.svg'
import { ColorPicker } from '../../components/colorPicker';
import { useCallback, useState } from 'react';
import { ImageInput } from '../../components/ImageInput';
import { importPresentation } from '../../store/fileUtils';
import { getEditor } from '../../store/editor';
import { useAppSelector } from '../../hooks/useAppSelector';
import { useAppActions } from '../../hooks/useAppActions';
import { useDispatch } from 'react-redux'
import { importPresentationAction } from '../../store/redux/slideActionCreators'
import { EditorType } from '../../store/EditorType'

function TopPanel() {

    const title = useAppSelector((editor => editor.presentation.title))

    const {addSlide, removeSlide, setEditor, addTextToSlide, addImageToSlide, changeColorBack, changeImgBack, 
        removeObjectOnSlide, renamePresentationTitle, exportPresentation,
    } = useAppActions()


    const [selectedColor, setSelectedColor] = useState("#000000");
    const [selectedImage, setSelectedImage] = useState("");
    

    const onTitleChange: React.ChangeEventHandler = (event) => {
        renamePresentationTitle((event.target as HTMLInputElement).value)
    }

    const onExportPresentation = useCallback(() => {
        const editor = getEditor();
        exportPresentation(editor);
    }, [exportPresentation]);

    const dispatch = useDispatch();

    const onImportPresentation = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];

        if (file) {
            importPresentation(file)
                .then((parsedContent: EditorType) => {
                    dispatch(importPresentationAction(parsedContent)); 
                })
                .catch((err) => {
                    console.error('Error importing presentation:', err);
                    alert('Пожалуйста, проверьте формат файла');
                });
        }
    }, [dispatch]);
    

    return (
        <div className={styles.topPanel}>
            <input className={styles.topPanel_input} type="text" value={title} onChange={onTitleChange} />
            <div className={styles.topPanel_buttons}>
                <Button className={styles.button} text={'Добавить слайд'} onClick={addSlide} image={""}></Button>
                <Button className={styles.button} text={'Удалить слайд'} onClick={removeSlide} image={""}></Button>
                <Button className={styles.button} text={''} onClick={onExportPresentation} image={exportPres}></Button> 
                <Button className={styles.button} text={''} onClick={() => document.getElementById('importFile')?.click()} image={importPres}></Button>
                <input
                    type="file"
                    id="importFile"
                    accept='.json'
                    onChange={onImportPresentation}
                    className={styles.fileInput}
                    style={{ display: 'none' }} />
                <Button className={styles.button} text={''} onClick={addTextToSlide} image={addTextIcon}></Button>
                <Button className={styles.button} text={''} onClick={removeObjectOnSlide} image={removeObj}></Button>
                <ColorPicker selectedColor={selectedColor} onChange={setSelectedColor} />
                <Button className={styles.button} text={''} onClick={changeColorBack} image={changeColorIcon}></Button>
                <ImageInput selectedImage={selectedImage} onChange={setSelectedImage} />
                {selectedImage && ( <div>
                <Button className={styles.button} text={''} onClick={addImageToSlide} image={addImg}></Button>
                <Button className={styles.button} text={''} onClick={changeImgBack} image={changeImgIcon}></Button>
                </div>
                )}
                
            </div>
        </div>
    )
}

export {
    TopPanel,
}