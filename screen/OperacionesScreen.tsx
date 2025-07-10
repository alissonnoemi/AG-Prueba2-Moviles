import { Alert, Button, StyleSheet, Text, TextInput, TouchableOpacity, View, Switch } from 'react-native'
import React, { useState } from 'react'
import { supabase } from '../supabase/Config'

export default function OperacionesScreen() {
    const [cedula, setcedula] = useState("")
    const [nombre, setnombre] = useState("")
    const [edad, setedad] = useState(0)
    const [curso, setcurso] = useState("")
    const [angular, setangular] = useState(false)
   
    
    async function registrarEstudiante() {
        if (!cedula || !nombre || edad === 0 || !curso) {
            Alert.alert("Error", "Por favor completa todos los campos");
            return;
        }

        //validacion menores
        if (edad < 18) {
            Alert.alert("No se puede registrar menores de 18 años");
            return;
        }

        //esrudiante existe
        const estudianteExiste = await verificarEstudianteExistente();
        if (estudianteExiste) {
            Alert.alert("Estudiante ya existente");
            return;
        }

        //angular
        if (angular) {
            Alert.alert(
                "Confirmación",
                "Para tomar el curso es necesario conocer desarrollo web, ¿Desea continuar?",
                [
                    {
                        text: "No",
                        style: "cancel",
                        onPress: () => {
                            console.log("Usuario canceló el registro");
                        }
                    },
                    {
                        text: "Sí",
                        onPress: async () => {
                            await procederConRegistro();
                        }
                    }
                ]
            );
        } else {
            // Si no es curso Angular, no permitir registro
            Alert.alert("Error", "No se ha podido registrar el estudiante");
        }
    }

    async function procederConRegistro() {
        const guardadoExitoso = await guardar();
        if (guardadoExitoso) {
            Alert.alert("Éxito", "Estudiante registrado correctamente");
            setcedula("");
            setnombre("");
            setedad(0);
            setcurso("");
            setangular(false);
        }
    }
    
    async function verificarEstudianteExistente() {
        const { data, error } = await supabase
            .from('estudiante')
            .select('cedula')
            .eq('cedula', cedula)
            .limit(1);
        
        if (error) {
            console.log("Error al verificar estudiante:", error);
            return false; 
        }
        
        return data && data.length > 0;
    }
    
    async function guardar() {
        const { error } = await supabase
            .from('estudiante')
            .insert({
                cedula: cedula,
                nombre: nombre,
                edad: edad,
                curso: curso,
            })
        
        if (error) {
            console.log("Error al guardar en estudiante:", error);
            Alert.alert("Error", "No se pudo guardar la información del estudiante");
            return false;
        }
        console.log("Estudiante guardado exitosamente en la tabla estudiante");
        return true;
    }
    
    return (
        <View style={styles.container}>
            <Text style={styles.title}>Registro de Estudiantes</Text>
            <View style={styles.formContainer}>
                <TextInput 
                    placeholder='Cédula' 
                    style={styles.input} 
                    value={cedula}
                    onChangeText={setcedula}
                />
                <TextInput 
                    placeholder='Nombre completo' 
                    style={styles.input} 
                    value={nombre}
                    onChangeText={setnombre}
                />
                <TextInput 
                    placeholder='Edad' 
                    style={styles.input} 
                    value={edad === 0 ? '' : edad.toString()}
                    onChangeText={(text) => setedad(parseInt(text) || 0)}

                />
                <TextInput 
                    placeholder='Curso' 
                    style={styles.input} 
                    value={curso}
                    onChangeText={setcurso}
                />
                
                <View style={styles.switchContainer}>
                    <Text style={styles.switchLabel}>¿Angular?</Text>
                    <Switch
                        trackColor={{ false: '#ddd', true: '#F8BBD9' }}
                        thumbColor={angular ? '#fff' : '#f4f3f4'}
                        ios_backgroundColor="#ddd"
                        onValueChange={setangular}
                        value={angular}
                    />
                </View>
                
                <TouchableOpacity onPress={() => registrarEstudiante()} style={styles.button}>
                    <Text style={styles.buttonText}>Registrar Estudiante</Text>
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
    switchContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginTop: 10,
        marginBottom: 20,
        paddingHorizontal: 10,
    },
    switchLabel: {
        fontSize: 16,
        color: '#333',
        fontWeight: '500',
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
})
