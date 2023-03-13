import React from 'react'
import { Tab } from '@rneui/base'
import { useSafeAreaInsets } from 'react-native-safe-area-context'

export default function BottomBar() {
  const [index, setIndex] = React.useState(0)

  const { bottom } = useSafeAreaInsets()

  const activeFunc = (active) => ({ backgroundColor: active ? 'rgba(0,0,0,0.5)' : undefined, })

  return (
    <Tab
      value={index}
      onChange={(e) => setIndex(e)}
      variant="primary"
      // indicatorStyle={{
      //   backgroundColor: 'white',
      //   height: 2,
      //   bottom
      // }}
      disableIndicator={true}
      style={{ backgroundColor: '#cfcfcf' }}
    >
      <Tab.Item
        title="咨询"
        titleStyle={{ fontSize: 12 }}
        style={{ paddingBottom: bottom }}
        icon={{ name: 'timer', type: 'ionicon', color: 'white' }}
        containerStyle={activeFunc}
      />
      <Tab.Item
        title="聊天"
        titleStyle={{ fontSize: 12 }}
        icon={{ name: 'timer', type: 'ionicon', color: 'white' }}
        containerStyle={activeFunc}
      />
      <Tab.Item
        title="社区"
        titleStyle={{ fontSize: 12 }}
        icon={{ name: 'heart', type: 'ionicon', color: 'white' }}
        containerStyle={activeFunc}
      />
      <Tab.Item
        title="我的"
        titleStyle={{ fontSize: 12 }}
        icon={{ name: 'cart', type: 'ionicon', color: 'white' }}
        containerStyle={activeFunc}
      />
    </Tab>
  )
}
