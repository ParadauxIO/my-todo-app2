import { useNavigation } from "@react-navigation/native";
import { StyleSheet, Text, TouchableOpacity } from "react-native";

export default function TaskButton({ task }) {
    const navigation = useNavigation();

    return (
        <TouchableOpacity
            style={styles.container}
            onPress={() => {
                navigation.navigate("TaskView", {
                    task,
                });
            }}
        >
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
