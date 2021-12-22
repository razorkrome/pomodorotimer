import React from 'react'
import { Text, TouchableOpacity, StyleSheet } from "react-native"

export const CustomButton = ({title, onPress}) => {
    return (
        <TouchableOpacity
            style={styles.button}
            onPress={onPress}
            activeOpacity={0.8}
        >
            <Text style={styles.text}>{title}</Text>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    button: {
        marginTop: 10,
        backgroundColor: 'teal',
        padding: 10,
    },
    text: {
        color: 'white',
    }
})