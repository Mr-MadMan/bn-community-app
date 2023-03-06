import React from 'react'
import { StyleSheet, View, Text } from 'react-native';

export default function StatusBarItem({ itemName }) {
  return (
    <View style={styles.bottomItem}>
      <Text>{itemName}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  bottomItem: {
    flex: 1,
    borderWidth: 2,
    borderColor: 'pink'
  }
});