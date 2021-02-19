import React, { useContext, useState, useEffect } from 'react';
import { Button } from 'react-native-paper';
import { View } from 'react-native';
import { AuthContext } from '../providers/AuthProvider';
import * as db from '../utils/db';

const seqColors = ['#FF0000', '#00FF00', '#0000FF', '#00FFFF'];
const seqIcons = ['numeric-1-circle', 'numeric-2-circle', 'numeric-3-circle', 'numeric-4-circle'];
const seqTexts = ['Arrived to Patient', 'Treated Patient', 'Trasported Patient', 'Call Complete'];

const numSequences = 4;

const LogoutBtn = (props: any) => {
    const { user } = useContext(AuthContext);
    const [callSeq, setCallSeq] = useState<number>(0);
    const [callId, setCallId] = useState<string>('');

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
        setCallSeq(callSeq + 1);
        if (callSeq == numSequences) {
            props.setCallMode(false)
        }
    }

    return (
        <View style={{flex: 1, backgroundColor: seqColors[callSeq]}}>

            <Button icon={seqIcons[callSeq]} mode="contained" onPress={() => handleSequence()} style={{
                flex: 1, 
                alignItems: 'center',
                justifyContent: 'center', 
                backgroundColor: seqColors[callSeq]
            }}>
                {seqTexts[callSeq]}
            </Button>
        </View>
    );   
}

export default LogoutBtn;

