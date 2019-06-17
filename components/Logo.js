import React from 'react';
import { View, Text } from 'react-native';
import {
  widthPercentageToDP as wp, 
  heightPercentageToDP as hp
} from 'react-native-responsive-screen';

export default () => {
  return(
    <View style={{
      marginTop: hp('5%'),
      marginLeft: wp('5%'),
      width: '45%',
    }}>
      <Text style={{
        fontSize: wp('11%'),
        fontWeight: 'bold',
        color: '#2f81bc',
        fontFamily: 'Times New Roman'
      }}>
        LEMART
      </Text>
    </View>
  );
}