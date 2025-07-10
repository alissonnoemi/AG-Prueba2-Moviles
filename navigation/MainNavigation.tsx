import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { createStackNavigator } from '@react-navigation/stack';
import RegistroScreen from '../screen/RegistroScreen';
import RegistroEstudianteScreen from '../screen/RegistroEstudianteScreen';
import LoginScreen from '../screen/LoginScreen';
import WelcomeScreen from '../screen/WelcomeScreen';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import PerfilScreen from '../screen/PerfilScreen';
import HistorialScreen from '../screen/HistorialScreen';
import OperacionesScreen from '../screen/OperacionesScreen';
import { NavigationContainer } from '@react-navigation/native';

export default function MainNavigation({ navigation }: any) {
    const Stack = createStackNavigator();
    function MyStack() {
        return (
            <Stack.Navigator initialRouteName='Welcome'>
                <Stack.Screen name='Welcome' component={WelcomeScreen} options={{ headerShown: false }} />
                <Stack.Screen 
                    name='Registro' 
                    component={RegistroScreen} 
                    options={{ headerShown: false }}
                />
                <Stack.Screen 
                    name='Login' 
                    component={LoginScreen} 
                    options={{ headerShown: false }}
                />
                <Stack.Screen name='Tabs' component={MyTob} />
            </Stack.Navigator>
        )
    }
    const Top = createMaterialTopTabNavigator();
    function MyTob() {
        return (
            <Top.Navigator 
                screenOptions={{
                    tabBarActiveTintColor: '#333',
                    tabBarInactiveTintColor: '#888',
                    tabBarIndicatorStyle: {
                        backgroundColor: '#F8BBD9',
                        height: 3,
                    },
                    tabBarStyle: {
                        backgroundColor: '#fff',
                        elevation: 4,
                        shadowColor: '#000',
                        shadowOffset: {
                            width: 0,
                            height: 2,
                        },
                        shadowOpacity: 0.1,
                        shadowRadius: 2,
                    },
                    tabBarLabelStyle: {
                        fontSize: 14,
                        fontWeight: 'bold',
                        textTransform: 'none',
                    },
                }}
            >
                <Top.Screen name='Operaciones' component={OperacionesScreen} />
                <Top.Screen name='Historial' component={HistorialScreen} />
                <Top.Screen name='Perfil' component={PerfilScreen} />
                
            </Top.Navigator>

        )
    }
    return (
        <NavigationContainer>
            <MyStack/>
        </NavigationContainer>
    )
}

const styles = StyleSheet.create({})