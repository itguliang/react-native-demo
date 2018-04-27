/**
 *@author IT姑凉
 */
import React , { Component } from 'react';

// Dimensions 用于获取设备屏幕的宽高。
import {Image,Text,View,StyleSheet,Slider,TouchableOpacity,Dimensions} from 'react-native';

import HeaderBar from '../components/HeaderBar';

import Video from 'react-native-video';

const screenWidth = Dimensions.get('window').width;

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
      showVideoControl: false, // 是否显示视频控制组件
      isPlaying: false,        // 视频是否正在播放
      isEnd:false,
      currentTime: 0,        // 视频当前播放的时间
      duration: 0,           // 视频的总时长
      isFullScreen: false,     // 当前是否全屏显示
    };
  }

  onLoadStart() {
    console.log('视频开始加载');
  }
  onBuffering() {
    console.log('视频缓冲中...')
  }
  onLoaded(data) {
    console.log('视频加载完成');
    this.setState({
      duration: data.duration,
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

  onPlayEnd() {
    console.log('视频播放结束');
    this.setState({
      isPlaying: false,
      isEnd: true,
    });
  }

  onPlayError() {
    console.log('视频播放失败');
    this.setState({
      isPlaying: false,
      isEnd: true,
    });
  }

  onPressPlayButton() {
    let isPlay = !this.state.isPlaying;
    this.setState({
      isPlaying: isPlay
    })
  }
  
  onControlPlayPress() {
    if(this.state.isEnd){
      this.player.seek(0);
    }
    this.setState({
      isEnd:false,
    })
    this.onPressPlayButton();
  }

  /// 进度条值改变
  onSliderValueChanged(currentTime) {
    this.player.seek(currentTime);
    this.setState({
      currentTime: currentTime
    })
  }
  
  render() {
    return (
      <View style={styles.container}>
        <View style={{ width: this.state.videoWidth, height: this.state.videoHeight }}>
          <Video
             ref={(ref) => this.player = ref}
             source={require('../video.mp4')}
             //source={require('./music.mp3')} // 可以播放音频

             // uri to an image to display until the video plays
             poster=""
             
             rate={this.state.isPlaying?1:0}                     // 控制暂停/播放，0 代表暂停paused, 1代表播放normal.
             volume={1.0}                   // 声音的放声音的放大倍数大倍数，0 为静音  ，1 为正常音量 ，更大的数字表示放大的倍数
             muted={false}                  // true代表静音，默认为false.
             paused={!this.state.isPlaying}                 // true代表暂停，默认为false
             resizeMode="contain"           // 视频的自适应伸缩铺放行为，contain、stretch、cover
             repeat={false} 
             playInBackground={false}       // 当app转到后台运行的时候，播放是否暂停
             playWhenInactive={false}       // [iOS] Video continues to play when control or notification center are shown. 仅适用于IOS
             progressUpdateInterval={250.0}          // [iOS] Interval to fire onProgress (default to ~250ms)
             onLoadStart={this.onLoadStart()}   // 当视频开始加载时的回调函数
             onLoad={(data) => { this.onLoaded(data) }}    // 当视频加载完毕时的回调函数
             onProgress={(data) => { this.onProgressChanged(data) }}     //  进度控制，每250ms调用一次，以获取视频播放的进度
             onEnd={() => { this.onPlayEnd() }}            // 当视频播放完毕后的回调函数
             onError={() => { this.onPlayError() }}      // 当视频不能加载，或出错后的回调函数
             onBuffer={() => { this.onBuffering() }}                // Callback when remote video is buffering
             onTimedMetadata={this.onTimedMetadata}  // Callback when the stream receive some metadata
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
