/**
 *@author IT姑凉
 */
import React , { Component } from 'react';
import {Text,View,StyleSheet,Button,Alert} from 'react-native';
import HeaderBar from '../components/HeaderBar';

export default class HomeView extends Component {
  static navigationOptions = {
    title: '首页'//对页面的配置
  };

  videoAction() {
        let { goBack, navigate } = this.props.navigation;
        navigate( 'VideoView' );
  }
  render() {
    const { navigate } = this.props.navigation;
    return (
      <View>
        <Button
          onPress={(_el) => this.videoAction(_el)}
          title="跳转到video demo"
          accessibilityLabel="See an informative alert"
        />
      </View>
    );
  }
}
const styles = StyleSheet.create({
  bigblue: {
    color: 'blue',
    fontWeight: 'bold',
    fontSize: 30,
  },
  red: {
    color: 'red',
  },
});