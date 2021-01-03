import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { AntDesign } from '@expo/vector-icons';
import FormsScreen from '../screens/FormsScreen/FormsScreen';
import ProfileScreen from '../screens/ProfileScreen/ProfileScreen';
import HomeScreen from '../screens/HomeScreen/HomeScreen';
import ScheduleScreen from '../screens/ScheduleScreen/ScheduleScreen';
import { BottomTabParamList } from '../constants/navigationScreenTypes';

const BottomTab = createBottomTabNavigator<BottomTabParamList>();

export default function BottomTabNavigator(props: any) {
    return (
        <BottomTab.Navigator initialRouteName="Home">
            <BottomTab.Screen 
                name="Profile" 
                component={ProfileScreen} 
                options={{ 
                    tabBarIcon: () => <AntDesign name="user" size={24} color="black" />
                }}
            />

            <BottomTab.Screen 
                name="Forms" 
                component={FormsScreen} 
                options={{ 
                    tabBarIcon: () => <AntDesign name="form" size={24} color="black" />
                }}
            />

            <BottomTab.Screen 
                name="Home" 
                component={HomeScreen} 
                options={{ 
                    tabBarIcon: () => <AntDesign name="home" size={24} color="black" />
                }}
            />

            <BottomTab.Screen 
                name="Schedule" 
                component={ScheduleScreen} 
                options={{ 
                    tabBarIcon: () => <AntDesign name="calendar" size={24} color="black" />
                }}
            />
        </BottomTab.Navigator>
    );
}