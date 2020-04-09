import React from 'react';
import { StyleSheet, TouchableOpacity, View, Text } from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import { connect } from 'react-redux';
import { setChecked } from '../actions/Todo';
import { deleteTodo } from '../actions/Todo';

export function Todo(props) {
    return (
        <View style={styles.listContainer}>
            <Icon
                name={props.checked ? 'check' : 'square'}
                size={30}
                color="black"
                style={{ marginLeft: 15 }}
                onPress={() => (props.setChecked(props.text, props.index))}
            />
            <View>
                {props.checked && <View style={styles.verticalLine} />}
                <Text style={styles.listItem}>{props.text}</Text>
            </View>
            <Icon
                name="trash-2"
                size={30}
                color="red"
                style={{ marginLeft: 'auto', marginRight: 15 }}
                onPress={() => { props.deleteTodo(props.text, props.index) }}
            />
        </View>
    );
}

function mapStateToProps(state) {
    return state
}


function mapDispatchToProps(dispatch) {
    return {
        setChecked: (text, key) => dispatch(setChecked(text, key)),
        deleteTodo: (text, key) => dispatch(deleteTodo(text, key)),
    };
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Todo);

const styles = StyleSheet.create({
    listContainer: {
        marginTop: '5%',
        flexDirection: 'row',
        borderColor: '#aaaaaa',
        borderBottomWidth: 1.5,
        alignItems: 'stretch',
        minHeight: 40
    },
    listItem: {
        paddingBottom: 20,
        paddingLeft: 10,
        marginTop: 6,
        borderColor: 'green',
        borderBottomWidth: 1,
        fontSize: 17,
        fontWeight: 'bold',
        color: 'black'
    }
});