import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import MyTabs from './src/navigation/myTabsNav';
import { NavigationContainer } from '@react-navigation/native';
import MyStack from './src/navigation/stackNav';


export default function App() {


  return (
    <NavigationContainer>
      <MyStack/>
      </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
