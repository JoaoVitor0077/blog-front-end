import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Register from "../pages/AuthPages/Register";
import Login from "../pages/AuthPages/Login";
import Home from "../pages/Feed/Home";
import Articles from "../pages/Feed/Articles"
import ForgotPassword from "../pages/AuthPages/ForgotPassword";
import { CreatePost } from "../pages/Post/CreatePost";
import MyPosts from "../pages/Post/MyPosts";


const Stack = createNativeStackNavigator();

export default function Routes() {
    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName="Login">
                <Stack.Screen name="Home" component={Home} options={{ headerShown: false }}/>
                <Stack.Screen name="Articles" component={Articles} options={{ headerShown: false }}/>
                <Stack.Screen name="Login" component={Login} options={{ headerShown: false }}/>
                <Stack.Screen name="Register" component={Register} options={{ headerShown: false }}/>
                <Stack.Screen name="ForgotPassword" component={ForgotPassword} options={{ headerShown: false }}/>
                <Stack.Screen name="CreatePost" component={CreatePost} options={{ headerShown: false }}/>
                <Stack.Screen name="PostView" component={MyPosts} options={{ headerShown: false }}/>
            </Stack.Navigator>
        </NavigationContainer>
    );
}