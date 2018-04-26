/**
 *@author IT姑凉
 */
import React , { Component } from 'react';

// Dimensions 用于获取设备屏幕的宽高。
import {Image,Text,View,StyleSheet,Slider,TouchableOpacity,Dimensions} from 'react-native';

import HeaderBar from '../components/HeaderBar';

import Video from 'react-native-video';

const screenWidth = Dimensions.get('window').width;

function formatTime(second) {
  let h = 0, i = 0, s = parseInt(second);
  if (s > 60) {
    i = parseInt(s / 60);
    s = parseInt(s % 60);
  }
  // 补零
  let zero = function (v) {
    return (v >> 0) < 10 ? "0" + v : v;
  };
  return [zero(h), zero(i), zero(s)].join(":");
}

export default class HomeView extends Component {

  static navigationOptions = {
    title: '音视频demo'//对页面的配置
  };

  constructor(props) {
    super(props);
    this.state = {
      videoWidth: screenWidth,
      videoHeight: screenWidth * 9/16, // 默认16：9的宽高比
      showVideoCover: true,    // 是否显示视频封面
      showVideoControl: false, // 是否显示视频控制组件
      isPlaying: false,        // 视频是否正在播放
      currentTime: 0,        // 视频当前播放的时间
      duration: 0,           // 视频的总时长
      isFullScreen: false,     // 当前是否全屏显示
    };
  }

  loadStart() {
    console.log('视频开始加载');
  }

  onLoaded(data) {
    console.log('视频加载完成');
    this.setState({
      duration: data.duration,
    });
  }

  onPlayEnd() {
    console.log('视频播放结束');

    this.player.seek(0);

    this.setState({
      currentTime: 0,
      isPlaying: false,
      showVideoCover: true,
    });
  }

  onProgressChanged(data) {
    console.log('视频进度更新');
    if (this.state.isPlaying) {
      this.setState({
        currentTime: data.currentTime,
      })
    }
  }

  onPressPlayButton() {
    let isPlay = !this.state.isPlaying;
    this.setState({
      isPlaying: isPlay,
      showVideoCover: false
    })
  }
  
  onControlPlayPress() {
    this.onPressPlayButton();
  }
  
  render() {
    return (
      <View style={styles.container}>
        <View style={{ width: this.state.videoWidth, height: this.state.videoHeight }}>
          <Video
             ref={(ref) => this.player = ref}
             source={require('../video.mp4')}
             //source={require('./music.mp3')} // 可以播放音频
             //source={{uri:'http://......'}}
             rate={this.state.isPlaying?1:0}                     // 控制暂停/播放，0 代表暂停paused, 1代表播放normal.
             volume={1.0}                   // 声音的放声音的放大倍数大倍数，0 为静音  ，1 为正常音量 ，更大的数字表示放大的倍数
             muted={false}                  // true代表静音，默认为false.
             paused={!this.state.isPlaying}                 // true代表暂停，默认为false
             resizeMode="contain"           // 视频的自适应伸缩铺放行为，contain、stretch、cover
             playInBackground={false}       // 当app转到后台运行的时候，播放是否暂停
             playWhenInactive={false}       // [iOS] Video continues to play when control or notification center are shown. 仅适用于IOS
             onLoadStart={this.loadStart}   // 当视频开始加载时的回调函数
             onLoad={(data) => { this.onLoaded(data) }}    // 当视频加载完毕时的回调函数
             onProgress={(data) => { this.onProgressChanged(data) }}     //  进度控制，每250ms调用一次，以获取视频播放的进度
             onEnd={() => { this.onPlayEnd() }}            // 当视频播放完毕后的回调函数
             onError={this.videoError}      // 当视频不能加载，或出错后的回调函数
             style={styles.backgroundVideo}
          />
        </View>

        <View style={[styles.control,{ width: this.state.videoWidth}]}>
          <TouchableOpacity activeOpacity={0.3} onPress={() => { this.onControlPlayPress() }}>
            <Image
              style={styles.playControl}
              source={this.state.isPlaying ? require('../images/icon_control_pause.png') : require('../images/icon_control_play.png')}
            />
          </TouchableOpacity>
          <Text style={styles.time}>{formatTime(this.state.currentTime)}</Text>
          <Slider
            style={{flex: 1}}
            maximumTrackTintColor={'#999999'}
            minimumTrackTintColor={'#00c06d'}
            thumbImage={require('../images/icon_control_slider.png')}
            value={this.state.currentTime}
            minimumValue={0}
            maximumValue={this.state.duration}
            onValueChange={(currentTime) => { this.onSliderValueChanged(currentTime) }}
          />
          <Text style={styles.time}>{formatTime(this.state.duration)}</Text>
          <TouchableOpacity activeOpacity={0.3} onPress={() => { this.onControlShrinkPress() }}>
            <Image
              style={styles.shrinkControl}
              source={this.state.isFullScreen ? require('../images/icon_control_shrink_screen.png') : require('../images/icon_control_full_screen.png')}
            />
          </TouchableOpacity>
        </View>

      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  backgroundVideo: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
  },
  control: {
    flexDirection: 'row',
    width:150,
    height: 44,
    alignItems:'center',
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
    position: 'absolute',
    bottom: 0,
    left: 0
  },
  playButton: {
    width: 50,
    height: 50,
  },
  playControl: {
    width: 24,
    height: 24,
    marginLeft: 15,
  },
  shrinkControl: {
    width: 15,
    height: 15,
    marginRight: 15,
  },
  time: {
    fontSize: 12,
    color: 'white',
    marginLeft: 10,
    marginRight: 10
  },
});
