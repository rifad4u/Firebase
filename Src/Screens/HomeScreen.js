import React, {Component} from 'react'
import {View , Text, Button, ToastAndroid} from 'react-native'
import auth from '@react-native-firebase/auth'
import firestore from '@react-native-firebase/firestore';

export default class HomeScreen extends React.Component{
    constructor(props){
        super(props);
        this. state={
            user:''
        }
        this.subscriber=''
    }

    componentDidMount(){
        this.subscriber= auth().onAuthStateChanged(this.onAuthStateChanged);
    }
    onAuthStateChanged = (user) => {
        if(user){
          this.setState({user:user})
        }
        
           
        
    }
    componentWillUnmount(){
        this.subscriber();
    }
    


    logout=()=>{

        auth().signOut().then(() => console.log('User signed out!') ,
         this.props.navigation.navigate('Login'))
         

    }
    getdetails=async()=>{
       await firestore().collection('UserData')
       .get().then(obj=>{
          obj.forEach(val => {
              console.log(val.data())
          });
      
      
    })}
    
 

    

    render(){
        return(
            <View style={{justifyContent :'center', alignItems:'center' , flex:1}}>

                    <Text>Welcome {this.state.user.email}</Text>
                    <Button onPress={this.logout} title="Logout"/>
                    <Button onPress={this.getdetails} title="details"/>

            </View>
           


        )
    }
}