import React from 'react';
import { Dimensions, Image } from 'react-native';
import newFullLogo from '../Assets/Images/logo.square.psd'
import fullLogo from '../Assets/Images/TheCouchLogo.png';
import redCouch from '../Assets/Images/bigRedCouch.png'

export const MainCouchLogo = props => {
  const width = Dimensions.get('screen').width;

  return (
    <>
      {props.full ?
        <Image
          source={props.selectUserScreen ? newFullLogo : fullLogo}
          style={props.selectUserScreen ? {
            width: 175,
            height: 145,
            marginTop: 0,
            marginBottom: 50,
          } : {
              width: '100%',
              height: width / 5.2,
              marginTop: props.marginTop,
              marginBottom: props.marginBottom,
            }}
        />
        :
        <Image
          source={redCouch}
          style={{
            width: 138,
            height: 57,
            marginTop: props.marginTop,
            marginBottom: props.marginBottom,
            alignSelf: 'center',
          }}
        />
      }
    </>
  );
};
