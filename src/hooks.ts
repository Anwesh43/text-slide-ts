import {useState, useEffect, CSSProperties} from 'react'

const colors : Array<string> = [
    "#f44336",
    "#9C27B0",
    "#6200EA",
    "#00C853",
    "#795548"
]
const scGap : number = 0.01
const delay : number = 20
export const useTimerScale = () => {
    const [scale, setScale] : [number, Function] = useState(0)
    const [animated, setAnimated] : [boolean, Function] = useState(false)
    const [start, setStart] : [boolean, Function] = useState(false)
    const startAnim = () => {
        setAnimated(true)
            const interval = setInterval(() => {
                setScale((prev : number) => {
                    if (prev > 1) {
                        setAnimated(false)
                        setStart(true)
                        clearInterval(interval) 
                        return 0
                    }
                    return prev + scGap 
                })
            }, 20)
    }
    useEffect(() => {
        if (!animated && !start) {
            startAnim()
        }
    }, [start, animated])
    return {
        timerScale : scale, 
        start,
        reset() {
            //console.log("coming here+++")
            setStart(false)
            //startAnim()
        }
    }
}

export const useTextSlideScale = (started : boolean, reset : Function, n : number) => {
    const [scale, setScale] = useState(0)
    const [animated, setAnimated] = useState(false)
    const [i, setI] = useState(0)
    const [dir, setDir] = useState(1)
    console.log("DIR_UPDATE", i)
    useEffect(() => {
        if (started && !animated) {
            console.log("I", i, "DIR", dir, "SCALE", scale)
            setAnimated(true)
            const interval = setInterval(() => {
                setScale((prev : number) => {
                    if ((prev > 1 && dir == 1) || (prev < 0 && dir == -1)) {
                        console.log("coming here")
                        if (i + dir == n - 1) {
                            setDir(-1)
                        }
                        if (i + dir == 0) {
                            setDir(1)
                        }
                        setI(i + dir)
                        reset()
                        setAnimated(false)
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
        i
    }
}

export const useStyle = (w : number, h : number, s1 : number, s2 : number, i : number) => {
    const lineWidth = `${w * s1}px`
    const a : number = -i *  w  - w * s2
    const parentX = `${a}px`
    const position = 'absolute'
    return {
        progressStyle() : CSSProperties {
            return {
                width : lineWidth, 
                height : `${20}px`,
                position,
                left: '0px',
                top: '0px',
                background: 'green',
                zIndex: 100
            }
        },
        textSlideParentStyle(): CSSProperties {
            return {
                position,
                left: parentX,
                width: `${w - a}px`, 
                height: `${h}px`,
                overflow: 'hidden'
            }
        },
        textSlideStyle(i : number): CSSProperties {
            return {
                width: `${w}px`, 
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

export const useDimension = () => {
    const [w, setW] = useState(window.innerWidth)
    const [h, setH] = useState(window.innerHeight)
    useEffect(() => {
        window.onresize = () => {
            setW(window.innerWidth)
            setH(window.innerHeight)
        }
        return () => {
            window.onresize = () => {

            }
        }
    })
    return {
        w, 
        h
    }
}