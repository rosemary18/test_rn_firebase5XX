import React, { Component } from 'react'
import { Text, View, AsyncStorage, TouchableOpacity, SafeAreaView } from 'react-native'
import firebase from 'react-native-firebase';
import {StackNavigator, NavigationActions} from 'react-navigation'
import s1 from './src/screens/s1';
import s2 from './src/screens/s2';
import NavigationService from './NavigationService'

export const CreateStack = StackNavigator({
  screen1: {
    screen: s1
  },
  screen2: {
    screen: s2
  }
});

export class App extends Component {
  constructor(props) {
    super(props)
  
    this.state = {
       
    }
  }

  async getToken() {
    // console.warn("Start generating token ...")
    let fcmToken = await AsyncStorage.getItem('fcmToken');
    if (!fcmToken) {
      firebase.messaging().getToken().then(async function(fcmToken){
        // console.warn("FCM token : ", fcmToken)
        await AsyncStorage.setItem('fcmToken', fcmToken);
      }).catch(err => console.warn(err))
    }
  }
  
  async checkPermission() {
    // console.warn("Checking permission")
    const enabled = await firebase.messaging().hasPermission();
    if (enabled) {
      // console.warn("granted")
        this.getToken();
    } else {
      // console.warn("not granted")
        this.requestPermission();
    }
  }

  async createNotificationListeners() {
    // console.warn("start notification receiver ...")
    firebase.notifications().onNotification(notification => {
        // console.warn("New notification received");
        // console.warn("Notification data : ", notification.body);

        const localNotification = new firebase.notifications.Notification({
          sound: 'default',
          show_in_foreground: true
        }).setNotificationId(notification.notificationId)
          .setTitle(notification.title)
          .setBody(notification.body)
          .setData(notification.data)
          .setSound('default')
          .android.setChannelId('insider')
          .android.setAutoCancel(true)
          .android.setPriority(firebase.notifications.Android.Priority.High);
        firebase.notifications().displayNotification(localNotification)
    });
  }

  async onOpenedNotification() {
    firebase.notifications().getInitialNotification().then((Notification) => {
      if(Notification){
        console.warn("Notification opened with closed app, and redirect to detail screen.")
        NavigationService.navigate(Notification.notification.data.type, {})
      }
    })
  }

  async onOpenedNotificationForeGroundAndBackGround(){
    firebase.notifications().onNotificationOpened((Notification) => {
      if(Notification){
        console.warn("Notification opened from foreground or background, and redirect to detail screen.")
        NavigationService.navigate(Notification.notification.data.type, {})
      }
    })
  }



  async componentDidMount() {
    const channel = new firebase.notifications.Android.Channel('insider', 'insider channel', firebase.notifications.Android.Importance.Max)
    firebase.notifications().android.createChannel(channel);
    await this.checkPermission();
    await this.createNotificationListeners();
    await this.onOpenedNotification()
    await this.onOpenedNotificationForeGroundAndBackGround();
  }

  render() {
    return (
      <View style={{flex: 1}}>
        <SafeAreaView style={{flex: 1}}>
          <CreateStack ref={navigatorRef => {
            NavigationService.setTopLevelNavigator(navigatorRef);
          }} />
        </SafeAreaView>
      </View>
    )
  }
}

export default App
