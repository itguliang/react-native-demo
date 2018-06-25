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

import { increase, decrease, reset } from '../actions/counterAction';

class CounterView extends Component {
  static navigationOptions = {
    title: 'Counter demo'
  };
  _onPressReset() {
    this.props.dispatch(reset());
  }

  _onPressInc() {
    this.props.dispatch(increase());
  }

  _onPressDec() {
    this.props.dispatch(decrease());
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.counter}>{this.props.counter.count}</Text>
        <TouchableOpacity style={styles.reset} onPress={()=>this._onPressReset()}>
          <Text>归零</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.start} onPress={()=>this._onPressInc()}>
          <Text>加1</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.stop} onPress={()=>this._onPressDec()}>
          <Text>减1</Text>
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
    counter: state.counter
})

export default connect(mapStateToProps)(CounterView);
