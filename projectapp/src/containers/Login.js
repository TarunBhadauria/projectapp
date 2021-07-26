import React, { Component } from 'react';

import { Alert, AsyncStorage, Dimensions, Image, ImageBackground, Modal, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
// import { Dimensions } from 'react-native';
import Toast from 'react-native-simple-toast';
import Ionicons from 'react-native-vector-icons/Ionicons'
const { width, height } = Dimensions.get('screen')
class Login extends Component {
    constructor(props) {
        super(props)
        this.state = {
            email: '',
            password: '',
            showAnimation: false,
            loggedIn: false,
            modalVisible: false
        }
    }
    validation = async () => {
        if (this.state.email == '') {
            Toast.show('email Number Cant Be Empty');
        }
        else {
             if (this.state.password === '') {
                Toast.show('Invalid Password')
            }
            else {
                var user = JSON.parse(await AsyncStorage.getItem('users'))
                if (user) {
                    var data = user.find(e => (e.email == this.state.email && e.password == this.state.password))
                    if (data) {
                        AsyncStorage.setItem('loggedinuser', JSON.stringify(data))
                        this.props.navigation.navigate('Profile', { data });

                    }
                    else {
                        Toast.show('Enter Valid UserId And Password')
                    }

                } else {
                    Toast.show('Enter Valid UserId And Password')
                }
            }
        }
    }

    render() {

        return (
            <ScrollView >
                <ImageBackground source={{ uri: "https://images.pexels.com/photos/6580673/pexels-photo-6580673.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940" }} style={{ width: width, height: height }} resizeMode='stretch' >
                    <View style={{ display: 'flex', flexDirection: 'column' }}>
                        <Text style={{ textAlign: 'center', fontSize: 25, color: 'white', margin: '10%' }}>Login</Text>
                        <View style={{ backgroundColor: 'white', width: '20%', borderRadius: 50, alignSelf: 'center', margin: '10%' }}>
                            <Ionicons name={this.state.showAnimation ? 'lock-open-sharp' : 'lock-closed-sharp'} size={40} style={{ color: 'green', padding: 15, textAlign: 'center' }} />
                        </View>
                        <TextInput style={{ color: 'white', margin: '5%', textAlign: 'center', borderBottomWidth: 1, borderBottomColor: 'white' }}
                            onChangeText={(email) => { this.setState({ email: email }) }}
                            maxLength={40}
                            placeholder='Email'
                            value={this.state.email}

                        />
                        <TextInput style={{ color: 'white', margin: '5%', textAlign: 'center', borderBottomWidth: 1, borderBottomColor: 'white' }}
                            onChangeText={(password) => { this.setState({ password: password }) }}

                            placeholder='Password'
                            value={this.state.password}
                            secureTextEntry={true}
                        />
                        <TouchableOpacity style={{ backgroundColor: 'white', padding: 10, borderRadius: 40, alignSelf: 'center', margin: '5%' }}>
                            <Text style={{ color: 'green', fontSize: 20, textAlign: 'center' }} onPress={() => { this.validation() }}>Login</Text>
                        </TouchableOpacity>
                        <View style={{ justifyContent: 'space-between', flexDirection: 'row', margin: "4%" }}>
                            <Text style={{ color: 'green', fontSize: 10, color: 'white' }}>Dont Have Account ?</Text>
                            <Text style={{ color: 'green', fontSize: 15, color: 'white' }} onPress={() => { this.props.navigation.push('Signup') }}>Signup</Text>
                        </View>
                    </View>

                </ImageBackground>
            </ScrollView>

        )
    }
}
export default Login;
