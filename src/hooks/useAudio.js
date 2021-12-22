import { useEffect, useState } from 'react'
import { Audio } from 'expo-av'

export const useAudio = (songURL) => {
    const [sound, setSound] = useState()
    const [isPlaying, setIsPlaying] = useState(false)

    const loadSound = async () => {
        const { sound } = await Audio.Sound.createAsync(
            songURL
        )
        await sound.setIsLoopingAsync(true)
        setSound(sound); 
    }
    
    useEffect(() => {
        if(sound === undefined) {
            console.log('Loading Sound');
            loadSound()
        }
    },[sound])

    const playPauseSound = () => {
        if(!isPlaying) {
            setIsPlaying(true)
            console.log('Playing Sound');
            sound.playAsync();
        } else {
            setIsPlaying(false)
            console.log('Pause Sound'); 
            sound.unloadAsync()
            setSound()      
        }
    }

    return [isPlaying, setIsPlaying, playPauseSound]
}