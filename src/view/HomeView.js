/**
 *@author IT姑凉
 */
import React , { Component } from 'react';
import {Text,View,StyleSheet,Button,Alert} from 'react-native';
import HeaderBar from '../components/HeaderBar';

export default class HomeView extends Component {
  static navigationOptions = {
    title: '首页'
  };

  audioAction() {
        let { goBack, navigate } = this.props.navigation;
        navigate( 'AudioView' );
  }

  videoAction() {
        let { goBack, navigate } = this.props.navigation;
        navigate( 'VideoView' );
  }

  animatedAction() {
        let { goBack, navigate } = this.props.navigation;
        navigate( 'AnimatedView' );
  }

  counterAction() {
        let { goBack, navigate } = this.props.navigation;
        navigate( 'CounterView' );
  }

  timerAction() {
        let { goBack, navigate } = this.props.navigation;
        navigate( 'TimerView' );
  }
  
  render() {
    const { navigate } = this.props.navigation;
    return (
      <View>

        <Button
          onPress={() => this.audioAction()}
          title="audio demo"
          accessibilityLabel="See an informative alert"
        />

        <Button
          onPress={() => this.videoAction()}
          title="video demo"
          accessibilityLabel="See an informative alert"
        />

        <Button
            onPress={() => this.animatedAction()}
            title="Animated demo"
            accessibilityLabel="See an informative alert"
          />

        <Button
            onPress={() => this.counterAction()}
            title="redux counter demo"
          />

        <Button
            onPress={() => this.timerAction()}
            title="redux-saga timer demo"
          />
        
      </View>
    );
  }
}
