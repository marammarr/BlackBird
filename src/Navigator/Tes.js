import React from 'react-native'
import {createSwitchNavigator,createStackNavigator,createAppContainer,createBottomTabNavigator} from "react-navigation"; 
import Homescreen from "../Home/Homescreen.js"
import Addscreen from "../Add/Addscreen.js"
import Editscreen from "../Edit/Editscreen.js"
import ListMahasiswa from '../Mahasiswa/ListMahasiswa'
import AddMahasiswa from '../Mahasiswa/AddMahasiswa'
import EditMahasiswa from '../Mahasiswa/EditMahasiswa'
import ListKrs from '../KRS/ListKrs'
import AddKrs from '../KRS/AddKrs'
import EditKrs from '../KRS/EditKrs'
import Login from '../Login'
import Signup from '../Signup'
import {Icon} from 'native-base'
//import Ionicons from 'react-native-vector-icons/Ionicons';
//import Icon from 'react-native-vector-icons/MaterialCommunityIcons'


const RootStack = createStackNavigator(
 {
    /* Login : Login, */
    Home : Homescreen,
    Add : Addscreen,
    Edit : Editscreen
 },
 {
    initialRouteName: 'Home',
    navigationOptions: {
        headerStyle: {
            //backgroundColor: 'blue'//'#1e88e5'
            backgroundColor: '#cccccc',
            elevation: 0,
            shadowOpacity: 0,
            borderBottomWidth: 0
        },
        headerTintColor: 'red',//'#fff',
        headerTitleStyle: {
            fontWeight: 'bold',
        },
    },
 }
)
const StackMahasiswa = createStackNavigator(
    {
       List : ListMahasiswa,
       Add : AddMahasiswa,
       Edit : EditMahasiswa
    },
    {
       initialRouteName: 'List',
       navigationOptions: {
           headerStyle: {
               //backgroundColor: 'blue'//'#1e88e5'
               backgroundColor: '#cccccc',
               elevation: 0,
               shadowOpacity: 0,
               borderBottomWidth: 0
           },
           headerTintColor: 'red',//'#fff',
           headerTitleStyle: {
               fontWeight: 'bold',
           },
       },
    }
)

const StackKrs = createStackNavigator(
    {
       List : ListKrs,
       Add : AddKrs,
       Edit : EditKrs
    },
    {
       initialRouteName: 'List',
       navigationOptions: {
           headerStyle: {
               //backgroundColor: 'blue'//'#1e88e5'
               backgroundColor: '#cccccc',
               elevation: 0,
               shadowOpacity: 0,
               borderBottomWidth: 0
           },
           headerTintColor: 'red',//'#fff',
           headerTitleStyle: {
               fontWeight: 'bold',
           },
       },
    }
   )

const RouteLog = createStackNavigator(
    {
        Login : Login,
        Signup : Signup
    },
    {
        initialRouteName: 'Login',
        navigationOptions: {
            headerStyle: {
                backgroundColor: 'rgba(0,0,0,0.3)',
                elevation: 0 
            },
            headerTintColor: 'black',
            headerTitleStyle:{
                fontWeight: 'bold'
            }
        }
    }
)

const NavBot = createBottomTabNavigator(
    {
        //RootStack : RootStack,
        Mahasiswa : {
            screen: StackMahasiswa,
            navigationOptions: {
                tabBarIcon: ({horizontal, tintColor}) =>
                    <Icon name="md-person" size={horizontal?20:25} color={tintColor} />
            }
        },
        KRS : {
            screen: StackKrs,
            navigationOptions: {
                tabBarIcon: ({horizontal, tintColor}) =>
                    <Icon name="md-card" size={horizontal?20:25} color={tintColor} />
            }
        },
        Login : {
            screen: RouteLog,
            navigationOptions: {
                tabBarIcon: ({horizontal, tintColor}) =>
                    <Icon name="md-key" size={horizontal?20:25} color={tintColor} />
            }
        }
    },
    {
        /* navigationOptions :({ navigation }) => ({
            tabBarIcon: ({ focused, tintColor}) => {
                const { routeName } = navigation.state;
                alert(navigation.state)
                let iconName;
                switch(routeName){
                    case 'Mahasiswa':
                        iconName = `message-text${focused ? '': '-outline'}`;
                    break;
                    case 'KRS':
                        iconName = `ios-paper${focused ? '': '-outline'}`;
                    break;
                    case 'Login':
                        iconName = `ios-key${focused ? '': '-outline'}`;
                    break;
                }
                return <Icon name="md-key" size={25} color={tintColor} />
            },
        }), */
        tabBarOptions: {
            initialRouteName: 'Mahasiswa',
            activeTintColor: 'white',
            inactiveTintColor: 'lightgray',
            style: {
                backgroundColor: 'rgba(20,120,10,0.9)'//'#4d535e'
            },
            showIcon: true,
            showLabel: true
        }
    }
)

/* const navBot = createBottomTabNavigator(
    {
        Home : { screen : RootStack},
        Login : {screen : RouteLogIonicons}
    },
    {
        defaultNavigationOptions: ({navigation}) => (
            {
                tabBarIcon: ({ focused, tintColor}) => {
                    const { routeName } = navigation.state;
                    let iconName;
                    if(routeName==='Home'){
                        iconName = `md-home${focused ? '': '-outline'}`;
                    }else if(routeName==='Login'){
                        iconName = "md-person${focus ? '' : '-outline'}";
                    }

                    return <Icon name={iconName} size={25} color={tintColor} />
                },
            }
        ),
        tabBarOptions: {
            activeTintColor: 'tomato',
            inactiveTintColor: 'gray'
        }
    }
) */
const pindahNavigator = createSwitchNavigator(
    {
        Luar : RouteLog,
        Dalam : NavBot
    },
    {
        initialRouteName: 'Luar'
    }    
)
const App = createAppContainer(NavBot)
export default App;