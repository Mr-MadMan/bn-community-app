import { Avatar, Text } from '@rneui/themed'
import { StyleSheet, View } from 'react-native'


export default function My() {
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      // backgroundColor: '#',
    },
    userWrap: {
      padding: 20,
      flexDirection: 'row',
      alignItems: 'center'
    },
    userName: {
      marginLeft: 20,
      color: '#fff',
      fontSize: 26,
      fontWeight: 600
    }
  })

  return (
    <View style={styles.container}>
      <View style={styles.userWrap}>
        <Avatar size={64} rounded source={{ uri: 'https://cdn.pixabay.com/photo/2019/11/03/20/11/portrait-4599553__340.jpg' }} />
        <Text style={styles.userName}>name</Text>
      </View>

      <View>
        
      </View>
    </View>
  )
}