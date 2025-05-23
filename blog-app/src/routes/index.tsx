import React, { useEffect, useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Register from "../pages/AuthPages/Register";
import Login from "../pages/AuthPages/Login";
import Home from "../pages/Feed/Home";
import Articles from "../pages/Feed/Articles"
import ForgotPassword from "../pages/AuthPages/ForgotPassword";
import { CreatePost } from "../pages/Post/CreatePost";
// import { MyPosts } from "../pages/Post/MyPosts";
import { ActivityIndicator, View } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";


const Stack = createNativeStackNavigator();

export default function Routes() {
    const [loading, setLoading] = useState(true);
    const [isLogged, setIsLogged] = useState(false);

    useEffect(() => {
        const checkToken = async () => {
            const token = await AsyncStorage.getItem('token');
            setIsLogged(!!token);
            setLoading(false);
        };
        checkToken();
    }, []);

    if (loading) {
        return (
            <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
                <ActivityIndicator size="large" color="#333" />
            </View>
        );
    }

    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName={isLogged ? "Home" : "Login"}>
                <Stack.Screen name="Home" component={Home} options={{ headerShown: false }} />
                <Stack.Screen name="Articles" component={Articles} options={{ headerShown: false }} />
                <Stack.Screen name="Login" component={Login} options={{ headerShown: false }} />
                <Stack.Screen name="Register" component={Register} options={{ headerShown: false }} />
                <Stack.Screen name="ForgotPassword" component={ForgotPassword} options={{ headerShown: false }} />
                <Stack.Screen name="CreatePost" component={CreatePost} options={{ headerShown: false }} />
                {/*<Stack.Screen name="MyPosts" component={MyPosts} options={{ headerShown: false }} />*/}
            </Stack.Navigator>
        </NavigationContainer>
    );
}