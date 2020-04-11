import React from "react";
import { StyleSheet, TouchableOpacity, View, Text } from "react-native";
import Icon from "react-native-vector-icons/Feather";
import { connect } from "react-redux";
import { setChecked } from "../actions/Todo";
import { like } from "../actions/Todo";

export function Todo(props) {
    return (
        <View style={styles.listContainer}>
            <View style={styles.listItem}>
                <Text style={styles.listText}>{props.text}</Text>
            </View>
            <View style={{ marginLeft: "auto", marginRight: 15 }}>
                <Icon
                    name="heart"
                    size={30}
                    color="red"
                    onPress={() => {
                        props.like(props);
                    }}
                />
                <Text>{props.likes}</Text>
            </View>
        </View>
    );
}

function mapStateToProps(state) {
    return state;
}

function mapDispatchToProps(dispatch) {
    return {
        setChecked: (text, index) => dispatch(setChecked(text, index)),
        like: (index) => {
            console.log(index.index, index.key, index.text);
            dispatch(like(index));
        },
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(Todo);

const styles = StyleSheet.create({
    listContainer: {
        flexDirection: "row",
        borderColor: "#aaaaaa",
        borderBottomWidth: 1,
        borderTopWidth: 1,
        alignItems: "center",
        minHeight: 60,
    },
    listItem: {
        maxWidth: "90%",
    },
    listText: {
        paddingLeft: 10,
        paddingRight: 10,
        fontSize: 17,
        fontWeight: "bold",
    },
});
