import React, { useContext, useState, useEffect } from 'react';
import { Button } from 'react-native-paper';
import { Text, View, FlatList } from 'react-native';
import { AuthContext } from '../providers/AuthProvider';
import * as db from '../utils/db';

type CallSequence = 's1' | 's2' | 's3' | 's4'
let seqColor = {
    's1': '#FF0000',
    's2': '#00FF00',
    's3': '#0000FF',
    's4': '#00FFFF',
}

let seqIcon = {
    's1': 'numeric-1-circle',
    's2': 'numeric-2-circle',
    's3': 'numeric-3-circle',
    's4': 'numeric-4-circle',
}

let seqText = {
    's1': 'Arrived to Patient',
    's2': 'Treated Patient',
    's3': 'Trasported Patient',
    's4': 'Call Complete',
}

const LogoutBtn = (props: any) => {
    const { user } = useContext(AuthContext);
    const [callSeq, setCallSeq] = useState<CallSequence>('s1');
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

        if (callSeq === 's1') {
            setCallSeq('s2')
        } else if (callSeq === 's2') {
            setCallSeq('s3')
        } else if (callSeq === 's3') {
            setCallSeq('s4')
        } else {
            props.setCallMode(false)
        }
    }

    return (
        <View style={{flex: 1, backgroundColor: seqColor[callSeq]}}>

            <Button icon={seqIcon[callSeq]} mode="contained" onPress={() => handleSequence()} style={{
                flex: 1, 
                alignItems: 'center',
                justifyContent: 'center', 
                backgroundColor: seqColor[callSeq]
            }}>
                {seqText[callSeq]}
            </Button>
        </View>
    );   
}

export default LogoutBtn;

