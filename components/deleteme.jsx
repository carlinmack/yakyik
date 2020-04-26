import React, { useState, useEffect, createContext } from "react";
import { Text, View, Button, Animated, StyleSheet } from "react-native";
import { useColorScheme } from "react-native-appearance";

const colorSchemes = {
    light: {
        background: "#e8e6e3",
        text: "#333",
    },
    dark: {
        background: "#333",
        text: "#fff",
    },
};

const DarkModeExample = () => {
    // const colorScheme = useColorScheme();
    let [colorScheme, setMode] = useState("dark");
    let [modeState, _] = useState(new Animated.Value(0));
    const colors = colorSchemes[colorScheme] || colorSchemes.light;
    const toggleMode = () => {
        if (colorScheme == "dark") {
            setMode("light");
            Animated.timing(modeState, {
                toValue: 1,
                duration: 750,
            }).start();
        } else {
            setMode("dark");
            Animated.timing(modeState, {
                toValue: 0,
                duration: 750,
            }).start();
        }
    };

    let background_color = modeState.interpolate({
        inputRange: [0, 1],
        outputRange: [colorSchemes.dark.background, colorSchemes.light.background],
    });

    let text_color = modeState.interpolate({
        inputRange: [0, 1],
        outputRange: [colorSchemes.dark.text, colorSchemes.light.text],
    });

    return (
        <Animated.View
            style={[styles.container, { backgroundColor: background_color }]}
        >
            <Animated.Text style={[styles.title, { color: text_color }]}>
                zero to dark mode
            </Animated.Text>

            <Animated.Text style={{ color: text_color }}>
                color scheme: {colorScheme}
            </Animated.Text>
            <Button title="Switch" onPress={toggleMode} />
        </Animated.View>
    );
};

const styles = StyleSheet.create({
    container: {
        alignItems: "center",
        flex: 1,
        justifyContent: "center",
    },
    title: {
        fontSize: 24,
    },
});

export default DarkModeExample;
