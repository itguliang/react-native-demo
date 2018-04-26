/**
 *@author IT姑凉
 */
import React , { Component } from 'react';
import {Text,View,StyleSheet} from 'react-native';
import HeaderBar from '../components/HeaderBar';

export default class RankView extends Component {
  render() {
    return (
      <View>
      	<HeaderBar  title="排行榜"/>
        <Text>排行榜</Text>
      </View>
    );
  }
}