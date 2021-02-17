import React, {useState, useEffect} from 'react';
import {View, StyleSheet, Text} from 'react-native';
import {Actions} from 'react-native-router-flux';

export default function SplashScreen() {
  const [isSaveData, setIsSave] = useState('');

  useEffect(() => {
    setTimeout(() => {
     
      readData
      if(isSaveData==true){
         Actions.push('RestorantiListScreen');
      }else{
        Actions.push('IntroSlider');
      }
    }, 1000);
  }, []);

  return (
    <View style={styles.viewStyle}>
      <View
        style={{
          flex: 1,
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: 'white',
        }}>
        <Text style={{fontWeight: '900', fontSize: 20}}>Restaurant List</Text>
      </View>
    </View>
  );
}

const readData = async () => {
  try {
    const isSave = await AsyncStorage.getb('isSave');
    setIsSave(isSave);
  } catch (e) {
    alert('Failed to fetch the data from storage');
  }
};

const styles = StyleSheet.create({
  viewStyle: {
    flex: 1,
    alignItems: 'stretch',
    flexDirection: 'column',
    backgroundColor: 'white',
  },
  txtLogin: {
    fontSize: 16,
    padding: 10,
    margin: 10,
    alignSelf: 'flex-start',
    color: 'black',
  },
});
