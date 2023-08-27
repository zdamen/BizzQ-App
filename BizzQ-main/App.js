import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Login from './Screens/Login';
import AppIntro from './Screens/AppIntro';
import Home from './Screens/Home';
import CardDesignSelction from './Screens/CardDesignSelction';
import CardCreation from './Screens/CardCreation';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
      <Stack.Screen options={{ headerShown: false }} name="AppIntro" component={AppIntro} />
        <Stack.Screen options={{ headerShown: false }} name="CardCreation" component={CardCreation} />
        <Stack.Screen options={{ headerShown: false }} name="Login" component={Login} />
        <Stack.Screen options={{ headerShown: false }} name="CardDesignSelction" component={CardDesignSelction} />
        <Stack.Screen options={{ headerShown: false }} name="Home" component={Home} />
      </Stack.Navigator>
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
