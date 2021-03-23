import React, { useEffect, useState } from 'react';
import * as db from '../utils/db';
import { Form } from '../constants/collectionTypes';
import FormLink from './FormLink';


const Forms = () => {
    const [forms, setForms] = useState<Form[] | null>([]);

    useEffect(() => {
        async function getInfo() {
            try {
                const forms = await db.getForms();
                setForms(forms)

            } catch (err) {
                console.log(err);
            }
        }
        getInfo();
      }, []);

    const listItems = forms.map((curr) =>
        <FormLink 
            title={curr.title}
            link={curr.url}
        />   
    );

    return (
        listItems
    );   
}

export default Forms;