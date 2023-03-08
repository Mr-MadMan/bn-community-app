import { StyleSheet, View, Text } from 'react-native'

export default function Community() {
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: 'green',
      justifyContent: 'center',
      alignItems: 'center',
    }
  })

  return (
    <View style={styles.container}>
      <Text>Detail Page</Text>
    </View>
  )
}