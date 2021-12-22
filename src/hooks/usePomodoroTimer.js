import { useEffect, useState} from 'react'

export const usePomodoroTimer = (finishWorkCallback, initialCountdownWorkTime, finishRestCallback, initialCountdownRestTime, route = null) => {
    const ONE_SECOND_IN_MS = 1000
    const [workTime, setWorkTime] = useState(initialCountdownWorkTime)
    const [restTime, setRestTime] = useState(initialCountdownRestTime)
    const [timer, setTimer] = useState(workTime)
    const [isTimerActive, setIsTimerActive] = useState(false)
    const [isWorkTime, setIsWorkTime] = useState(true)
    const [isTimerFinished, setIsTimerFinished] = useState(false)

    const tick = () => {
        if(timer > 0)
            setTimer(timer - 1000 / ONE_SECOND_IN_MS)
    }

    const minTwoDigits = (string) => {
        return ("0" + string).slice(-2)
    }

    if(route) {
        useEffect(() => {
            if(route.params?.workTime) setWorkTime(route.params.workTime)
            if(route.params?.restTime) setRestTime(route.params.restTime) 
            console.log("WorkTime =", workTime, "RestTime =", restTime)
        },[route.params?.workTime, route.params?.restTIme])

        useEffect(() => {
            setIsTimerActive(false)
            if(isWorkTime) {
                setTimer(workTime)
            } else {
                setTimer(restTime)
            }
        },[workTime, restTime, isWorkTime])
    }
    const timeToTimerFormat = () => {
        let hours = Math.floor(timer / 3600) ? minTwoDigits(Math.floor(timer / 3600)) + " : " : ""
        return hours + `${minTwoDigits(Math.floor(timer / 60 % 60))} : ${minTwoDigits(timer % 60)}`
    }


    useEffect(() => {
        let timerId
        if(isTimerActive) timerId = setTimeout(tick,1000) 
        if(timer === 0 && !isTimerFinished) {
            if(isWorkTime) { 
                finishWorkCallback()
                setTimer(workTime) 
            } else {
                finishRestCallback()
                setTimer(restTime) 
            }
            setIsTimerActive(false)
            setIsTimerFinished(true)
            setIsWorkTime(!isWorkTime)
        }
        return () => {
            clearTimeout(timerId)
        }
    }, [timer, isTimerActive, isTimerFinished])

    return [timeToTimerFormat, 
            isTimerActive, 
            setIsTimerActive, 
            isTimerFinished, 
            setIsTimerFinished, 
            isWorkTime, 
            setIsWorkTime
    ]
}


