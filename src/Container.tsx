import {useTimerScale, useTextSlideScale} from './hooks'

const withProgressContainer = (ProgressComponent : React.FC) => {
    return () => {
        const {timerScale, } = useTimerScale() 
        return (
            <ProgressComponent>
            </ProgressComponent>
            )
    }
}