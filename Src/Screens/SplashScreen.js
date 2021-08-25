import React ,{Component, createRef} from "react";
import {View ,ScrollView , Text , TextInput , StyleSheet , Button , Dimensions , Image, TouchableOpacity, KeyboardAvoidingView ,Keyboard, ActivityIndicator } from 'react-native'
import auth from '@react-native-firebase/auth'
import SplashScreenImg from '../Assets/Images/Fire_SplashScreen.jpg'

export default class Login extends React.Component{
  constructor(props){
    super(props);
    this.subscriber=''
  }
  static navigationOptions={
        headerShown :false
  }
  
    componentDidMount() {
       
       this.auth()
        
        
    }
    auth=()=>{
        setTimeout(() => {
            this.subscriber= auth().onAuthStateChanged(this.onAuthStateChanged);
            
         }, 1000);
    }
    
    onAuthStateChanged = (user) => {
        if(user){
          this.props.navigation.navigate( 'HomeSreen')
        }
        else 
       { this.props.navigation.navigate('Login' )}
           
        
    }
    componentWillUnmount(){
        this.subscriber();
    }


  render() {
    return (
      <View>
            <Image source={SplashScreenImg} style={{height:'100%' ,width:"100%"}}/>
      </View>
    )
  }
}

