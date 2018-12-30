import {createStackNavigator} from "react-navigation";

import Homescreen from "../Home/Homescreen.js"
import Addscreen from "../Add/Addscreen.js"
import Editscreen from "../Edit/Editscreen.js"

const RootStack = createStackNavigator(
 {
 Home : Homescreen,
 Add : Addscreen,
 Edit : Editscreen
 },
 {
 initialRouteName: 'Home',
 navigationOptions: {
 headerStyle: {
 backgroundColor: '#1e88e5',
 },
 headerTintColor: '#fff',
 headerTitleStyle: {
 fontWeight: 'bold',
 },
 },
 }
)

export default RootStack;