/**
 *@author IT姑凉
 */
import React , { Component } from 'react';
import {Text,View,StyleSheet} from 'react-native';
import HeaderBar from '../components/HeaderBar';

export default class LiveView extends Component {
  render() {
    return (
      <View>
      	<HeaderBar  title="直播"/>
        <Text>直播</Text>
      </View>
    );
  }
}