import React, { useEffect, useState } from 'react';
import * as db from '../utils/db';
import { Form } from '../constants/collectionTypes';
import FormLink from './FormLink';
import {Card, Avatar} from 'react-native-paper';
import styles from './styles';


const Forms = (rank : any | undefined) => {
    const [forms, setForms] = useState<Form[] | null>([]);
    const form = props => <Avatar.Icon style={styles.avatarContainer} {...props} icon={require('../../assets/forms.png')} />
    useEffect(() => {
        async function getInfo() {
            try {
                if (typeof rank != undefined && rank != null){
                    const forms = await db.getForms(rank.rank);
                    setForms(forms)
                }
                else {
                    const forms = await db.getForms("");
                    setForms(forms)
                }

            } catch (err) {
                console.log(err);
            }
        }
        getInfo();
      }, []);

    const listItems = forms.map((curr) =>
        <FormLink key={curr.url}
            title={curr.title}
            link={curr.url}
        />   
    );

    return (
        <Card style={styles.card}>
            <Card.Title title="Forms" left = {form} titleStyle={styles.blackText}/>
            <Card.Content>
                {listItems}
            </Card.Content>
            <Card.Actions>
            </Card.Actions>
        </Card>
    );   
}

export default Forms;