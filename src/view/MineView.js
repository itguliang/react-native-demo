/**
 *@author IT姑凉
 */
// import React , { Component } from 'react';
// import { Image } from 'react-native';

// export default class MineView extends Component {
//   render() {
//     let pic = {
//       uri: 'https://upload.wikimedia.org/wikipedia/commons/d/de/Bananavarieties.jpg'
//     };
//     return (
//       <Image source={pic} style={{width: 193, height: 110}} />
//     );
//   }
// }
import React , { Component } from 'react';
import {Text,View,StyleSheet} from 'react-native';

export default class MineView extends Component {
  render() {
    return (
      <View>
        <Text>我的</Text>
      </View>
    );
  }
}