import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import Estudiantes from '../components/estudiantes'

export default function HistorialScreen() {
  return (
    <View style={styles.container}>
      <Estudiantes />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
})