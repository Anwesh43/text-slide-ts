import React from 'react'
import {useTimerScale, useTextSlideScale, useStyle, useDimension} from './hooks'

const MainComponent : React.FC<any> = (props : any) => {
    const {timerScale, start, reset} = useTimerScale()
    const {w, h} = useDimension()
    const {textSlideScale, i} = useTextSlideScale(start, reset, props.words.length)
    const {progressStyle, textSlideParentStyle, textSlideStyle} = useStyle(w, h, timerScale, textSlideScale, i)
    
    return (
        <>
            <div style = {progressStyle()}>
            </div>
            <div style = {textSlideParentStyle()}>
                {props.words.map((word : string, i : number) => (<div style = {textSlideStyle(i)}>{word}</div>))}
            </div>
        </>   
    )
}
export default MainComponent