import React, { Component } from 'react'
import { Text, View, TouchableOpacity } from 'react-native'
import firebase from 'react-native-firebase'

export class s1 extends Component {

    async testPushNotification(){
        const localNotification = new firebase.notifications.Notification({
          sound: 'default',
          show_in_foreground: true
        }).setNotificationId('holo')
          .setTitle('ini test push di local')
          .setBody('ini body')
          .setData({type: 'screen2'})
          .setSound('default')
          .android.setChannelId('insider')
          .android.setAutoCancel(true)
          .android.setPriority(firebase.notifications.Android.Priority.High);
        firebase.notifications().displayNotification(localNotification)
      }
    render() {
        return (
            <View style={{flex: 1, justifyContent: 'center', alignItems: 'center', backfaceVisibility: 'red'}}>
                <Text> Test FireBase Notifications : Home screen </Text>
                <TouchableOpacity
                    style={{padding: 8, borderRadius: 5, backgroundColor: 'blue', alignItems: 'center', justifyContent: 'center'}}
                    onPress={() => this.props.navigation.navigate("screen2")}
                    >
                    <Text>Pergi ke halaman 2</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={{padding: 8, borderRadius: 5, backgroundColor: 'blue', alignItems: 'center', justifyContent: 'center'}}
                    onPress={this.testPushNotification}
                    >
                    <Text>test push notification local</Text>
                </TouchableOpacity>
            </View>
        )
    }
}

export default s1
