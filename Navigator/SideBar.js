import {DrawerItemList} from '@react-navigation/drawer';
import {DrawerActions} from '@react-navigation/routers';
import React, {useEffect, useState} from 'react';
import {Dimensions, Platform, TouchableOpacity, View} from 'react-native';

let SideBar = ({...props}) => {
  let [orientation, setOrientation] = useState(null);

  let cc = false;

  let w = Dimensions.get('window').width;

  let h = Dimensions.get('window').height;

  let {state, ...rest} = props;
  let newState = {...state};
  newState.routes = newState.routes.filter(
    item => item.name !== 'PasswordModif',
  );

  useEffect(() => {
    if (!cc) {
      if (w < h) {
        setOrientation('PORTRAIT');
      } else {
        setOrientation('LANDSCAPE');
      }
    }
    return () => {
      cc = true;
    };
  }, []);

  useEffect(() => {
    Dimensions.addEventListener('change', ({window: {width, height}}) => {
      if (width < height) {
        setOrientation('PORTRAIT');
      } else {
        setOrientation('LANDSCAPE');
      }
    });
    return () => {
      Dimensions.removeEventListener('change');
    };
  }, []);

  return (
    <TouchableOpacity
      onPress={() =>
        Platform.OS === 'ios'
          ? props.navigation.dispatch(DrawerActions.toggleDrawer())
          : null
      }>
      <View style={{height: '100%'}}>
        <TouchableOpacity
          onPress={() =>
            Platform.OS === 'ios'
              ? props.navigation.dispatch(DrawerActions.toggleDrawer())
              : null
          }
          style={{
            marginTop: orientation === 'PORTRAIT' ? '15%' : '0%',
            marginRight:
              orientation === 'PORTRAIT'
                ? Platform.OS === 'android'
                  ? '8%'
                  : '0%'
                : Platform.OS === 'android'
                ? w > 845 && w < 846
                  ? '12%'
                  : '10%'
                : '5%',
          }}>
          <DrawerItemList
            state={newState}
            {...rest}
            itemStyle={{
              marginLeft: orientation === 'PORTRAIT' ? '10%' : '50%',
            }}
            labelStyle={{
              width: '100%',
              textAlign: 'center',
            }}
          />
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );
};

export default SideBar;
