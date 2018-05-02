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
        
      </View>
    );
  }
}
