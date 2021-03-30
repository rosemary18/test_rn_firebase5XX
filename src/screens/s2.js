import React, { Component } from 'react'
import { Text, View, TouchableOpacity } from 'react-native'

export class s2 extends Component {
    render() {
        return (
            <View style={{flex: 1, justifyContent: 'center', alignItems: 'center', backfaceVisibility: 'red'}}>
                <Text> Test FireBase Notifications : Detail screen </Text>
                <TouchableOpacity
                    style={{padding: 8, borderRadius: 5, backgroundColor: 'blue', alignItems: 'center', justifyContent: 'center'}}
                    onPress={() => this.props.navigation.goBack()}
                    >
                    <Text>Pergi ke halaman 1</Text>
                </TouchableOpacity>
             </View>
        )
    }
}

export default s2
