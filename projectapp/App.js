import { NavigationContainer } from '@react-navigation/native';
import React, { Component, useEffect } from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import {
  Text,
  View
} from 'react-native';
import Login from './src/containers/Login';
import Signup from './src/Signup';
import Profile from './src/containers/Profile';
const Stack = createStackNavigator();
class App extends Component{
constructor(props){
  super(props)
}
render(){
  return(
    <NavigationContainer>
    <Stack.Navigator screenOptions={{headerShown:false}} initialRouteName="Signup">
      <Stack.Screen
        name="Login"
        component={Login}
       
      />
      <Stack.Screen
        name="Signup"
        component={Signup}
       
      />
      <Stack.Screen
        name="Profile"
        component={Profile}
       
      />
      {/* <Stack.Screen name="Profile" component={ProfileScreen} /> */}
    </Stack.Navigator>
  </NavigationContainer>
  )
}
}

export default App;
