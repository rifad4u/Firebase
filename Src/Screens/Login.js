import React ,{Component, createRef} from "react";
import {View ,ScrollView , Text , TextInput , StyleSheet , Button , Dimensions , Image, TouchableOpacity, KeyboardAvoidingView ,Keyboard, ActivityIndicator } from 'react-native'
import auth from '@react-native-firebase/auth'
import Hills from '../Assets/Images/Hills.jpg'
import Icon from 'react-native-vector-icons/FontAwesome';


export default class Login extends React.Component{
  constructor(props){
    super(props);
    this.state= {
      Email :'',
      Password :'',
      secureTextEntry: true,
      InValidEmail:false,
      EmailText:'',
      InValidPass:false,
      LoginError:false,
      LoginErrorText:'',
      Loading:false
    }
    this.Emailref=createRef()
    this.Passwordref=createRef()
  }
  static navigationOptions={
        headerShown :false
  }

  handleLogin=()=>{

    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if(this.state.Email==''|| this.state.Email ==null){
      this.setState({EmailText:"Please Enter a Valid Email", InValidEmail:true})
      if(this.state.Password==null || this.state.Password==''){
        this.setState({InValidPass :true , PassText :'Please Enter Your Password'})
      }
      else if(this.state.Password !==null || this.state.Password !==''){
        this.setState({InValidPass :false })
      }
      return ;
    }
    
    if(re.test(String(this.state.Email).toLowerCase())){
          this.setState({InValidEmail:false})
          if(this.state.Password==null || this.state.Password==''){
            this.setState({InValidPass :true , PassText :'Please Enter Your Password'})
          }
          else{
            this.setState({Loading:true})
            this.setState({InValidPass:false})
            this.handleFirebase()
          }  
         
    }
    else{
      this.setState({EmailText:"Email id is not correctly formatted" , InValidEmail:true})
      if(this.state.Password==null || this.state.Password==''){
        this.setState({InValidPass :true , PassText :'Please Enter Your Password'})
        return ;
      }
      else{
        this.setState({InValidPass :false})
      }
    }
    
  }
  
  handleFirebase=()=>{
    
      auth().signInWithEmailAndPassword(this.state.Email , this.state.Password)
      .then((val)=>{
        console.log(val)
        // const update = {
        //   displayName: 'Rifadh',
        //   photoURL: 'https://my-cdn.com/assets/user/123.png',
        // };
        
        //   auth().currentUser.updateProfile(update).then(obj=>{
          this.setState({Loading:false , LoginError :false})
          this.props.navigation.navigate('HomeSreen')
        //  })
        
        
      })
      .catch((e)=>{
        this.setState({Loading:false})
        console.log(e.code);
        if(e.code =='auth/user-not-found'){
          this.setState({LoginError:true , LoginErrorText: 'User Not Found' })
        }
        else if(e.code == 'auth/wrong-password'){
          this.setState({InValidPass :true , PassText :'Incorrect Password' , LoginError: false})
        }
        else if(e.code == 'auth/too-many-requests'){
          this.setState({LoginError :true , LoginErrorText :'Please try again later' })
        }
      })}
  


  render() {
    return (
      <ScrollView keyboardShouldPersistTaps='handled' contentContainerStyle={{ flexGrow: 1 }}>
        <View style={styles.CONTAINER}>

          <Image
            source={Hills}
            style={styles.LOGIN_IMAGE}
          />
          <View style={styles.WELCOME_TEXT_CONTAINER}>
            <Text style={styles.WELCOME_TEXT}> Welcome </Text>
          </View>
          <View style={styles.LOGIN_CONTAINER}>
            <View style={styles.LOGIN_INSIDETOP_CONTAINER}>
              <Text style={styles.LOGIN_TEXT}>LOGIN</Text>
              <TouchableOpacity activeOpacity={.8} onPress={() => this.props.navigation.navigate('Signup')}>
                <Text style={styles.SIGNUP_TEXT}>SIGN UP</Text>
              </TouchableOpacity>

            </View>
            <View style={styles.TEXTINPUT_CONTAINER}>
              <Icon name={"user"} size={20} />
              <TextInput
                onChangeText={(text) => this.setState({ Email: text })}
                placeholder="E-mail"
                returnKeyType='next'
                keyboardType='email-address'
                ref={this.Emailref}
                onSubmitEditing={() =>
                  this.Passwordref.current &&
                  this.Passwordref.current.focus()
                }
                style={{ paddingLeft: 10, width: '100%' }}
              />
            </View>
            {this.state.InValidEmail ? <Text style={[styles.ERROR_TEXT, { marginLeft: 20 }]}>{this.state.EmailText}</Text> : <Text></Text>}
            <View style={styles.TEXTINPUT_CONTAINER}>
              <Icon name={"lock"} size={20} />
              <TextInput
                placeholder="Password"
                ref={this.Passwordref}
                onChangeText={(text) => this.setState({ Password: text })}
                onSubmitEditing={() => Keyboard.dismiss}
                secureTextEntry={this.state.secureTextEntry}
                style={{ paddingLeft: 10, width: '85%' }}
              />
              <Icon name={"eye"} size={20} onPress={() => this.setState({ secureTextEntry: !this.state.secureTextEntry })} />
            </View>
            {this.state.InValidPass ? <Text style={[styles.ERROR_TEXT, { marginLeft: 20 }]}>{this.state.PassText}</Text> : <Text></Text>}
            <TouchableOpacity activeOpacity={.7}>
              <Text style={styles.FOR_PASS}>Forget Password ?</Text>
            </TouchableOpacity>
            {this.state.LoginError ? <Text style={[styles.ERROR_TEXT, { alignSelf: 'center' }]}>{this.state.LoginErrorText}</Text> : <Text></Text>}
            <TouchableOpacity style={styles.BUTTON} activeOpacity={.7} onPress={this.handleLogin}>
              <Text style={styles.LOGIN_BUTTON_TEXT}>LOGIN</Text>
            </TouchableOpacity>
          </View>
          {this.state.Loading && <ActivityIndicator style={{ position: "absolute", top: '50%' }} size='large' color='blue' />}
          <View style={styles.BOTTOM_CONTAINER}>
            <Text style={{ color: '#ffffff', fontFamily: 'Oswald-Medium' }}>Or Login With</Text>
            <View style={{ flexDirection: "row" }}>
              <TouchableOpacity activeOpacity={.8} style={[styles.BOTTOM_BUTTONS, { backgroundColor: '#0060A9', flexDirection: 'row' }]}>
                <Icon
                  name='facebook-f' size={15} color="white" />
                <Text style={{ color: '#ffffff', fontWeight: 'bold', paddingLeft: 5 }}>Facebook</Text>
              </TouchableOpacity>
              <TouchableOpacity activeOpacity={.8} style={[styles.BOTTOM_BUTTONS, { backgroundColor: '#EA4335', flexDirection: 'row' }]}>
                <Icon
                  name='google' size={15} color="white" />
                <Text style={{ color: '#ffffff', fontWeight: 'bold', paddingLeft: 5 }}>Gmail</Text>
              </TouchableOpacity>

            </View>
          </View>


        </View>
      </ScrollView>
    )
  }
}

const styles=StyleSheet.create({
  CONTAINER:
  {
    // justifyContent:"center",
    flex :1 ,
    alignItems : "center" ,
    backgroundColor : "#000000"
  },
  LOGIN_IMAGE:
  {
    height :200 ,
    width : '100%' ,
    borderBottomLeftRadius :20 ,
    borderBottomRightRadius : 20
  },
  LOGIN_CONTAINER :
  {
    backgroundColor : "#ffffff" ,
    position :"absolute" ,
    top : 160 ,
    width :'85%',
    height :'60%',
    borderRadius:15
  },
  WELCOME_TEXT_CONTAINER :
  {
    position :"absolute",
    // marginTop:60 ,
    top :60,
    left:20,
  },
  WELCOME_TEXT :
  {
    fontSize : 30,
    color: "#ffffff",
    // fontWeight : 'bold',
    fontFamily : 'SourceSansPro-BlackIt',
    lineHeight:46
  },
  SECTION:
  {
    height:40,
    width :'80%',
    marginTop :30 ,
    flexDirection :'row'
    
  },
  TEXTINPUT_CONTAINER:
  {
    flexDirection:'row',
    alignItems: "center",
    justifyContent:'space-between',
    borderWidth:1,
    borderRadius:5,
    paddingHorizontal:10,
    marginHorizontal:20,
    marginTop:20,
    // marginBottom:10 ,
    backgroundColor:'#e1f0f0'

  },
  TEXTINPUT:
  {
    flex:1,
    borderWidth :1 ,
    borderColor : '#03183b' ,
    borderRadius :20 , 
    // width: Dimensions.get('window').width
  } ,
  LOGIN_TEXT :
  {
    fontSize :25 ,
    color: '#000000',
    fontFamily : 'SourceSansPro-Bold'
  },
  SIGNUP_TEXT :
  {
    fontSize :20 ,
    color: '#808080',
    fontFamily : 'SourceSansPro-Semibold',
    alignSelf:'center'
  },
  LOGIN_INSIDETOP_CONTAINER :
  {
    flexDirection : 'row' ,
    justifyContent : 'space-between',
    padding:15 ,
    alignItems:'center'
  },
  FOR_PASS:
  {
    color : '#7D7A7A',
    fontWeight:'bold',
    alignSelf:'flex-end',
    // marginTop:10,
    marginRight:20
  },
  BUTTON:
  {
    backgroundColor:'#5bc4f5',
    width:'60%',
    alignItems:"center",
    alignSelf:"center",
    marginTop:15,
    height:'12%',
    justifyContent:"center",
    borderRadius:10
  },
  LOGIN_BUTTON_TEXT:
  {
    fontSize:20 ,
    fontWeight:'bold',
    color:'#ffffff'
  },
  BOTTOM_CONTAINER:
  {
    // position:'absolute',
    alignItems:"center",
    top :'55%'
  },
  BOTTOM_BUTTONS:
  {
    width:'30%',
    marginHorizontal:20,
    marginTop:10,
    padding:8,
    alignItems:"center",
    borderRadius:10,
    justifyContent:'center'
  },
  ERROR_TEXT :
  {
    color:"#fa0000",
  }
})