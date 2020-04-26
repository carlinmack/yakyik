import React, { useState, useEffect } from "react";
import { StyleSheet, TouchableOpacity, View, TextInput, Text } from "react-native";
import Icon from "react-native-vector-icons/Feather";
import { connect } from "react-redux";
import { addTodo } from "../actions/middleware";

import * as Location from "expo-location";

export function TodoInput(props) {
    let text_color = props.colorSchemes[props.colorScheme].text;
    let input_background = props.colorSchemes[props.colorScheme].button;
    const [location, setLocation] = useState(null);

    useEffect(() => {
        (async () => {
            await Location.requestPermissionsAsync();

            let location = await Location.getCurrentPositionAsync({});
            setLocation(location);
        })();
    }, []);
    return (
        <View style={[styles.container, { backgroundColor: input_background }]}>
            <TextInput
                style={[styles.textInput, { color: text_color }]}
                multiline={true}
                placeholder="New Post"
                placeholderTextColor="#abbabb"
                onChangeText={(value) => {
                    props.updateTodo(value);
                }}
                value={props.currentText}
            />
            <TouchableOpacity
                onPress={() => {
                    props.addTodo({
                        longitude: location.coords.longitude,
                        latitude: location.coords.latitude,
                    });
                }}
            >
                <Icon
                    name="send"
                    size={30}
                    color="black"
                    style={{ marginRight: 10, marginLeft: 5, color: text_color }}
                />
            </TouchableOpacity>
        </View>
    );
}

function mapStateToProps(state) {
    return {
        counter: state.counter,
        currentText: state.currentText,
        colorSchemes: state.colorSchemes,
        colorScheme: state.colorScheme,
    };
}

function mapDispatchToProps(dispatch) {
    return {
        addTodo: (location) => dispatch(addTodo(location)),
        updateTodo: (text) => dispatch({ type: "UPDATE_TODO", text: text }),
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(TodoInput);

const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        alignItems: "center",
        minHeight: 50,
        maxHeight: 150,
        width: "90%",
        borderRadius: 5,
        backgroundColor: "#f4f3f1",

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
        // maxHeight: 80,
        fontSize: 18,
        fontWeight: "bold",
        color: "black",
        paddingLeft: 10,
    },
});
