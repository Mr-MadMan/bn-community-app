import { StyleSheet, View, Text } from "react-native";

export default function Community() {
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: 'blue',
      justifyContent: 'center',
      alignItems: 'center',
    }
  });


  return (
    <View style={styles.container}>
      <Text>Community Page</Text>
    </View>
  )
}