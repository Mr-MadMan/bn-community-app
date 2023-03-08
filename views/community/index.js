import { StyleSheet, View, Text } from 'react-native'
import { Chip, Icon } from '@rneui/themed'

export default function Community() {
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: 'blue',
      justifyContent: 'center',
      alignItems: 'center',
    }
  })


  return (
    <View style={styles.container}>
      <Text>Community Page</Text>

      <Chip
        title="Left Icon Chip"
        icon={{
          name: 'bluetooth',
          type: 'font-awesome',
          size: 20,
          color: 'white',
        }}
        containerStyle={{ marginVertical: 15 }}
      />
      <Icon
        reverse
        name='ios-american-football'
        type='ionicon'
        color='#517fa4'
      />
    </View>
  )
}