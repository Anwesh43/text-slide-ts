import {useState, useEffect, CSSProperties} from 'react'

const colors : Array<string> = [
    "#f44336",
    "#9C27B0",
    "#6200EA",
    "#00C853",
    "#795548"
]
const scGap : number = 0.02 
const delay : number = 20
export const useTimerScale = () => {
    const [scale, setScale] : [number, Function] = useState(0)
    const [animated, setAnimated] : [boolean, Function] = useState(false)
    const [start, setStart] : [boolean, Function] = useState(false)
    useEffect(() => {
        if (!animated && !start) {
            setAnimated(true)
            const interval = setInterval(() => {
                setScale((prev : number) => {
                    if (prev > 1) {
                        setAnimated(false)
                        setStart(true)
                        clearInterval(interval) 
                        return 0
                    }
                    return prev + 0.02 
                })
            }, 20)
        }
    }, [start, animated])
    return {
        timerScale : scale, 
        start,
        reset() {
            setStart(false)
        }
    }
}

export const useTextSlideScale = (started : boolean, reset : Function, n : number) => {
    const [scale, setScale] = useState(0)
    const [animated, setAnimated] = useState(false)
    const [i, setI] = useState(0)
    const [dir, setDir] = useState(1)
    useEffect(() => {
        if (started && !animated) {
            setAnimated(true)
            const interval = setInterval(() => {
                setScale((prev : number) => {
                    if ((scale > 1 && dir == 1) || (scale < 0 && dir == -1)) {
                        setI((prevI : number) => {
                            if (prevI + dir == n - 1) {
                                setDir(-1)  
                            } 
                            if (prevI + dir == 0) {
                                setDir(1)
                            }
                            return prevI + dir 
                        })
                        clearInterval(interval)
                        return (i == n - 2 && dir == 1) || (i == 1 && dir == -1) ?  (1 + dir) / 2 : (1 - dir) / 2  
                    }
                    return prev + scGap * dir  
                })
            }, delay)
        }
    }, [started, animated])
    return {
        textSlideScale : scale, 
    }
}

export const useStyle = (w : number, h : number, s1 : number, s2 : number, i : number) => {
    const lineWidth = `${w * s1}px`
    const parentX = `${-(i + 1) * s2}px`
    const position = 'absolute'
    return {
        progressStyle() : CSSProperties {
            return {
                width : lineWidth, 
                height : `${h / 40}px`,
                position,
            }
        },
        textSlideParentStyle(): CSSProperties {
            return {
                position,
                left: parentX
            }
        },
        textSlideStyle(i : number): CSSProperties {
            return {
                width: lineWidth, 
                height : `${h}px`,
                background: colors[i % colors.length],
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                position,
                left: `${i * w}px`
            }
        }
    }
}