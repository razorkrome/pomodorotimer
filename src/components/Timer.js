import React, { useEffect, useState } from 'react'
import { View, Text, Vibration, StyleSheet } from 'react-native'
import { useAudio } from '../hooks/useAudio'
import { usePomodoroTimer } from '../hooks/usePomodoroTimer'
import { CustomButton } from '../UI/CustomButton'

const ONE_MIN_IN_SECONDS = 60

export const Timer = ({navigation, route}) => {
    const ONE_SECOND_IN_MS = 1000 
    const PATTERN = [
        1 * ONE_SECOND_IN_MS,
        2 * ONE_SECOND_IN_MS,
        3 * ONE_SECOND_IN_MS
    ]
    const [isPlaying, setIsPlaying, playPauseSound] = useAudio(require('../../assets/audio/timeout.mp3'))

    const finishWorkTimer = () => {
        playPauseSound()
        Vibration.vibrate(PATTERN,true)
    }

    const finishRestTimer = () => {
        playPauseSound()
        Vibration.vibrate(PATTERN,true)
    }

    const [ timeToTimerFormat,
            isTimerActive, 
            setIsTimerActive, 
            isTimerFinished, 
            setIsTimerFinished, 
            isWorkTime,
            setIsWorkTime] = usePomodoroTimer( finishWorkTimer,
                                            50 * ONE_MIN_IN_SECONDS,
                                            finishRestTimer,
                                            10 * ONE_MIN_IN_SECONDS,
                                            route
                            )

    const [timerButtonTitle, setTimerButtonTitle] = useState("Запустить")
    const [changeButtonTitle, setchangeButtonTitle] = useState("Перейти к отдыху")

    const cancelTimer = () => {
        Vibration.cancel();
        if(isPlaying) {
            playPauseSound()
        }
        setIsTimerFinished(false)
    }

    useEffect(() => {
        if(isTimerFinished) {
            setTimerButtonTitle("Отмена вибрации и музыки")
        }
        else {
            if(isTimerActive) {
               setTimerButtonTitle("Остановить")
            } else {
                setTimerButtonTitle("Запустить")
            }
        }
    },[isTimerActive])

    useEffect(() => {
        isWorkTime ? setchangeButtonTitle("Перейти к отдыху") : setchangeButtonTitle("Перейти к работе")
    },[isWorkTime])

    const callBackTimerButton = () => {
        if(isTimerFinished) {
            cancelTimer()
        }
        setIsTimerActive(!isTimerActive)
    }

    const callBackChangeButton = () => {
        setIsWorkTime(!isWorkTime)
    }

    return (
        <View style={styles.container}>
            
            <View style={styles.timer}>
                <Text style={styles.text}>{isWorkTime ? "Время работать" : "Время отдыхать"}</Text>
                <Text style={styles.time}>{timeToTimerFormat()}</Text>
            </View>
            <View style={styles.settings}>
                <CustomButton title={timerButtonTitle} onPress={callBackTimerButton}/>
                <CustomButton title={changeButtonTitle} onPress={callBackChangeButton}/>
                <CustomButton title="Завершить сессию" onPress={() => setIsWorkTime(true)}/>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        alignItems: 'center',
        flex: 1
    },
    timer: {
        flexDirection: 'row',
    },
    textInput: {
        borderBottomColor: 'teal',
        borderStyle: 'solid',
        borderBottomWidth: 2
    },
    settings: {
        flexDirection: 'row',
        width: '100%',
        justifyContent: 'center',
    },
    text: {
        textAlign: 'center',
        flexGrow: 1,
        color: 'teal',
        fontWeight: 'bold',
        fontSize: 18
    },
    time: {
        fontSize: 20,
        fontWeight: 'bold',
        textAlign:'center',
        color: 'black',
        flexGrow: 1
    },
})
