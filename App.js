/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import {
  AppRegistry, SafeAreaView, Alert,
  Platform, Text, View, StyleSheet, Image, Keyboard, LogBox
} from 'react-native';
import React, { Component } from 'react'
import { StackViewStyleInterpolator } from 'react-navigation-stack';
import {
  Scene,
  Router,
  Actions,
  ActionConst,
  Overlay,
  Tabs,
  Modal,
  Stack,
  Drawer,
  Lightbox,
} from 'react-native-router-flux';

//Screens
import SplashScreen from './src/screens/SplashScreen'
import RestorantDetailScreen from './src/screens/RestorantDetailScreen';
import RestorantListScreen from './src/screens/RestorantListScreen';
import IntroSlider from './src/screens/IntroSlider';

export default class App extends Component {


  stateHandler = (prevState, newState, action) => {
    Keyboard.dismiss()
  };

  transitionConfig = () => ({
    screenInterpolator: StackViewStyleInterpolator.forFadeFromBottomAndroid,
  });
  componentWillUnmount() {
  }

  render() {
    return (
      <SafeAreaView style={{ flex: 1 }}>
        {/* <CustomStatusBar /> */}
        <Router
          onStateChange={this.stateHandler}
          sceneStyle={styles.scene}
          uriPrefix={this.prefix}>
          <Overlay key="overlay">
            <Modal key="modal" hideNavBar transitionConfig={this.transitionConfig}>
              <Stack key="root" >
                <Scene
                  key='Splash'
                  component={SplashScreen}
                  title='Splash'
                  hideNavBar
                  initial
                />
                  <Scene
                  key='IntroSlider'
                  component={IntroSlider}
                  title='IntroSlider'
                  hideNavBar
                />
                 <Scene
                  key='RestorantListScreen'
                  component={RestorantListScreen}
                  title='RestorantListScreen'
                  hideNavBar
                />
                <Scene
                  key='RestorantDetailScreen'
                  component={RestorantDetailScreen}
                  title='RestorantDetailScreen'
                  hideNavBar
                /> 
              </Stack>
            </Modal>
          </Overlay>
        </Router>
      </SafeAreaView>
    )
  }

}
const styles = StyleSheet.create({
  viewStyle: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: 'black'
  },

  bgImageStyle: {
    flex: 1,
    justifyContent: 'center'
  },

  logoStyle: {
    alignSelf: 'center',
    marginTop: -54,
    width: '100%',
    height: 90
  },

  innerViewStyle: {
    flex: 1,
    width: '100%',
    justifyContent: 'center',
    paddingLeft: 40,
    paddingRight: 40
  },

  bottomStyle: {
    width: '100%',
    padding: 20,
    position: 'absolute',
    bottom: 0,
    alignItems: 'flex-end'
  },
  tabBar: {
    backgroundColor: 'white',
    height: 70,
    borderTopColor: 'darkgrey',
    borderTopWidth: 0,
    opacity: 0.98,
    justifyContent: 'space-between',
    elevation: 5,
    shadowColor: 'black',
    shadowOffset: { height: 5 }, // -5 does nothing either
    shadowOpacity: 0.75,
    shadowRadius: 5,

  },
  tabItemStyle: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',

    borderTopWidth: 4,
    padding: 5,
    borderRadius: 1.5,
    backgroundColor: 'transparent'
  },

  container: {
    justifyContent: 'center',
    flex: 1,
    margin: 10,
    paddingTop: (Platform.OS) === 'ios' ? 20 : 0
  },
  listStyle: {
    padding: 8
  }


})
