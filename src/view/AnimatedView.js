/**
 *@author IT姑凉
 */
import React , { Component } from 'react';
import {
	Text,
	View,
	StyleSheet
} from 'react-native';
import HeaderBar from '../components/HeaderBar';
import FadeInView from '../components/AnimatedFadeInView';

export default class AnimatedView extends Component {
  static navigationOptions = {
    title: 'Animated demo'
  };
  render() {
    return (
      <View>
        <FadeInView style={{width: 250, height: 50, backgroundColor: 'powderblue'}}>
	      <Text style={{fontSize: 28, textAlign: 'center', margin: 10}}>Fading in</Text>
	    </FadeInView>
      </View>
    );
  }
}