import React, { useState } from 'react';
import { View, Button } from 'react-native';
import { Audio } from 'expo-av';
import * as FileSystem from 'expo-file-system';

export default function AudioRecording(props: any) {
    const [recording, setRecording] = useState();
    const [sound, setSound] = useState();
    const [playing, setPlaying] = useState();
    const [audioUri, setAudioUri] = useState();
  

    async function startRecording() {
        try {
            console.log('Requesting permissions..');
            // await Audio.requestPermissionsAsync();
            await Audio.setAudioModeAsync({
                allowsRecordingIOS: true,
                playsInSilentModeIOS: true,
            }); 
            console.log('Starting recording..');
            const recording = new Audio.Recording();
            await recording.prepareToRecordAsync(Audio.RECORDING_OPTIONS_PRESET_HIGH_QUALITY);
            await recording.startAsync(); 
            setRecording(recording);
            console.log('Recording started');
        } catch (err) {
            console.error('Failed to start recording', err);
        }
    }

    async function stopRecording() {
        console.log('Stopping recording..');
        setRecording(undefined);
        await recording.stopAndUnloadAsync();
        // const uri = recording.getURI(); 
        // console.log('Recording stopped and stored at', uri);

        const { sound, status } = await recording.createNewLoadedSoundAsync({
            isLooping: true, 
            volume: 1.0,
            rate: 1.0, 
            shouldCorrectPitch: false
        })
        setSound(sound)
        // const info = await FileSystem.getInfoAsync(uri || "");
        // console.log(`FILE INFO: ${JSON.stringify(info)}`);
    }


    async function playSound() {
        setPlaying(true)
        await sound.playAsync(); 
    }

    async function stopSound() {
        setPlaying(false)
        await sound.stopAsync(); 
    }
  
    return (
        <View>
            <Button
                title={recording ? 'Stop Recording' : 'Start Recording'}
                onPress={recording ? stopRecording : startRecording}
            />
            <Button 
                title={playing ? 'Stop Sound' : 'Play Sound'}
                onPress={playing ? stopSound : playSound}
            />
        </View>
    );
}
