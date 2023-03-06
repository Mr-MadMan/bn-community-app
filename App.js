import { StatusBar } from 'expo-status-bar';
import { useState, useCallback } from 'react';
import { StyleSheet, Text, View, Switch, ScrollView, RefreshControl } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { WebView } from 'react-native-webview';
import StatusBarItem from './components/StatusBarItem.js'
import BottomBar from './components/BottomBar.js'

const wait = (timeout) => {
  return new Promise(resolve => {
    setTimeout(resolve, timeout);
  });
}

export default function App() {
  const [isEnabled, setIsEnabled] = useState(false)
  const [refreshing, setRefreshing] = useState(false)
  const itemList = [
    { compo: StatusBarItem, itemName: '资讯' },
    { compo: StatusBarItem, itemName: '社区' },
    { compo: StatusBarItem, itemName: '战绩' },
    { compo: StatusBarItem, itemName: '我的' }
  ]
  const toggleSwitch = () => setIsEnabled(status => !status);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    wait(2000).then(() => setRefreshing(false));
  }, []);

  // const insets = useSafeAreaInsets();

  // const runFirst = `
  //   document.body.style.backgroundColor = 'red';
  //   setTimeout(function() { window.alert('hi') }, 2000);
  //   true; // note: this is required, or you'll sometimes get silent failures
  // `;

  return (
    <SafeAreaProvider >
      <SafeAreaView style={styles.container} edges={['right', 'top', 'left']}>
        <ScrollView style={{ flex: 1 }} refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }>
          <Text style={styles.textConf}>Open up App.js to start working on your app!</Text>
          <Switch
            trackColor={{ false: "#767577", true: "#81b0ff" }}
            thumbColor={isEnabled ? "#f5dd4b" : "#f4f3f4"}
            ios_backgroundColor="#3e3e3e"
            onValueChange={toggleSwitch}
            value={isEnabled}
          />
          <WebView
            originWhitelist={['*']}
            source={{ uri: 'https://player.bilibili.com/player.html?aid=268024687&bvid=BV1HY41167oQ&cid=1039703386&page=1' }}
            // source={{
            //   html: `<iframe src="//player.bilibili.com/player.html?aid=268024687&bvid=BV1HY41167oQ&cid=1039703386&page=1" scrolling="no" border="0" frameborder="no" framespacing="0" allowfullscreen="true"> </iframe>`
            // }}
            style={{ width: 375, height: 200 }}
            startInLoadingState={true}
            javaScriptEnabled={true}
          />
          {/* injectedJavaScript={runFirst} */}
        </ScrollView>
        <StatusBar style="auto" />
        <BottomBar />
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    height: '100%',
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
  },
  textConf: {
    color: 'red',
    letterSpacing: 2,
    textShadowRadius: 2,
    textShadowColor: '#ff8c00'
  },
  bottom: {
    display: 'flex',
    flexDirection: 'row',
    flex: 0.1,
    width: '100%',
    backgroundColor: "#cfcfcf"
  }
});
