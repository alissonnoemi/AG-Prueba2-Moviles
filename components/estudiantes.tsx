import { StyleSheet, Text, View, FlatList, TouchableOpacity, Modal, Alert } from 'react-native'
import React, { useState, useEffect } from 'react'
import { supabase } from '../supabase/Config'

export default function Estudiantes() {
    const [estudiantes, setEstudiantes] = useState<any[]>([])
    const [modalVisible, setModalVisible] = useState(false)
    const [estudianteSeleccionado, setEstudianteSeleccionado] = useState<any>(null)

    useEffect(() => {
        leer()
    }, [])

    async function leer() {
        const { data } = await supabase
            .from('estudiante')
            .select('cedula, nombre, edad, curso')
            .order('nombre', { ascending: true })

        setEstudiantes(data || [])
    }

    function abrirModal(estudiante: any) {
        setEstudianteSeleccionado(estudiante)
        setModalVisible(true)
    }

    function cerrarModal() {
        setModalVisible(false)
        setEstudianteSeleccionado(null)
    }

    function renderEstudiante({ item }: any) {
        return (
            <TouchableOpacity
                style={styles.estudianteItem}
                onPress={() => abrirModal(item)}
            >
                <View style={styles.estudianteInfo}>
                    <Text style={styles.nombreEstudiante}>{item.nombre}</Text>
                </View>
            </TouchableOpacity>
        )
    }

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Lista de Estudiantes</Text>

            {estudiantes.length === 0 ? (
                <View style={styles.emptyContainer}>
                    <Text style={styles.emptyText}>No hay estudiantes registrados</Text>
                </View>
            ) : (
                <FlatList
                    data={estudiantes}
                    renderItem={renderEstudiante}
                    keyExtractor={(item) => item.cedula}
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={styles.listContainer}
                />
            )}

            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={cerrarModal}
            >
                <View style={styles.modalOverlay}>
                    <View style={styles.modalContent}>
                        <Text style={styles.modalTitle}>Detalles del Estudiante</Text>

                        {estudianteSeleccionado && (
                            <View style={styles.detallesContainer}>
                                <View style={styles.detalleItem}>
                                    <Text style={styles.detalleLabel}>NOMBRE:</Text>
                                    <Text style={styles.detalleValor}>{estudianteSeleccionado.nombre}</Text>
                                </View>

                                <View style={styles.detalleItem}>
                                    <Text style={styles.detalleLabel}>EDAD:</Text>
                                    <Text style={styles.detalleValor}>{estudianteSeleccionado.edad} años</Text>
                                </View>

                                <View style={styles.detalleItem}>
                                    <Text style={styles.detalleLabel}>CURSO:</Text>
                                    <Text style={styles.detalleValor}>{estudianteSeleccionado.curso}</Text>
                                </View>
                            </View>
                        )}

                        <TouchableOpacity style={styles.closeButton} onPress={cerrarModal}>
                            <Text style={styles.closeButtonText}>Cerrar</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>
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
        marginBottom: 20,
    },
    emptyContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    emptyText: {
        fontSize: 16,
        color: '#666',
        textAlign: 'center',
    },
    listContainer: {
        paddingBottom: 20,
    },
    estudianteItem: {
        backgroundColor: '#fff',
        borderRadius: 12,
        padding: 15,
        marginBottom: 10,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.1,
        shadowRadius: 3.84,
        elevation: 5,
    },
    estudianteInfo: {
        flex: 1,
    },
    nombreEstudiante: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#333',
        marginBottom: 4,
    },
    cursoEstudiante: {
        fontSize: 14,
        color: '#666',
        marginBottom: 2,
    },
    cedulaEstudiante: {
        fontSize: 12,
        color: '#999',
    },
    edadBadge: {
        backgroundColor: '#4CAF50',
        borderRadius: 20,
        paddingHorizontal: 12,
        paddingVertical: 6,
        marginLeft: 10,
    },
    edadText: {
        color: '#fff',
        fontSize: 14,
        fontWeight: 'bold',
    },
    modalOverlay: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    modalContent: {
        backgroundColor: '#fff',
        borderRadius: 20,
        padding: 25,
        margin: 20,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
        minWidth: 300,
    },
    modalTitle: {
        fontSize: 22,
        fontWeight: 'bold',
        color: '#333',
        textAlign: 'center',
        marginBottom: 20,
    },
    detallesContainer: {
        marginBottom: 25,
    },
    detalleItem: {
        marginBottom: 15,
        paddingBottom: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#f0f0f0',
    },
    detalleLabel: {
        fontSize: 14,
        fontWeight: 'bold',
        color: '#666',
        marginBottom: 5,
    },
    detalleValor: {
        fontSize: 16,
        color: '#333',
        fontWeight: '500',
    },
    closeButton: {
        backgroundColor: '#007AFF',
        borderRadius: 10,
        paddingVertical: 12,
        paddingHorizontal: 30,
        alignSelf: 'center',
    },
    closeButtonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
        textAlign: 'center',
    },
})