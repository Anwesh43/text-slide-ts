import {useState, useEffect} from 'react'

const scGap : number = 0.02 
const delay : number = 20
const useAnimatedScale = () => {
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
        scale, 
        start,
        toggleStart() {
            setStart(false)
        }
    }
}