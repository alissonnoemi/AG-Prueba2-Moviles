import { Alert, Button, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import { supabase } from '../supabase/Config'

export default function RegistroScreen({ navigation }: any) {
    const [correo, setcorreo] = useState("")
    const [password, setPassword] = useState("")
    const [telefono, settelefono] = useState(0)
    const [usuario, setusuario] = useState("")
    async function registro() {
        if (!correo || !password || !usuario || telefono === 0) {
            Alert.alert("Error", "Por favor completa todos los campos");
            return;
        }

        const { data, error } = await supabase.auth.signUp({
            email: correo,
            password: password,
        })
        console.log(data.user?.id)
        console.log(data, error)
        if (data.user != null) {
            const guardadoExitoso = await guardar(data.user.id);
            if (guardadoExitoso) {
                Alert.alert("Éxito", "Usuario registrado correctamente", [
                    { text: "OK", onPress: () => navigation.navigate("Login") }
                ]);
            }
        } else {
            Alert.alert("Error", error?.message)
        }
    }
    async function guardar(uid: string) {
        const { error } = await supabase
            .from('profesores')
            .insert({
                usuario: usuario,
                telefono: telefono.toString(), // Convertir a string porque la columna es text
                correo: correo,
            })
        
        if (error) {
            console.log("Error al guardar en profesores:", error);
            Alert.alert("Error", "No se pudo guardar la información del usuario");
            return false;
        }
        console.log("Usuario guardado exitosamente en la tabla profesores");
        return true;
    }
    return (
        <View style={styles.container}>
            <Text style={styles.title}>Crear Cuenta</Text>
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
                <TextInput 
                    placeholder='Teléfono' 
                    style={styles.input} 
                    onChangeText={(text) => settelefono(parseInt(text) || 0)}
                    keyboardType="phone-pad"
                />
                <TextInput 
                    placeholder='Usuario' 
                    style={styles.input} 
                    onChangeText={setusuario}
                    autoCapitalize="none"
                />
                <TouchableOpacity onPress={() => registro()} style={styles.button}>
                    <Text style={styles.buttonText}>Crear Cuenta</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => navigation.navigate('Login')} style={styles.linkButton}>
                    <Text style={styles.linkText}>¿Ya tienes cuenta? Inicia sesión</Text>
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
        marginBottom: 15,
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
        marginTop: 20,
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