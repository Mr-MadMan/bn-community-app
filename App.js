import { StatusBar } from 'expo-status-bar';
import { useState, useCallback, useEffect } from 'react';
import { StyleSheet, Text, View, Switch, ScrollView, RefreshControl } from 'react-native';
// import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { WebView } from 'react-native-webview';
// import BottomBar from './components/BottomBar.js'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Home from './views/home/index.js';
import Community from './views/community/index.js';
import Detail from './views/detail/index.js'
import { Button } from '@rneui/base';
import { getProducts } from './request/api.js';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();


const wait = (timeout) => {
  return new Promise(resolve => {
    setTimeout(resolve, timeout);
  });
}

const styles = StyleSheet.create({
  container: {
    height: '100%',
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
  },
  bottom: {
    display: 'flex',
    flexDirection: 'row',
    flex: 0.1,
    width: '100%',
    backgroundColor: "#cfcfcf"
  }
});

function HomeTabs() {
  return (
    <Tab.Navigator >
      <Tab.Screen name="Home" component={Home} options={{ title: '首页', tabBarBadge: 3, tabBarActiveTintColor: 'green' }} />
      <Tab.Screen name="Community" component={Community} options={{ title: '社区', tabBarActiveTintColor: 'green' }} />
    </Tab.Navigator>
  );
}

// function backButo(params) {

// }

export default function App() {
  const postData = async () => {
    const dateObj = new Date()
    const response = await fetch("https://rn-request-default-rtdb.europe-west1.firebasedatabase.app/products.json", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        id: 1,
        name: '贴纸',
        price: 20,
        createTime: `${dateObj.getHours()}:${dateObj.getMinutes()}:${dateObj.getSeconds()}`
      })
    }).then(res => res.json())
    console.log(response.name);
  };

  const getData = async () => {
    const response = await fetch("https://rn-request-default-rtdb.europe-west1.firebasedatabase.app/products.json", {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    }).then(res => res.json())
    console.log(response);
  };

  const [isEnabled, setIsEnabled] = useState(false)
  const [refreshing, setRefreshing] = useState(false)

  useEffect(() => {
    getProducts().then(res => {
      console.log(res);
    });
  }, []);

  const toggleSwitch = () => setIsEnabled(status => !status);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    wait(2000).then(() => setRefreshing(false));
  }, []);

  // const insets = useSafeAreaInsets();

  return (
    // <SafeAreaProvider>
    //   <SafeAreaView style={styles.container} edges={['right', 'top', 'left']}>
    //     <ScrollView style={{ flex: 1 }} refreshControl={
    //       <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
    //     }>
    //       <Switch
    //         trackColor={{ false: "#767577", true: "#81b0ff" }}
    //         thumbColor={isEnabled ? "#f5dd4b" : "#f4f3f4"}
    //         ios_backgroundColor="#3e3e3e"
    //         onValueChange={toggleSwitch}
    //         value={isEnabled}
    //       />
    //       <WebView
    //         originWhitelist={['*']}
    //         source={{ uri: 'https://player.bilibili.com/player.html?aid=268024687&bvid=BV1HY41167oQ&cid=1039703386&page=1' }}
    //         // source={{
    //         //   html: '<iframe src="//player.bilibili.com/player.html?aid=268024687&bvid=BV1HY41167oQ&cid=1039703386&page=1" scrolling="no" border="0" frameborder="no" framespacing="0" allowfullscreen="true"> </iframe>'
    //         // }}
    //         style={{ width: 375, height: 200 }}
    //         // startInLoadingState={true}
    //         javaScriptEnabled={true}
    //       />
    //     </ScrollView>
    //     <StatusBar style="auto" />
    //     {/* <BottomBar /> */}
    //   </SafeAreaView>
    // </SafeAreaProvider>
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="HomeTab" component={HomeTabs} options={{ headerShown: false }} />
        <Stack.Screen name="Detail" component={Detail} options={({ navigation }) => ({
          title: '详情页',
          headerLeft: () => (
            <Button title={'返回'} onPress={() => navigation.goBack()} />
          ),
        })} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

