import { Button } from '@rneui/base'
import { StyleSheet, View } from 'react-native'

export default function Home({ navigation }) {
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: 'red',
      justifyContent: 'center',
      alignItems: 'center',
    }
  })

  return (
    <View style={styles.container}>
      <Button
        title="Go to Detail"
        onPress={() => navigation.navigate('Detail')}
      />
    </View>
  )
}