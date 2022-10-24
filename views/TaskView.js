import { useNavigation } from "@react-navigation/native";
import { useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import {
    completeTaskFromDb,
    deleteTaskFromDb,
} from "../state/handlers/taskHandler";

export default function TaskView({ route }) {
    const navigation = useNavigation();
    const { task } = route.params;

    console.log(task);

    function deleteTask() {
        deleteTaskFromDb(task.id);
        navigation.goBack();
    }

    function completeTask() {
        completeTaskFromDb(task.id);
        navigation.goBack();
    }

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.topBar}>
                <Text style={styles.topBarHeader}>Task View</Text>
            </View>
            <View style={styles.taskInfoContainer}>
                <View style={styles.taskInfoEntry}>
                    <Text style={styles.taskInfoKey}>Created</Text>
                    <Text style={styles.taskInfoValue}>{task.created_at}</Text>
                </View>
                {task.completed_at && (
                    <View style={styles.taskInfoEntry}>
                        <Text style={styles.taskInfoKey}>Completed</Text>
                        <Text style={styles.taskInfoValue}>
                            {task.completed_at}
                        </Text>
                    </View>
                )}
                <View style={styles.taskInfoEntry}>
                    <Text style={styles.taskInfoKey}>Content</Text>
                    <Text style={styles.taskInfoValue}>
                        {task.task_content}
                    </Text>
                </View>
                <View style={styles.taskInfoEntry}>
                    <Text style={styles.taskInfoKey}>ID</Text>
                    <Text style={styles.taskInfoValue}>{task.id}</Text>
                </View>
            </View>

            <TouchableOpacity
                style={[styles.button, styles.buttonActive]}
                onPress={completeTask}
            >
                <Text style={styles.buttonActiveText}>Complete</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.button]} onPress={deleteTask}>
                <Text style={styles.buttonText}>Delete</Text>
            </TouchableOpacity>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#141414",
    },
    topBar: {
        width: "100%",
        justifyContent: "center",
        alignItems: "center",
    },
    topBarHeader: {
        fontSize: 24,
        color: "#CCC",
    },
    taskInfoContainer: {
        marginTop: 16,
    },
    taskInfoEntry: {
        margin: 6,
        borderRadius: 12,
        backgroundColor: "#181818",
        flexDirection: "row",
        justifyContent: "space-between",
        paddingTop: 12,
        paddingBottom: 12,
    },
    taskInfoKey: {
        fontSize: 16,
        color: "white",
        fontWeight: "bold",
        marginLeft: 24,
    },
    taskInfoValue: {
        fontSize: 14,
        color: "white",
        marginRight: 24,
    },
    button: {
        backgroundColor: "#181818",
        margin: 12,
        borderRadius: 12,
        padding: 10,
        paddingTop: 5,
        paddingBottom: 5,
        alignItems: "center",
        justifyContent: "center",
    },
    buttonText: {
        fontSize: 10,
        color: "#CCC",
        textTransform: "uppercase",
    },
    buttonActive: {
        backgroundColor: "#709fc5",
    },
    buttonActiveText: {
        color: "black",
    },
});
