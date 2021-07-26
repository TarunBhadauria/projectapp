import React, { Component, } from 'react';
import { AsyncStorage, Dimensions, Image, ImageBackground, ScrollView, Text, TextInput, View } from "react-native";
import { TouchableOpacity } from 'react-native-gesture-handler';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { LoginActions } from '../actions';
import Toast from 'react-native-simple-toast';
const { width, height } = Dimensions.get('screen');
var arr = []
class Signup extends Component {
    constructor(props) {
        super(props);
        this.state = {

            email: '',
            name: '',
            password: '',

        }
    }

   async componentWillMount(){
        var data = JSON.parse(await AsyncStorage.getItem('loggedinuser'))
        if(data){
            this.props.navigation.navigate('Profile', { data });
        }
    }

    validation = async () => {
        if (this.state.email == '') {
            Toast.show('Email Number Cant Be Empty');
        }
        else if (this.state.name == '') {
            Toast.show('Name  Cant Be Empty');
        }
        else {
             if (this.state.password == '') {
                Toast.show('Invalid Password')
            }
            else {

                var user = JSON.parse(await AsyncStorage.getItem('users'))
                if (user === null) {
                    var arr = []
                    arr.push({ name: this.state.name, email: this.state.email, password: this.state.password })
                    AsyncStorage.setItem('users', JSON.stringify(arr));
                    console.log('null', arr)
                }
                else {
                    user.push({ name: this.state.name, email: this.state.email, password: this.state.password })
                    AsyncStorage.setItem('users', JSON.stringify(user))
                }

                this.props.navigation.navigate('Login');

            }
        }
    }

    render() {
        return (
            <ScrollView horizontal={true}>
                <ImageBackground source={{ uri: "https://images.pexels.com/photos/6580673/pexels-photo-6580673.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940" }} style={{ width: width, height: height }} resizeMode='stretch' >
                    <View style={{ display: 'flex', flexDirection: 'column' }}>
                        <Text style={{ textAlign: 'center', fontSize: 25, color: 'white', margin: '10%' }}>Sign up</Text>
                        <View style={{ backgroundColor: 'white', width: '20%', borderRadius: 50, alignSelf: 'center', margin: '10%' }}>
                            <Ionicons name='create-sharp' size={40} style={{ color: 'green', padding: 15, textAlign: 'center' }} />
                        </View>
                        <TextInput style={{ color: 'white', margin: '5%', textAlign: 'center', borderBottomWidth: 1, borderBottomColor: 'white' }}
                            editable
                            maxLength={40}
                            placeholder='Email Id'
                            onChangeText={(email) => { this.setState({ email: email }) }}

                        />
                        <TextInput style={{ color: 'white', margin: '5%', textAlign: 'center', borderBottomWidth: 1, borderBottomColor: 'white' }}
                            editable
                            maxLength={40}
                            placeholder='Name'
                            onChangeText={(name) => { this.setState({ name: name }) }}
                        />
                        <TextInput style={{ color: 'white', margin: '5%', textAlign: 'center', borderBottomWidth: 1, borderBottomColor: 'white' }}
                            editable
                            maxLength={40}
                            placeholder='Set Password '
                            onChangeText={(password) => { this.setState({ password: password }) }}
                            secureTextEntry={true}
                        />
                        <TouchableOpacity style={{ backgroundColor: 'white', padding: 10, borderRadius: 40, alignSelf: 'center', margin: '10%' }}>
                            <Text style={{ color: 'green', fontSize: 20, textAlign: 'center' }} onPress={() => { this.validation() }}>Sign up</Text>
                        </TouchableOpacity>
                        <View style={{ justifyContent: 'space-between', flexDirection: 'row', margin: "4%" }}>
                            <Text style={{ color: 'green', fontSize: 10, color: 'white' }}>Already Have Account ?</Text>
                            <Text style={{ color: 'green', fontSize: 15, color: 'white' }} onPress={() => { this.props.navigation.navigate('Login') }}>Login</Text>
                        </View>
                    </View>

                </ImageBackground>


            </ScrollView>
        );
    }
}

export default Signup;