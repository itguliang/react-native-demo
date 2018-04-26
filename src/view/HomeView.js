/**
 *@author IT姑凉
 */
import React , { Component } from 'react';
import {Text,View,StyleSheet} from 'react-native';

class BlinkComponent extends Component{
	constructor(props){
		super(props);
		this.state={showText:true};

		// 每1000毫秒对showText状态做一次取反操作
	    setInterval(() => {
	      this.setState(previousState => {
	        return { showText: !previousState.showText };
	      });
	    }, 1000);
    }

    render(){
    	// 根据当前showText的值决定是否显示text内容
	    let display = this.state.showText ? this.props.text : ' ';
	    return (
	      <Text style={styles.red}>{display}</Text>
	    );
    }
}



export default class HomeView extends Component {
  render() {
    return (
      <View>
        <BlinkComponent text='I love to blink'/>
        <BlinkComponent text='Yes blinking is so great' />
        <BlinkComponent text='Why did they ever take this out of HTML' />
        <BlinkComponent text='Look at me look at me look at me' />
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