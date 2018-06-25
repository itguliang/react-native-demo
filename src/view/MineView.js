/**
 *@author IT姑凉
 */
import React , { Component } from 'react';
import {
	Button,
	Text,
	View,
	StyleSheet
} from 'react-native';
import HeaderBar from '../components/HeaderBar';

export default class MineView extends Component {
	animatedAction() {
        let { goBack, navigate } = this.props.navigation;
        navigate( 'AnimatedView' );
  	}
	render() {
	    return (
	      <View>
	      	<HeaderBar  title="我的"/>
	      </View>
	    );
	 }
}