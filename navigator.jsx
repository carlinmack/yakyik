import React from "react";
import Home from "./components/Home";
import LogIn from "./components/LogIn";

import { createSwitchNavigator } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";

export const AppStack = createStackNavigator({ Home: Home });
export const AuthStack = createStackNavigator({ LogIn: LogIn });

export const AppNavigator = createSwitchNavigator(
    {
        App: AppStack,
        Auth: AuthStack,
    },
    {
        initialRouteName: "Auth",
    }
);
