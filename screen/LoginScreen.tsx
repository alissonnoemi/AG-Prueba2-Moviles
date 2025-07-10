import { Alert, Button, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import { supabase } from '../supabase/Config'


export default function LoginScreen({ navigation }: any) {
    const [correo, setcorreo] = useState("")
    const [password, setPassword] = useState("")
    async function Login() {
        const { data, error } = await supabase.auth.signInWithPassword({
            email: correo,
            password: password,
        })
        console.log(data, error)
        if (data.user != null) {
            navigation.navigate("Tabs")
        } else {
            Alert.alert("Error", error?.message)
        }
    }
    return (
        <View style={styles.container}>
            <Text style={styles.title}>Iniciar Sesión</Text>
            <View style={styles.formContainer}>
                <TextInput 
                    placeholder='Email' 
                    style={styles.input} 
                    onChangeText={setcorreo}
                    keyboardType="email-address"
                    autoCapitalize="none"
                />
                <TextInput 
                    placeholder='Contraseña' 
                    style={styles.input} 
                    onChangeText={setPassword}
                    secureTextEntry={true}
                />
                <TouchableOpacity onPress={() => Login()} style={styles.button}>
                    <Text style={styles.buttonText}>Iniciar Sesión</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => navigation.navigate('Registro')} style={styles.linkButton}>
                    <Text style={styles.linkText}>¿No tienes cuenta? Regístrate</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#f5f5f5',
        padding: 20,
    },
    title: {
        fontSize: 28,
        fontWeight: 'bold',
        color: '#333',
        marginBottom: 40,
        textAlign: 'center',
    },
    formContainer: {
        width: '100%',
        maxWidth: 400,
    },
    input: {
        width: '100%',
        height: 50,
        borderWidth: 1,
        borderColor: '#ddd',
        borderRadius: 25,
        paddingHorizontal: 20,
        fontSize: 16,
        backgroundColor: '#fff',
        marginBottom: 20,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.1,
        shadowRadius: 2,
        elevation: 3,
    },
    button: {
        backgroundColor: '#F8BBD9',
        padding: 15,
        borderRadius: 25,
        alignItems: 'center',
        marginTop: 10,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.2,
        shadowRadius: 3,
        elevation: 5,
    },
    buttonText: {
        color: '#333',
        fontSize: 18,
        fontWeight: 'bold',
    },
    linkButton: {
        marginTop: 20,
        alignItems: 'center',
    },
    linkText: {
        color: 'black',
        fontSize: 16,
        textDecorationLine: 'underline',
    },
})