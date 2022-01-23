import styles from './styles';
import React, { useEffect, useState } from 'react';
import { Avatar, Card, Title, Paragraph } from 'react-native-paper';
import { Shift} from '../constants/collectionTypes';
import { getUserDocument } from '../utils/db'

type ShiftCardProps = {
    shift: Shift
}

const ShiftCard = ({shift}: ShiftCardProps) => {

    const penn_logo = props => <Avatar.Icon {...props} style={styles.avatarContainer} icon={require('../../assets/penn_logo.png')} />
    const [nextShiftInfo, setShiftInfos] = useState<Array<Object> | null>(null);
    const shiftMembersInfo: Array<Object> = [];

    useEffect(() => {
        async function getMembers() {
            for (let i=0; i<shift.members.length; i++) {
                const member = await getUserDocument(shift.members[i].id);
                shiftMembersInfo.push(<Paragraph key={shift.members[i].id} style={styles.blackText}>{member.fullName} : {shift.members[i].role}</Paragraph>)
            };
            setShiftInfos(shiftMembersInfo);
        };
        getMembers();
    }, [])

    return (
        <Card style={styles.card}>
            <Card.Title title="Shift" left = {penn_logo} titleStyle={styles.blackText}/>
            <Card.Content>
            <Title style={styles.blackText}></Title>
                {shift ?
                    <>
                        <Paragraph style={styles.blackText}>Start Time: {shift?.start.toLocaleString()}</Paragraph>
                        <Paragraph style={styles.blackText}>End Time: {shift?.end.toLocaleString()}</Paragraph>
                        <br/>
                        {nextShiftInfo === null || nextShiftInfo.length == 0 
                            ? <div>loading</div> 
                            : nextShiftInfo}
                    </> 
                    : <Paragraph style={styles.blackText}> No Shift Data</Paragraph>
                }
            </Card.Content>
        </Card>
    );   
}

export default ShiftCard;