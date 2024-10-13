import './TopPanel.module.css'
import { Button } from "../components/Button"
type TopPanelProps = {
    title: string;
}

function TopPanel({title}: TopPanelProps) {
    function onAddSlide() : void {

    }

    function onRemoveSlide() : void {

    }

    return (
        <div className="TopPanel">
            <input className="TopPanel_input" type="text" defaultValue={title}/>
            <div>
                <Button className="button" text={'Добавить слайд'} onClick={onAddSlide}></Button>
                <Button className="button" text={'Удалить слайд'} onClick={onRemoveSlide}></Button>
            </div>
        </div>
    )
}

export {
    TopPanel,
}