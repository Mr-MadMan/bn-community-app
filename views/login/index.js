import { Text, Input, Button, Avatar, Dialog } from '@rneui/themed'
import { useEffect, useState } from 'react'
import { StyleSheet, View } from 'react-native'
import * as WebBrowser from 'expo-web-browser'
import * as Google from 'expo-auth-session/providers/google'
import { makeRedirectUri } from 'expo-auth-session'
import { Alert } from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage'

// webClientId=196014439805-f4q9rjedbjvnkmmcl1ttrucgctee59ck.apps.googleusercontent.com
// https://auth.expo.io/@lormadman/bn-community
WebBrowser.maybeCompleteAuthSession()

export default function Login() {
  const [isLoading, setIsLoading] = useState(false)
  const [info, setInfo] = useState({ account: '', password: '' })
  const [token, setToken] = useState('')
  const [userInfo, setUserInfo] = useState(null)

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      padding: 20,
      // alignItems: 'center'
    },
    inputWrapContainer: {
      backgroundColor: '#e5e7eb',
      height: 50,
      marginBottom: 15
    },
    btnStyle: {
      width: '80%',
      alignSelf: 'center',
      backgroundColor: '#5c63d8',
      borderRadius: 30,
    }
  })

  const [request, response, promptAsync] = Google.useAuthRequest({
    redirectUri: makeRedirectUri({
      // useProxy: true,
      scheme: 'bncommunity'
    }),
    selectAccount: true,
    expoClientId: '196014439805-f4q9rjedbjvnkmmcl1ttrucgctee59ck.apps.googleusercontent.com',
    webClientId: '196014439805-f4q9rjedbjvnkmmcl1ttrucgctee59ck.apps.googleusercontent.com',
    iosClientId: '196014439805-57nro2n2o5tfci7vehjboe0ff2bma5hr.apps.googleusercontent.com',
    androidClientId: '196014439805-8n5dgpjmeh8k92ne2b6rrkejg9560uc3.apps.googleusercontent.com'
  })

  useEffect(() => {
    if (response?.type === 'success') {
      setToken(response.authentication.accessToken)
      getUserInfo()
    }
  }, [response, token])

  const getUserInfo = async () => {
    try {
      await AsyncStorage.setItem('token', token)

      const response = await fetch(
        'https://www.googleapis.com/userinfo/v2/me',
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      )

      const user = await response.json()
      await AsyncStorage.setItem('user_info', JSON.stringify(user))
      setUserInfo(user)
    } catch (error) {
      Alert.alert('Something wrong')
    }
  }

  const login = () => {
    setIsLoading(true)
    Alert.alert('', 'Are U sure bout that?', [
      { text: 'ok', onPress: () => setIsLoading(false) }
    ])
  }

  const signUp = () => {
    if (!info.account && !info.account.trim()) {
      Alert.alert('Account can not be empty')
    }
    if (!info.password && !info.password.trim()) {
      Alert.alert('Password can not be empty')
    }
  }

  return (
    <View style={styles.container}>
      <Text style={{ fontSize: 16, marginBottom: 8 }}>Email Address</Text>
      <Input
        value={info.account}
        placeholder="Please type in your account"
        containerStyle={styles.inputWrapContainer}
        inputContainerStyle={{ borderBottomWidth: 0, paddingBottom: 0, marginBottom: 0 }}
        leftIcon={{ type: 'material-community', name: 'email-outline', size: 28, color: '#33a0d3' }}
        onChangeText={value => setInfo((prev) => ({ ...prev, account: value }))}
      />
      <Text style={{ fontSize: 16, marginBottom: 8 }}>Password</Text>
      <Input
        value={info.password}
        textContentType="password"
        placeholder="Please type in your password"
        containerStyle={styles.inputWrapContainer}
        inputContainerStyle={{ borderBottomWidth: 0 }}
        leftIcon={{ type: 'material-community', name: 'lock-outline', size: 28, color: '#33a0d3' }}
        onChangeText={value => setInfo((prev) => ({ ...prev, password: value }))}
      />
      <Text style={{ marginBottom: 20 }}>我已同意条款 <Text style={{ color: '#00a087' }}>Free Membership Agreement</Text></Text>
      <Button
        icon={{ name: 'logo-google', type: 'ionicon', color: '#fff' }}
        buttonStyle={Object.assign({}, styles.btnStyle, { marginBottom: 10, backgroundColor: '#2089dc' })}
        title="Sign in with Google"
        disabled={!request}
        onPress={() => {
          promptAsync({ showInRecents: true })
        }}
      />
      <Button onPress={signUp}>Create account</Button>
      <Button
        buttonStyle={styles.btnStyle}
        loading={isLoading}
        size="lg"
        onPress={login}>Log In</Button>
    </View>
  )
}