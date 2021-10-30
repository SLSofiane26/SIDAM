import {Component} from 'react';
import {Dimensions, Text, Image, SafeAreaView} from 'react-native';
import React from 'react';
import {connect} from 'react-redux';
import * as ACTIONS from '../User/ACTIONS';
import FondB from '../assets/fond.jpg';

class Logout extends Component {
  constructor(props) {
    super(props);
    this.state = {
      orientation: null,
    };
  }

  w = Dimensions.get('window').width;
  h = Dimensions.get('window').height;

  componentDidMount = () => {
    this.props.handleLogout();
  };

  render() {
    return (
      <SafeAreaView
        style={{
          justifyContent: 'center',
          alignContent: 'center',
          alignItems: 'center',
          flex: 1,
        }}>
        <Image
          source={FondB}
          style={{
            width: Dimensions.get('window').width,
            position: 'absolute',
            height: '100%',
          }}
        />

        <Text
          style={{
            fontFamily: 'Poppins-Regular',
            fontSize: 20,
            color: 'black',
          }}>
          Déconnexion en cours
        </Text>
      </SafeAreaView>
    );
  }
}

let mapDispatchToProps = dispatch => {
  return {
    handleLogout: () => dispatch(ACTIONS.Logout()),
  };
};

export default connect(null, mapDispatchToProps)(Logout);
