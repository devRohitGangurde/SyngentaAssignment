import React, {useState, useEffect} from 'react';
import {
  View,
  StyleSheet,
  Image,
  TouchableOpacity,
  Styles,
  Text,
  LogBox,
  FlatList,
  TextInput,
} from 'react-native';
import {Actions} from 'react-native-router-flux';
import NetInfo from '@react-native-community/netinfo';
import AsyncStorage from '@react-native-community/async-storage';

export default function RestorantiListScreen() {
  const [tvShowListArray, setTvShowListArray] = useState([]);
  const [searchTvShowString, setSearchTvShowString] = useState('');

  const _openDetailScreen = (item) => {
    Actions.push('RestorantDetailScreen', {
      item: item,
    });
  };

  const saveList = async (mFlag) => {
    AsyncStorage.setItem('saveMovieList', JSON.stringify(mFlag))
      .then((json) => console.log('success!'))
      .catch((error) => console.log('error!'));
  };

  const _onSearchButtonClick = () => {
    if (searchTvShowString) {
      _searchTvShow(searchTvShowString);
    } else {
      alert('Please enter valid text');
    }
  };

  useEffect(() => {
    NetInfo.fetch().done((values) => {
      values.isConnected ? _getValues() :  getOfflineList;
    });

  }, []);

  const getOfflineList = async () => {
   await AsyncStorage.getItem('saveMovieList')
      .then((req) => {
        JSON.parse(req);
      })
      .then((json) => {
        setTvShowListArray(json);
      })
      .catch((error) => console.log('error!'));
  };

  const _getValues = async () => {
    var requestOptions = {
      method: 'GET',
      redirect: 'follow',
    };

    fetch('http://api.tvmaze.com/schedule?country=US', requestOptions)
      .then((response) => response.json())
      .then((result) => {
        console.log(JSON.stringify(result.length));
        setTvShowListArray(result);
        saveList(result);
      })
      .catch((error) => {
        console.log('error', error);
      });
  };

  const _searchTvShow = async (showName) => {
    var requestOptions = {
      method: 'GET',
      redirect: 'follow',
    };

    fetch('http://api.tvmaze.com/search/shows?q=' + showName, requestOptions)
      .then((response) => response.json())
      .then((result) => {
        console.log(result);
        setTvShowListArray(result);
      })
      .catch((error) => {
        console.log('error', error);
      });
  };

  const _renderMiddle = () => {
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
            {'Restaurant List'}
          </Text>
        </View>
      </View>
    );
  };

  const _renderToolbar = () => {
    return (
      <View style={{flexDirection: 'row', backgroundColor: '#F8F8F8'}}>
        {_renderMiddle()}
      </View>
    );
  };

  const _renderMessageItem = (item, index) => {
    console.log('item******************' + JSON.stringify(item.length));
    return (
      <TouchableOpacity
        onPress={() => _openDetailScreen(item)}
        style={{padding: 0}}>
        <View
          style={{
            padding: 10,
            margin: 15,
            marginTop: 0,
            borderRadius: 10,
            backgroundColor: 'white',
          }}>
          <View style={{flex: 1, flexDirection: 'row'}}>
            {item.show.image ? (
              <Image
                style={{
                  width: 70,
                  height: 70,
                  padding: 10,
                  borderRadius: 5,
                  resizeMode: 'cover',
                  alignSelf: 'center',
                  alignContent: 'center',
                  justifyContent: 'center',
                }}
                resizeMode="contain"
                source={{
                  uri: item.show.image.medium,
                }}
              />
            ) : null}

            <View
              style={{
                flex: 1,
                flexDirection: 'column',
                marginStart: 8,
                justifyContent: 'center',
              }}>
              <Text
                style={{
                  fontSize: 20,
                  alignSelf: 'flex-start',
                  color: 'black',
                }}>
                {item.name}
              </Text>
              <Text
                style={{
                  fontSize: 16,
                  alignSelf: 'flex-start',
                  color: 'black',
                }}>
                {item.name}
              </Text>
              <Text
                style={{
                  fontSize: 16,
                  alignSelf: 'flex-start',
                  color: 'green',
                }}>
                {item.type}
              </Text>
            </View>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      {_renderToolbar()}
      <View style={{flex: 1, margin: 15, borderRadius: 10}}>
        <View style={{flexDirection: 'row'}}>
          <TextInput
            style={{
              padding: 10,
              marginStart: 13,
              marginEnd: 13,
              height: 40,
              width: '72%',
              backgroundColor: '#E0E0E0',
              fontSize: 20,
              marginBottom: 10,
              borderRadius: 8,
              borderColor: 'black',
              borderWidth: 1,
            }}
            placeholder="Search Show Name "
            onChangeText={(searchTvShowString) =>
              setSearchTvShowString(searchTvShowString)
            }
          />
          <TouchableOpacity
            onPress={() => _onSearchButtonClick()}
            style={{padding: 0}}>
            <Image
              style={{
                width: 50,
                height: 40,
                resizeMode: 'cover',
              }}
              resizeMode="contain"
              source={require('../assets/images/ic_search.png')}
            />
          </TouchableOpacity>
        </View>

        <FlatList
          style={{marginBottom: 10}}
          data={tvShowListArray}
          renderItem={({item, index}) => (
            <TouchableOpacity
              onPress={() => _openDetailScreen(item)}
              style={{padding: 0}}>
              <View
                style={{
                  padding: 10,
                  margin: 15,
                  marginTop: 0,
                  borderRadius: 10,
                  backgroundColor: 'white',
                }}>
                <View style={{flex: 1, flexDirection: 'row'}}>
                  {item.show.image ? (
                    <Image
                      style={{
                        width: 70,
                        height: 70,
                        padding: 10,
                        borderRadius: 5,
                        resizeMode: 'cover',
                        alignSelf: 'center',
                        alignContent: 'center',
                        justifyContent: 'center',
                      }}
                      resizeMode="contain"
                      source={{
                        uri: item.show.image.medium,
                      }}
                    />
                  ) : null}

                  <View
                    style={{
                      flex: 1,
                      flexDirection: 'column',
                      marginStart: 8,
                      justifyContent: 'center',
                    }}>
                    <Text
                      numberOfLines={1}
                      style={{
                        fontSize: 20,
                        alignSelf: 'flex-start',
                        color: 'black',
                      }}>
                      {item.name}
                    </Text>
                    <Text
                      style={{
                        fontSize: 16,
                        alignSelf: 'flex-start',
                        color: 'black',
                      }}>
                      {item.name}
                    </Text>
                    <Text
                      style={{
                        fontSize: 16,
                        alignSelf: 'flex-start',
                        color: 'green',
                      }}>
                      {item.type}
                    </Text>
                  </View>
                </View>
              </View>
            </TouchableOpacity>
          )}
          keyExtractor={(item) => item.key}
        />
      </View>
    </View>
  );
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
