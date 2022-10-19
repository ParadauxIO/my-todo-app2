import { useEffect } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

export default function TaskButton({ task }) {
    return (
        <TouchableOpacity style={styles.container}>
            <Text style={styles.textColor}>{task.task_content}</Text>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: "#181818",
        margin: 10,
        padding: 5,
    },
    textColor: {
        color: "white",
    },
});
