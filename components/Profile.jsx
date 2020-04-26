import React from "react";
import {
    StyleSheet,
    View,
    TouchableOpacity,
    TextInput,
    Text,
    Animated,
    Switch,
} from "react-native";

import { connect } from "react-redux";
import {
    setUsername,
    setPassword,
    checkPassword,
    toggleColorScheme,
} from "../actions/middleware";

import { NavigationContainer, useNavigation } from "@react-navigation/native";
import Icon from "react-native-vector-icons/Feather";

export function Profile(props) {
    console.log("profile");
    console.log(props.showPasswordInputButton);

    let background_color = props.colorState.interpolate({
        inputRange: [0, 1],
        outputRange: [
            props.colorSchemes.dark.background,
            props.colorSchemes.light.background,
        ],
    });

    let text_color = props.colorState.interpolate({
        inputRange: [0, 1],
        outputRange: [props.colorSchemes.dark.text, props.colorSchemes.light.text],
    });

    let background_button = props.colorState.interpolate({
        inputRange: [0, 1],
        outputRange: [props.colorSchemes.dark.button, props.colorSchemes.light.button],
    });

    const AnimatedButton = Animated.createAnimatedComponent(TouchableOpacity);

    return (
        <View style={{ flexDirection: "column", flex: 1 }}>
            <Animated.View
                style={{
                    backgroundColor: background_button,
                    flexDirection: "row",
                    height: 85,
                    justifyContent: "space-between",
                    alignItems: "flex-end",
                    paddingBottom: 15,
                }}
            >
                <BackButton color={text_color} />
                <Animated.Text
                    style={{ fontWeight: "bold", fontSize: 20, color: text_color }}
                >
                    Profile
                </Animated.Text>
                <View style={{ width: 50 }} />
            </Animated.View>
            <Animated.View
                style={[styles.container, { backgroundColor: background_color }]}
            >
                <Animated.Text style={[styles.header, { color: text_color }]}>
                    {props.username}
                </Animated.Text>
                <View
                    style={{
                        flexDirection: "column",
                        height: 450,
                        justifyContent: "space-evenly",
                    }}
                >
                    <AnimatedButton
                        style={[
                            props.showUserInputButton
                                ? styles.button
                                : { display: "none" },
                            { backgroundColor: background_button },
                        ]}
                        onPress={props.showUserInput}
                    >
                        <Animated.Text
                            style={[styles.buttonText, { color: text_color }]}
                        >
                            Change Username
                        </Animated.Text>
                    </AnimatedButton>
                    <AnimatedButton
                        style={[
                            props.showPasswordInputButton
                                ? styles.button
                                : { display: "none" },
                            { backgroundColor: background_button },
                        ]}
                        onPress={props.showPasswordInput}
                    >
                        <Animated.Text
                            style={[styles.buttonText, { color: text_color }]}
                        >
                            Set Password
                        </Animated.Text>
                    </AnimatedButton>
                    <AnimatedButton
                        style={[
                            props.showPasswordInputButton
                                ? styles.button
                                : { display: "none" },
                            {
                                backgroundColor: background_button,
                                flexDirection: "row",
                            },
                        ]}
                        onPress={props.toggleColorScheme}
                    >
                        <Animated.Text
                            style={[styles.buttonText, { color: text_color }]}
                        >
                            Toggle {props.colorScheme == "dark" ? "Light" : "Dark"} Mode
                        </Animated.Text>
                        <Switch
                            trackColor={{ false: "#CCB5DB", true: "#81b0ff" }}
                            thumbColor={
                                props.colorScheme == "dark" ? "#f5dd4b" : "#767577"
                            }
                            onValueChange={props.toggleColorScheme}
                            value={props.colorScheme == "dark"}
                        />
                    </AnimatedButton>
                </View>
                <View
                    style={
                        props.showUserInputBool
                            ? styles.textInputContainer
                            : { display: "none" }
                    }
                >
                    <TextInput
                        style={styles.textInput}
                        placeholder="Username"
                        placeholderTextColor="#abbabb"
                        value={props.currentUsername}
                        onChangeText={(value) => {
                            props.updateUsername(value);
                        }}
                    />
                    <TouchableOpacity style={styles.button} onPress={props.setUsername}>
                        <Text style={styles.buttonText}>Change</Text>
                    </TouchableOpacity>
                </View>
                <View
                    style={
                        props.showPasswordInputBool
                            ? styles.textInputContainer
                            : { display: "none" }
                    }
                >
                    <TextInput
                        style={styles.textInput}
                        placeholder="Password"
                        placeholderTextColor="#abbabb"
                        value={props.currentPassword}
                        onChangeText={(value) => {
                            props.updatePassword(value);
                        }}
                        secureTextEntry={true}
                    />
                    <TouchableOpacity style={styles.button} onPress={props.setPassword}>
                        <Text style={styles.buttonText}>Set</Text>
                    </TouchableOpacity>
                </View>
                <View
                    style={
                        props.showPasswordEnterBool
                            ? styles.textInputContainer
                            : { display: "none" }
                    }
                >
                    <TextInput
                        style={styles.textInput}
                        placeholder="Password"
                        placeholderTextColor="#abbabb"
                        value={props.currentPassword}
                        onChangeText={(value) => {
                            props.updatePassword(value);
                        }}
                        secureTextEntry={true}
                    />
                    <TouchableOpacity
                        style={styles.button}
                        onPress={props.checkPassword}
                    >
                        <Text style={styles.buttonText}>Enter</Text>
                    </TouchableOpacity>
                </View>
            </Animated.View>
        </View>
    );
}

function BackButton({ color, resetProfile }) {
    const navigation = useNavigation();
    const AnimatedIcon = Animated.createAnimatedComponent(Icon);

    return (
        <TouchableOpacity
            style={{
                justifyContent: "center",
                alignItems: "center",
                width: 50,
            }}
            onPress={() => {
                navigation.pop();
                resetProfile;
            }}
        >
            <AnimatedIcon
                name="corner-up-left"
                size={20}
                style={{ marginLeft: 15, color: color }}
            />
        </TouchableOpacity>
    );
}

function mapStateToProps(state) {
    return {
        username: state.username,
        password: state.password,
        showUserInputBool: state.showUserInput,
        showUserInputButton: state.showUserInputButton,
        showPasswordInputBool: state.showPasswordInput,
        showPasswordInputButton: state.showPasswordInputButton,
        showPasswordEnterBool: state.showPasswordEnter,
        currentUsername: state.currentUsername,
        currentPassword: state.currentPassword,
        colorState: state.colorState,
        colorSchemes: state.colorSchemes,
        colorScheme: state.colorScheme,
    };
}

function mapDispatchToProps(dispatch) {
    return {
        setUsername: () => dispatch(setUsername()),
        setPassword: () => dispatch(setPassword()),
        checkPassword: () => dispatch(checkPassword()),
        showUserInput: () => dispatch({ type: "SHOW_USER_INPUT" }),
        showPasswordInput: () => dispatch({ type: "SHOW_PASSWORD_INPUT" }),
        updateUsername: (text) => dispatch({ type: "UPDATE_USERNAME", text: text }),
        updatePassword: (text) => dispatch({ type: "UPDATE_PASSWORD", text: text }),
        toggleColorScheme: () => dispatch(toggleColorScheme()),
        resetProfile: () => dispatch({ type: "RESET_PROFILE" }),
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(Profile);

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "space-evenly",
        backgroundColor: "#e8e6e3",
    },
    header: {
        fontSize: 30,
    },
    button: {
        backgroundColor: "#f4f3f1",
        paddingTop: 7.5,
        paddingBottom: 7.5,
        paddingLeft: 10,
        paddingRight: 10,
        borderRadius: 5,
        alignSelf: "center",
    },
    buttonText: {
        fontSize: 17.5,
        fontWeight: "bold",
    },
    textInputContainer: {
        flexDirection: "row",
        alignItems: "center",
        minHeight: 50,
        maxHeight: 150,
        width: "90%",
        backgroundColor: "#f4f3f1",
        paddingRight: 10,

        marginBottom: "5%",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 5,
        },
        shadowOpacity: 0.34,
        shadowRadius: 6.27,

        elevation: 3,
    },
    textInput: {
        flex: 1,
        fontSize: 18,
        fontWeight: "bold",
        color: "black",
        paddingLeft: 10,
    },
});
