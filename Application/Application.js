import React, {Component} from 'react';
import {connect} from 'react-redux';
import {NavigationContainer} from '@react-navigation/native';
import HomeNav from '../Navigator/HomeNav';
import UserNav from '../Navigator/UserNav';
import * as ACTIONS from '../User/ACTIONS';
import {fcmService} from './FCMService';
import {localNotificationService} from './LocalNotificationService';
import {Platform} from 'react-native';

class Application extends Component {
  constructor(props) {
    super(props);
    this.state = {
      token: false,
      admin: false,
    };
  }

  onRegister = token => {
    this.props.handleToken(token);
  };

  onNotification = notify => {
    const options = {
      soundName: 'sound_one.mp3',
      playSound: true,
    };
    localNotificationService.showNotification(
      0,
      Platform.OS === 'android' ? notify.title : notify.notification.title,
      Platform.OS === 'android' ? notify.body : notify.notification.body,
      notify,
      options,
    );
  };

  onOpenNotification = notify => {
    console.log(notify);
  };

  componentDidMount = async props => {
    fcmService.registerAppWithFCM();
    fcmService.register(this.onRegister, this.onNotification);
    localNotificationService.configure(this.onOpenNotification);
    this.props.handleLogin();
    if (this.props.admin || this.props.token) {
      this.setState(prevState => ({
        ...this.state,
        admin: this.props.admin,
        token: this.props.token,
      }));
    }
  };

  componentDidUpdate = (prevProps, prevState) => {
    if (
      this.props.admin !== prevProps.admin ||
      this.props.token !== prevProps.token
    ) {
      this.setState(prevState => ({
        ...this.state,
        admin: this.props.admin,
        token: this.props.token,
      }));
    }
  };

  componentWillUnmount = () => {
    fcmService.unRegister();
    localNotificationService.unregister();
  };

  render() {
    let config = {
      screens: {
        Connexion: {
          path: 'connexion',
        },
        PasswordModif: {
          path: 'ModificationPass/:id',
          parse: {
            id: id => `user-${id}`,
          },
        },
        Reglement: {
          path: 'reglement',
        },
      },
    };

    let linking = {
      prefixes: ['sidam://sidamApp'],
      config,
    };

    return (
      <NavigationContainer linking={linking}>
        {!this.state.token && !this.state.admin ? <HomeNav /> : <UserNav />}
      </NavigationContainer>
    );
  }
}

let mapDispatchToProps = dispatch => {
  return {
    handleToken: token => dispatch({type: 'TOKEN', payload: {token: token}}),
    handleLogin: () => dispatch(ACTIONS.CheikAuth()),
  };
};

let mapStateToProps = state => {
  return {
    token: state.token,
    admin: state.admin,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Application);
