import * as React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { AntDesign } from '@expo/vector-icons';
import FormsScreen from '../screens/FormsScreen/FormsScreen';
import ProfileScreen from '../screens/ProfileScreen/ProfileScreen';
import HomeScreen from '../screens/HomeScreen/HomeScreen';
import ScheduleScreen from '../screens/ScheduleScreen/ScheduleScreen';
import { BottomTabParamList } from '../../types';

import { User } from '../../types'


const BottomTab = createBottomTabNavigator<BottomTabParamList>();

export default function BottomTabNavigator(props: any) {
    console.log('BottomTabNavigator')
    console.log(props)

    const propsvalues: User = props.extraData

    return (
        <BottomTab.Navigator initialRouteName="Home">
            <BottomTab.Screen 
                name="Profile" 
                options={{ 
                    tabBarIcon: () => <AntDesign name="user" size={24} color="black" />
                }}>
                {props => <ProfileScreen {...props} extraData={propsvalues} />}
            </BottomTab.Screen>
            <BottomTab.Screen name="Forms" component={FormsScreen} options={{ 
                    tabBarIcon: () => <AntDesign name="form" size={24} color="black" />
                }}/>
            <BottomTab.Screen name="Home" options={{ 
                    tabBarIcon: () => <AntDesign name="home" size={24} color="black" />
                }}>
                {props => <HomeScreen {...props} extraData={propsvalues} />}
            </BottomTab.Screen>
            <BottomTab.Screen name="Schedule" component={ScheduleScreen} options={{ 
                    tabBarIcon: () => <AntDesign name="calendar" size={24} color="black" />
                }}/>
        </BottomTab.Navigator>
    );
}