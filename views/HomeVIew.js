import { useEffect, useState } from "react";
import {
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from "react-native";
import TaskButton from "../components/TaskButton";
import { addNewTask, getUncompletedTasks } from "../state/handlers/taskHandler";

export default function HomeView() {
    const [tasks, setTasks] = useState([]);
    const [newTask, setNewTask] = useState("");

    async function load() {
        let tasks = await getUncompletedTasks();
        setTasks(tasks);
    }

    let taskButtons = tasks
        .filter((task) => !task.completed_at)
        .map((task) => <TaskButton key={task.id} task={task} />);

    useEffect(() => {
        load();
    }, []);

    return (
        <View style={styles.container}>
            <View style={styles.topBar}>
                <Text style={styles.textHeader}>Note</Text>
                {/* <View style={styles.settingsCog}></View> */}
            </View>
            <View style={styles.dayButtons}>
                <View style={[styles.button, styles.buttonActive]}>
                    <Text style={[styles.buttonText, styles.buttonActiveText]}>
                        Today
                    </Text>
                </View>
                <View style={styles.button}>
                    <Text style={styles.buttonText}>Tomorrow</Text>
                </View>
                <View style={styles.button}>
                    <Text style={styles.buttonText}>Saturday</Text>
                </View>
            </View>
            <ScrollView style={styles.taskView}>{taskButtons}</ScrollView>
            <View style={styles.addTask}>
                <TextInput
                    style={styles.fieldInput}
                    value={newTask}
                    onChangeText={setNewTask}
                />
                <View style={[styles.button, styles.buttonActive]}>
                    <TouchableOpacity
                        style={[styles.buttonText, styles.buttonActiveText]}
                        onPress={() => addNewTask(newTask, load)}
                    >
                        <Text>Add</Text>
                    </TouchableOpacity>
                </View>
                <TouchableOpacity
                    style={[styles.buttonText, styles.buttonActiveText]}
                    onPress={() => load()}
                >
                    <Text>Refresh</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#141414",
    },
    topBar: {
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        margin: 12,
    },
    settingsCog: {
        width: 25,
        height: 25,
        marginLeft: 34,
        backgroundColor: "#709fc5",
    },
    textHeader: {
        fontSize: 24,
        fontWeight: "bold",
        color: "#709fc5",
    },
    dayButtons: {
        flexDirection: "row",
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
    addTask: {
        flexDirection: "row",
    },
    fieldInput: {
        width: 240,
        color: "white",
        backgroundColor: "#181818",
        padding: 10,
        fontSize: 14,
        margin: 16,
        marginTop: 3,
        marginBottom: 3,
    },
});
