import { createStackNavigator } from "@react-navigation/stack";
import Home from "../screens/Home";
import { HomeStackParamsList } from "../global/types";
import Details from "../screens/Details";

const Stack = createStackNavigator<HomeStackParamsList>();

const HomeStack = () => {
    return (
        <Stack.Navigator
            screenOptions={{headerShown:false}}
            initialRouteName='Home'
        >
            <Stack.Screen name='Details' component={Details} />
            <Stack.Screen name='Home' component={Home} />
        </Stack.Navigator>
    )
};

export default HomeStack;
