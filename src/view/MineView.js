/**
 *@author IT姑凉
 */
import React , { Component } from 'react';
import {Text,View,StyleSheet} from 'react-native';
import HeaderBar from '../components/HeaderBar';

export default class MineView extends Component {
  render() {
    return (
      <View>
      	<HeaderBar  title="我的"/>
        <Text>我的</Text>
      </View>
    );
  }
}