import { Button, Image, StyleSheet, Text, TextInput, View } from 'react-native'
import React from 'react'

export default function WelcomeScreen({ navigation }: any) {
    return (
        <View style={styles.container}>
            <Text style={styles.title}>Bienvenid@</Text>
            <Image
                source={{ uri: 'https://i.pinimg.com/736x/af/8c/d5/af8cd572829194c729e5f4cd8602f080.jpg' }}
                style={styles.image}
            />
            <View style={styles.buttonContainer}>
                <Button
                    title='Iniciar Sesión'
                    onPress={() => navigation.navigate('Login')}
                    color="#F8BBD9"
                />
            </View>
            <View style={styles.buttonContainer}>
                <Button 
                    title='Registrarse'
                    onPress={() => navigation.navigate('Registro')}
                    color="#F8BBD9"
                />
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
        marginBottom: 30,
        textAlign: 'center',
    },
    image: {
        width: 300,
        height: 300,
        marginBottom: 50,
        marginTop: 30,
        borderWidth: 4,
        borderColor: '#ddd',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 4,
        },
        shadowOpacity: 0.3,
        shadowRadius: 4.65,
        elevation: 8,
    },
    buttonContainer: {
        width: '80%',
        height: 50,
        borderRadius: 25,
        marginTop: 20,

    },
})