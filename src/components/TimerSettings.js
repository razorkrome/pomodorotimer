import React, { useState } from 'react'
import { View, Text, StyleSheet } from 'react-native'
import NumericInput from 'react-native-numeric-input'
import { CustomButton } from '../UI/CustomButton'

export const TimerSettings = ({navigation, route}) => {
    const ONE_MINUTE_IN_SECS = 60
    const [workMinutes, setWorkMinutes] = useState(50)
    const [restMinutes, setRestMinutes] = useState(10)
    return (
        <View style={styles.container}>
            <View>
                <Text style={styles.text}>Минут работы</Text>
                <NumericInput
                    minValue={5}
                    step={5}
                    initValue={workMinutes}
                    maxValue={120}
                    onChange={setWorkMinutes}
                    valueType="integer"
                />
            </View>
            <View>
                <Text style={styles.text}>Минут отдыха</Text>
                <NumericInput
                    minValue={5}
                    step={5}
                    initValue={restMinutes}
                    maxValue={60}
                    onChange={setRestMinutes}
                    valueType="integer"
                />
            </View>
            <CustomButton
                title="Применить настройки"  
                onPress={() => navigation.navigate({
                    name: "Home",
                    params: {workTime: workMinutes * ONE_MINUTE_IN_SECS, restTime: restMinutes * ONE_MINUTE_IN_SECS}
                })} 
            />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center'
    },
    button : {
        width: '100%',
        height: 40,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'blue'
    },
    text: {
        color: 'teal',
        fontWeight: 'bold',
        fontSize: 18
    }
})
