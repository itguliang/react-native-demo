/**
 *@author IT姑凉
 */
import React , { Component } from 'react';
import {Text,View,StyleSheet} from 'react-native';
import HeaderBar from '../components/HeaderBar';

export default class FindView extends Component {
  render() {
    return (
      <View>
        <HeaderBar  title="发现"/>
        <Text>发现</Text>
      </View>
    );
  }
}