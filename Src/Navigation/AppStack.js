import { createAppContainer , createSwitchNavigator} from 'react-navigation';
import { createStackNavigator} from 'react-navigation-stack';
import HomeScreen from '../Screens/HomeScreen';
import SplashScreen from '../Screens/SplashScreen'
import Login from '../Screens/Login'
import Signup from '../Screens/Signup';

const PreLoginStack= createStackNavigator({
    
    Login : {screen :Login} ,
    Signup : {screen : Signup},

},{
    initialRouteName : 'Login'
})

const PostLoginStack= createStackNavigator({
    
    
    HomeSreen : {screen : HomeScreen}

},{
    initialRouteName : 'HomeSreen'
})

export default createAppContainer(
    createSwitchNavigator(
      {
        SplashScreen : SplashScreen,
        Prelogin: PreLoginStack,
        PostLogin: PostLoginStack,
      },
      {
        initialRouteName: 'SplashScreen',
      }
    )
  );