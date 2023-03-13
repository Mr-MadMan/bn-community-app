import { StatusBar } from 'expo-status-bar'
import { useState, useCallback, useEffect } from 'react'
import { StyleSheet, Text, View, Switch, ScrollView, RefreshControl } from 'react-native'
// import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
// import { WebView } from 'react-native-webview'
// import BottomBar from './components/BottomBar.js'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import Home from './views/home/index.js'
import Community from './views/community/index.js'
import Detail from './views/detail/index.js'
import Login from './views/login/index.js'
import My from './views/my/index.js'
import { Button } from '@rneui/base'
import { getProducts } from './request/api.js'
import { Icon } from '@rneui/themed'

const Tab = createBottomTabNavigator()
const Stack = createNativeStackNavigator()

const wait = (timeout) => {
  return new Promise(resolve => {
    setTimeout(resolve, timeout)
  })
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
    backgroundColor: '#cfcfcf'
  }
})

function HomeTabs() {
  return (
    <Tab.Navigator screenOptions={({ route }) => ({
      tabBarIcon: ({ focused, color, size }) => {
        let iconName

        if (route.name === 'Home') {
          iconName = focused
            ? 'home'
            : 'home-outline'
        } else if (route.name === 'Community') {
          iconName = focused ? 'chatbubble-ellipses' : 'chatbubble-ellipses-outline'
        } else if (route.name === 'My') {
          iconName = focused ? 'md-person' : 'md-person-outline'
        }

        // You can return any component that you like here!
        return <Icon name={iconName} type='ionicon' size={size} color={color} />
      },
      tabBarActiveTintColor: '#33a0d3',
      tabBarInactiveTintColor: 'gray',
    })}>
      <Tab.Screen name="Home" component={Home} options={{ title: '首页' }} />
      <Tab.Screen name="Community" component={Community} options={{ title: '社区', tabBarBadge: 3 }} />
      <Tab.Screen name="Login" component={Login} options={{ title: '我的' }} />
    </Tab.Navigator>
  )
}

export default function App() {
  useEffect(() => {
    getProducts().then(res => {
      console.log(res)
    })
  }, [])

  const onRefresh = useCallback(() => {
    setRefreshing(true)
    wait(2000).then(() => setRefreshing(false))
  }, [])

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
    //     {/* <BottomBar /> */}
    //   </SafeAreaView>
    // </SafeAreaProvider>
    <NavigationContainer>
      <StatusBar style="auto" networkActivityIndicatorVisible={false} />
      <Stack.Navigator>
        <Stack.Screen name="HomeTab" component={HomeTabs} options={{ headerShown: false }} />
        <Stack.Screen name="Detail" component={Detail} options={({ navigation }) => ({
          title: '详情页'
          // headerLeft: () => (
          //   <Button title={'返回'} onPress={() => navigation.goBack()} />
          // ),
        })} />
      </Stack.Navigator>
    </NavigationContainer>
  )
}