import { StyleSheet, Text, View, TouchableOpacity, Alert } from 'react-native'
import React, { useState, useEffect } from 'react'
import { supabase } from '../supabase/Config'
import { useNavigation } from '@react-navigation/native'

export default function PerfilScreen() {
    const [usuario, setUsuario] = useState<any>(null)
    const navigation = useNavigation<any>()

    useEffect(() => {
        obtenerUsuario()
    }, [])

    async function obtenerUsuario() {
        const { data: { user } } = await supabase.auth.getUser()
        console.log("Usuario obtenido:", user)
        setUsuario(user)
    }

    async function cerrarSesion() {
        Alert.alert(
            "Cerrar Sesión",
            "¿Estás seguro que deseas cerrar sesión?",
            [
                {
                    text: "Cancelar",
                    style: "cancel"
                },
                {
                    text: "Sí, cerrar sesión",
                    onPress: async () => {
                        await supabase.auth.signOut()
                        navigation.reset({
                            index: 0,
                            routes: [{ name: 'Welcome' }],
                        })
                    }
                }
            ]
        )
    }    return (
        <View style={styles.container}>
            <Text style={styles.title}>Mi Perfil</Text>
            
            {usuario ? (
                <View style={styles.userInfo}>
                    <Text style={styles.label}>Email:</Text>
                    <Text style={styles.value}>{usuario.email}</Text>
                    
                    <Text style={styles.label}> Usuario:</Text>
                    <Text style={styles.value}>
                        {usuario.user_metadata?.usuario || usuario.email?.split('@')[0] || 'Sin nombre'}
                    </Text>
                    
                    <Text style={styles.label}> Fecha de Registro:</Text>
                    <Text style={styles.valueSmall}>
                        {new Date(usuario.created_at).toLocaleDateString('es-ES', {
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric'
                        })}
                    </Text>
                </View>
            ) : null}

            <TouchableOpacity style={styles.logoutButton} onPress={cerrarSesion}>
                <Text style={styles.logoutButtonText}>Cerrar Sesión</Text>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f5f5f5',
        padding: 20,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#333',
        textAlign: 'center',
        marginBottom: 30,
    },
    userInfo: {
        backgroundColor: '#fff',
        borderRadius: 12,
        padding: 20,
        marginBottom: 30,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.1,
        shadowRadius: 3.84,
        elevation: 5,
    },
    loadingContainer: {
        backgroundColor: '#fff',
        borderRadius: 12,
        padding: 20,
        marginBottom: 30,
        alignItems: 'center',
        justifyContent: 'center',
    },
    loadingText: {
        fontSize: 16,
        color: '#666',
        fontStyle: 'italic',
        marginBottom: 15,
    },
    retryButton: {
        backgroundColor: '#007AFF',
        borderRadius: 8,
        paddingVertical: 10,
        paddingHorizontal: 20,
    },
    retryButtonText: {
        color: '#fff',
        fontSize: 14,
        fontWeight: 'bold',
    },
    label: {
        fontSize: 14,
        fontWeight: 'bold',
        color: '#666',
        marginBottom: 5,
        marginTop: 15,
    },
    value: {
        fontSize: 16,
        color: '#333',
        marginBottom: 10,
    },
    valueSmall: {
        fontSize: 12,
        color: '#666',
        marginBottom: 10,
    },
    logoutButton: {
        backgroundColor: '#FF6B6B',
        borderRadius: 10,
        paddingVertical: 15,
        paddingHorizontal: 30,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.2,
        shadowRadius: 3,
        elevation: 5,
    },
    logoutButtonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },
})