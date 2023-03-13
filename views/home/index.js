import { Tab, TabView } from '@rneui/themed'
import { useState } from 'react'
import { FlatList } from 'react-native'
import { StyleSheet, View, Text } from 'react-native'

export default function Home({ navigation }) {
  const [index, setIndex] = useState(0)

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: 'red',
      justifyContent: 'center',
      alignItems: 'center',
    },
    activeStyle: {
      backgroundColor: '#cfcfcf',
      color: '#1e1eaa'
    },
    tabItem: {
      width: 100,
      padding: 0,
      backgroundColor: 'transparent',
    },
    listItem: {

    }
  })

  const DATA = [
    {
      id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
      title: 'First Item',
    },
    {
      id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
      title: 'Second Item',
    },
    {
      id: '58694a0f-3da1-471f-bd96-145571e29d72',
      title: 'Third Item',
    },
    {
      id: '58694a0f-3da1-471f-bd82-145571e29d72',
      title: 'Fourth Item',
    },
    {
      id: '58694a0f-3da1-471f-bd83-145571e29d72',
      title: 'Fifth Item',
    },
    {
      id: '58694a0f-3da1-471f-bd84-145571e29d72',
      title: 'Sixth Item',
    },
    {
      id: '58694a0f-3da1-471f-bd85-145571e29d72',
      title: 'Seventh Item',
    },
    {
      id: '58694a0f-3da1-471f-bd86-145571e29d72',
      title: 'kfjkjakfja',
    },
    {
      id: '58694a0f-3da1-471f-bd87-145571e29d72',
      title: 'kfljakj',
    },
    {
      id: '58694a0f-3da1-471f-bd88-145571e29d72',
      title: 'kjfakjgva',
    },
    {
      id: '58694a0f-3da1-471f-bd89-145571e29d72',
      title: 'kgjalknva',
    },
    {
      id: '58694a0f-3da1-471f-bd90-145571e29d72',
      title: 'klgjal;hjb;ojs',
    }
  ]

  const renderItem = ({ item, idx }) => {
    return (
      <Text style={{ fontSize: 32, marginVertical: 6, padding: 20, backgroundColor: idx % 2 === 0 ? '#6e3b6e' : '#f9c2ff' }}>
        {item.title}
      </Text>
    )
  }

  const onLoad = () => {
    DATA.push({ id: `58694a0f-3da1-471f-b${Math.floor(Math.random() * 900 + 100)}-145571e29d72`, title: `Hello~${Math.floor(Math.random() * 900 + 100)}` })
  }

  return (
    <>
      <Tab
        value={index}
        onChange={(e) => setIndex(e)}
        disableIndicator={true}
        scrollable
        containerStyle={{
          display: 'none',
          backgroundColor: 'red',
        }}
        buttonStyle={{ padding: 0, backgroundColor: '#fff' }}
        titleStyle={(active) => ({
          fontSize: 14,
          color: active ? '#1e1eaa' : '#333'
        })}
        variant="primary"
      >
        <Tab.Item
          containerStyle={styles.tabItem}
          title="推荐"
        />
        <Tab.Item
          containerStyle={styles.tabItem}
          title="英雄"
        />
        <Tab.Item
          containerStyle={styles.tabItem}
          title="卡片"
        />
        <Tab.Item
          containerStyle={styles.tabItem}
          title="item1"
        />
        <Tab.Item
          containerStyle={styles.tabItem}
          title="item2"
        />
        <Tab.Item
          containerStyle={styles.tabItem}
          title="item3"
        />
        <Tab.Item
          containerStyle={styles.tabItem}
          title="item4"
        />
        <Tab.Item
          containerStyle={styles.tabItem}
          title="item5"
        />
      </Tab>

      <TabView value={index} onChange={setIndex} >
        <TabView.Item style={{ backgroundColor: '', width: '100%' }}>
          <FlatList
            data={DATA}
            renderItem={renderItem}
            keyExtractor={(item) => item.id}
            onEndReachedThreshold={0.05}
            onEndReached={onLoad}
          // extraData={selectedId}
          />
        </TabView.Item>
        <TabView.Item style={{ backgroundColor: 'blue', width: '100%' }}>
          <Text h1>Favorite</Text>
        </TabView.Item>
        <TabView.Item style={{ backgroundColor: 'green', width: '100%' }}>
          <Text h1>Cart</Text>
        </TabView.Item>
        <TabView.Item style={{ backgroundColor: 'purple', width: '100%' }}>
          <Text h1>Item1</Text>
        </TabView.Item>
      </TabView>
    </>
  )
}