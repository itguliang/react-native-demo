/**
 *@author IT姑凉
 */
import React , { Component } from 'react';
import {
	Text,
	View,
	StyleSheet,
  TouchableOpacity,
} from 'react-native';
import { connect } from 'react-redux';
import HeaderBar from '../components/HeaderBar';

import { reset, start, stop } from '../actions/timerAction';

class TimerView extends Component {
  static navigationOptions = {
    title: 'Timer demo'
  };
  _onPressReset() {
    this.props.dispatch(reset());
  }

  _onPressInc() {
    this.props.dispatch(start());
  }

  _onPressDec() {
    this.props.dispatch(stop());
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.counter}>{this.props.timer.seconds}</Text>
        <TouchableOpacity style={styles.reset} onPress={()=>this._onPressReset()}>
          <Text>重置</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.start} onPress={()=>this._onPressInc()}>
          <Text>开始</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.stop} onPress={()=>this._onPressDec()}>
          <Text>停止</Text>
        </TouchableOpacity>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'flex-start'
  },
  counter: {
    marginTop:40,
    color:'blue',
    fontSize:30,
  },
  reset: {
    marginTop:20,
    backgroundColor: 'yellow',
  },
  start: {
    marginTop:20,
    backgroundColor: 'yellow',
  },
  stop: {
    marginTop:20,
    backgroundColor: 'yellow',
  },
})
const mapStateToProps = state => ({
    timer: state.timer
})

export default connect(mapStateToProps)(TimerView);
