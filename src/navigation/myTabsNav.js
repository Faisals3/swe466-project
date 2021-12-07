import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import ViewReportsPage from '../screens/ViewReportsPage';
import EditsReportsPage from '../screens/EditReportsPage';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';


export default function myTabsNav({ navigation }) {
    const Tab = createMaterialBottomTabNavigator();
  
    function MyTabs() {
      return (
        <Tab.Navigator
          initialRouteName="ViewReportsPage"
          activeColor="#197278"
          barStyle={{ backgroundColor: 'white' }}
        >
          <Tab.Screen
            name="ViewReportsPage"
            component={ViewReportsPage}
            options={{
              tabBarLabel: 'ViewReportsPage',
              tabBarIcon: ({ color }) => (
                <MaterialCommunityIcons name="home" color={color} size={26} />
              ),
            }}
          />
          <Tab.Screen
            name="EditsReportsPage"
            component={EditsReportsPage}
            options={{
              tabBarLabel: 'EditsReportsPage',
              tabBarIcon: ({ color }) => (
                <MaterialCommunityIcons name="chat" color={color} size={26} />
              ),
            }}
          />
        </Tab.Navigator>
      );
    }
  
    return MyTabs();
  }