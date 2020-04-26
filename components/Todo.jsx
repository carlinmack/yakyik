import React from "react";
import { StyleSheet, TouchableOpacity, View, Text } from "react-native";
import Icon from "react-native-vector-icons/Feather";
import { connect } from "react-redux";
import { setChecked } from "../actions/middleware";
import { like } from "../actions/middleware";

export function Todo(props) {
    let background = props.colorSchemes[props.colorScheme].todo_background;
    let border = props.colorSchemes[props.colorScheme].todo_border;
    let text_color = props.colorSchemes[props.colorScheme].text;

    return (
        <View
            style={[
                styles.container,
                { backgroundColor: background, borderBottomColor: border },
            ]}
        >
            <View style={styles.listItem}>
                <Text style={[styles.listUser, { color: text_color }]}>
                    {props.postUsername}
                </Text>
                <Text style={[styles.listText, { color: text_color }]}>
                    {props.text}
                </Text>
            </View>
            <View
                style={{
                    marginLeft: "auto",
                    marginRight: 15,
                    alignItems: "center",
                }}
            >
                <Icon
                    name="heart"
                    size={25}
                    color="red"
                    onPress={() => {
                        props.like(props.index);
                    }}
                />
                <Text style={{ color: text_color }}>{props.likes}</Text>
            </View>
        </View>
    );
}

function mapStateToProps(state) {
    return {
        colorSchemes: state.colorSchemes,
        colorScheme: state.colorScheme,
    };
}

function mapDispatchToProps(dispatch) {
    return {
        setChecked: (text, index) => dispatch(setChecked(text, index)),
        like: (index) => {
            // console.log(index.index, index.key, index.text);
            dispatch(like(index));
        },
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(Todo);

const styles = StyleSheet.create({
    container: {
        backgroundColor: "#eeecea",
        flexDirection: "row",
        borderColor: "#e2e0dc",
        borderBottomWidth: 2,
        alignItems: "center",
        minHeight: 60,
        paddingTop: 5,
        paddingBottom: 5,
    },
    listItem: {
        maxWidth: "90%",
    },
    listText: {
        paddingLeft: 30,
        paddingRight: 10,
        fontSize: 17,
    },
    listUser: {
        paddingLeft: 10,
        paddingRight: 10,
        fontSize: 17,
        fontWeight: "bold",
    },
});
