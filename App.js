import React from 'react';
import { StyleSheet, StatusBar } from 'react-native';
import { Timer } from './src/components/Timer';
import { TimerSettings } from './src/components/TimerSettings';
import { NavigationContainer } from '@react-navigation/native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';

const Tab = createMaterialTopTabNavigator()

export default function App() {
    return (  
        <NavigationContainer>
            <Tab.Navigator 
                style={styles.container} 
                initialRouteName="Home"
                screenOptions={{
                    tabBarPressColor: 'black',
                    tabBarLabelStyle:{
                        fontSize: 14,
                        color: 'white',
                    },
                    tabBarStyle: {
                        backgroundColor: 'teal',
                    }
                }}
            >
                <Tab.Screen name="Home" component={Timer}/>
                <Tab.Screen name="Settings" component={TimerSettings}/>
            </Tab.Navigator>
        </NavigationContainer>   
    );
}

const styles = StyleSheet.create({
  container: {
      paddingTop: StatusBar.currentHeight,
  },
  text: {
    color:"teal",
    fontSize: 20,
  }
});
