import React, {Component} from 'react';
import {
  View,
  StyleSheet,
  Image,
  TouchableOpacity,
  Styles,
  Text,
  LogBox,
  FlatList,
} from 'react-native';
import {Actions} from 'react-native-router-flux';
import {ScrollView} from 'react-native-gesture-handler';
import {WebView} from 'react-native-webview';

export default class RestorantDetailScreen extends Component {
  constructor(props) {
    super(props);

    this.state = {
      cartArray: this.props.item,
    };
  }
  componentWillUnmount() {
    if (this.props.reloadScreenData) this.props.reloadScreenData();
  }

  async componentDidMount() {}

  _renderMiddle = () => {
    return (
      <View style={{flex: 1, justifyContent: 'center'}}>
        <View style={styles.loginTitleStyle}>
          <Text
            style={{
              fontSize: 18,
              padding: 5,
              margin: 10,
              alignSelf: 'flex-start',
              color: 'black',
            }}>
            {this.state.cartArray.show.name}
          </Text>
        </View>
      </View>
    );
  };

  _renderBack() {
    return (
      <TouchableOpacity onPress={Actions.pop} style={{padding: 16}}>
        <Image
          style={{
            width: 30,
            height: 24,
            marginTop: 0,
            alignSelf: 'center',
            tintColor: 'black',
          }}
          resizeMode="contain"
          source={require('../assets/images/ic_back_btn.png')}
        />
      </TouchableOpacity>
    );
  }

  _renderToolbar = () => {
    return (
      <View style={{flexDirection: 'row', backgroundColor: '#F8F8F8'}}>
        {this._renderBack()}
        {this._renderMiddle()}
      </View>
    );
  };

  render() {
    return (
      <View style={styles.container}>
        {this._renderToolbar()}
        <ScrollView>
          <View style={{flex: 1, margin: 15, borderRadius: 10}}>
            <View style={{flex: 1, flexDirection: 'column', marginStart: 8}}>
              <Image
                style={{
                  width: 150,
                  height: 150,
                  padding: 10,
                  borderRadius: 5,
                  resizeMode: 'cover',
                  alignSelf: 'center',
                  alignContent: 'center',
                  justifyContent: 'center',
                }}
                resizeMode="contain"
                source={{
                  uri: this.state.cartArray.show.image.medium,
                }}
              />
              <Text
                style={{
                  fontSize: 20,
                  alignSelf: 'flex-start',
                  color: 'red',
                  marginTop: 10,
                }}>
                {'Show Name : ' + this.state.cartArray.show.name}
              </Text>
              <Text
                style={{
                  fontSize: 16,
                  alignSelf: 'flex-start',
                  color: 'black',
                  marginTop: 10,
                }}>
                {'Type : ' + this.state.cartArray.show.type}
              </Text>
              <Text
                style={{
                  fontSize: 16,
                  alignSelf: 'flex-start',
                  color: 'black',
                  marginTop: 10,
                }}>
                {'Language : ' + this.state.cartArray.show.language}
              </Text>
              <Text
                style={{
                  fontSize: 16,
                  alignSelf: 'flex-start',
                  color: 'green',
                  marginTop: 10,
                }}>
                {'Status : ' + this.state.cartArray.show.status}
              </Text>
              <Text
                style={{
                  fontSize: 16,
                  alignSelf: 'flex-start',
                  color: 'black',
                  marginTop: 10,
                }}>
                {'Runtime :' + this.state.cartArray.show.runtime}
              </Text>
              <Text
                style={{
                  fontSize: 16,
                  alignSelf: 'flex-start',
                  color: 'blue',
                  marginTop: 10,
                }}>
                {'Link : ' + this.state.cartArray.show.officialSite}
              </Text>
              <WebView
                style={{width: 500, height: 200,marginTop:10}}
                source={{uri: this.state.cartArray.show.officialSite}}
              />
            </View>
          </View>
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  viewStyle: {
    flex: 1,
    alignItems: 'stretch',
    flexDirection: 'column',
    backgroundColor: 'white',
  },

  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: '#EFEFEF',
  },
  backButtonImage: {
    width: 30,
    height: 24,
    marginTop: 0,
    alignSelf: 'center',
    tintColor: 'gray',
  },
  circle: {
    width: 36,
    height: 36,
    borderRadius: 18, //half radius will make it cirlce,
    backgroundColor: 'red',
  },
  count: {color: '#FFF'},
});
