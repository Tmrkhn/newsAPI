import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import WelcomeScreen from './src/screens/WelcomeScreen';

const Stack = createNativeStackNavigator();

export default function App() {
    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName='Welcome'>
                <Stack.Screen
                name="Welcome"
                component={WelcomeScreen}
                options={{ title: 'Добро пожаловать'}}
                />
            </Stack.Navigator>
        </NavigationContainer>
    );
}