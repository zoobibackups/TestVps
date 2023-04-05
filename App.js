import React, {useEffect, useState} from 'react';
import {
  Button,
  NativeEventEmitter,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import {
  CharonErrorState,
  VpnState,
  connect,
  disconnect,
  getCharonErrorState,
  getCurrentState,
  onStateChangedListener,
  prepare,
} from 'react-native-vpn-ipsec';

import {Colors} from 'react-native/Libraries/NewAppScreen';

export const App = () => {
  const [credentials, setCredentials] = useState({
    address: 'lux-152-ike.whiskergalaxy.com',
    username: '64pjyv8h-d26sazf',
    password: 'vkhgb869nj',
    vpnType: 'ikev2',
    secret: '',
  });

  const [credentials2, setCredentials2] = useState({
    address: 'lux-152-ike.whiskergalaxy.com',
    username: '64pjyv8h-d26sazf',
    password: 'vkhgb869nj',
  });

  const [credentials1, setCredentials1] = useState({
    address: 'gr4.vpnjantit.com',
    username: 'aftabufaq-vpnjantit.com',
    password: 'aftabufaq',
    vpnType: 'ikev2',
    secret: 'ds',
  });
  const [state, setState] = useState(VpnState[VpnState.disconnected]);
  const [charonState, setCharonState] = useState(
    CharonErrorState[CharonErrorState.NO_ERROR],
  );

  useEffect(() => {
    prepare()
      .then(() => console.log('prepared'))
      .catch(err => {
        console.log(err);
      });
    onStateChangedListener(e => {
      console.log('state changed: ', e);
      setState(VpnState[e.state]);
      setCharonState(CharonErrorState[e.charonState]);
    });
  }, []);
  return (
    <>
      <StatusBar barStyle="dark-content" />
      <SafeAreaView>
        <ScrollView
          contentInsetAdjustmentBehavior="automatic"
          style={styles.scrollView}>
          <View style={styles.body}>
            <View style={styles.sectionContainer}>
              <Text style={styles.sectionTitle}>
                React Native IPsec VPN example
              </Text>
              <View style={styles.sectionDescription}>
                <Text>Current State {state}</Text>
                <Text>Current Charon State {charonState}</Text>
              </View>
            </View>
            <View style={styles.sectionContainer}>
              <Text style={styles.sectionTitle}>Credentials</Text>
              <View style={styles.sectionDescription}>
                <Text>Address:</Text>
                <TextInput
                  style={styles.textInput}
                  placeholder="Address"
                  autoCapitalize="none"
                  keyboardType="url"
                  textContentType="URL"
                  onChangeText={address =>
                    setCredentials({...credentials, address})
                  }
                  value={credentials.address}
                />
                <Text>Username:</Text>
                <TextInput
                  style={styles.textInput}
                  placeholder="Username"
                  autoCapitalize="none"
                  keyboardType="default"
                  autoCompleteType="username"
                  textContentType="username"
                  onChangeText={username =>
                    setCredentials({...credentials, username})
                  }
                  value={credentials.username}
                />
                <Text>Password:</Text>
                <TextInput
                  style={styles.textInput}
                  placeholder="Password"
                  autoCapitalize="none"
                  autoCompleteType="password"
                  textContentType="password"
                  onChangeText={password =>
                    setCredentials({...credentials, password})
                  }
                  value={credentials.password}
                />
                <Text>Secret:</Text>
                <TextInput
                  style={styles.textInput}
                  placeholder="Secret"
                  autoCapitalize="none"
                  autoCompleteType="password"
                  textContentType="password"
                  onChangeText={secret =>
                    setCredentials({...credentials, secret})
                  }
                  value={credentials.secret}
                />
              </View>
            </View>
            <View style={styles.sectionContainer}>
              <View style={styles.fixToText}>
                <Button
                  title="Connect"
                  onPress={() =>
                    connect(
                      {
                        name: 'Aftab Ameen Vpn',
                        type: 'ikev2',
                      },
                      credentials.address,
                      credentials.username,
                      credentials.password,
                      '',
                      false,
                    ).then(data => {
                      console.log(data);
                    })
                  }
                />
                <Button
                  title="Disconnect"
                  onPress={() =>
                    disconnect()
                      .then(() => console.log('disconnect: '))
                      .catch(console.log)
                  }
                />
              </View>
              <View style={styles.fixToText}>
                <Button
                  title="Update State"
                  onPress={() =>
                    getCurrentState().then(
                      _state =>
                        console.log('getCurrentState: ', _state) ||
                        setState(VpnState[_state]),
                    )
                  }
                />
                <Button
                  title="Update Charon State"
                  onPress={() => {
                    getCharonErrorState()
                      .then(_state => {
                        console.log('getCharonErrorState: ', _state);
                      })
                      .catch(err => {
                        console.log(err);
                      });
                  }}
                />
              </View>
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
    </>
  );
};

export default App;

const styles = StyleSheet.create({
  scrollView: {
    backgroundColor: Colors.lighter,
  },
  engine: {
    position: 'absolute',
    right: 0,
  },
  body: {
    backgroundColor: Colors.white,
  },
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
    color: Colors.black,
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
    color: Colors.dark,
  },
  highlight: {
    fontWeight: '700',
  },
  footer: {
    color: Colors.dark,
    fontSize: 12,
    fontWeight: '600',
    padding: 4,
    paddingRight: 12,
    textAlign: 'right',
  },
  fixToText: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 5,
  },
  textInput: {
    height: 30,
    borderColor: 'gray',
    color: 'black',
    borderWidth: 1,
    padding: 5,
  },
});
