import React, { useContext, useState, useEffect } from 'react';
import { Button } from 'react-native-paper';
import { View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { AuthContext } from '../providers/AuthProvider';
import * as db from '../utils/db';
import Appbar from './Appbar';
import AudioRecording from './AudioRecording';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { block } from 'react-native-reanimated';
import styles from './styles';
const seqColors = ['#FF0000', '#00FF00', '#0000FF'];
const seqIcons = ['numeric-1-circle', 'numeric-2-circle', 'numeric-3-circle'];
const seqTexts = ['On Scene', 'Transferred Care', 'Free and Available'];

const numSequences = 3;

const CallMode = (props: any) => {
    const { user } = useContext(AuthContext);
    const [callSeq, setCallSeq] = useState<number>(0);
    const [callId, setCallId] = useState<string>('');
    const [goBackText, setBackText] = useState<string>('Cancel');

    useEffect(() => {
        beginCall();
    }, []);

    async function beginCall() {
        if (user === null) return;
        const id = await db.createNewCall(user.id);
        setCallId(id);
    }

    async function handleSequence() {
        await db.updateCall(callId, callSeq);
        if (callSeq == 0) setBackText("Go Back");
        if (callSeq < numSequences - 1) {
            setCallSeq(callSeq + 1);
        } else {
            props.setCallMode(false)
        }
    }

    function returnStep() {
        if (callSeq == 0) {
            props.setCallMode(false);
            db.deleteCall(callId);
        } else {
            if (callSeq == 1) setBackText("Cancel");
            setCallSeq(callSeq - 1);
        }
    }

    return (
        <SafeAreaView style={{flex: 1, backgroundColor: seqColors[callSeq]}}>
            <Appbar/>
            <View>

                <AudioRecording/>
            </View>

                <Button contentStyle={{height:400}} icon={seqIcons[callSeq]} mode="contained" onPress={() => handleSequence()} style={{
                    flex: 1, 
                    justifyContent: 'center', 
                    backgroundColor: seqColors[callSeq],
                }}>
                    {seqTexts[callSeq]}
                </Button>
            
                <Button  style={[styles.goBackButton, {maxWidth:400}]} mode="contained" onPress={() => returnStep()}>
                    {goBackText}
                </Button>
        </SafeAreaView>
    );   
}

export default CallMode;

