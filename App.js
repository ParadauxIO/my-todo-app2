import "react-native-url-polyfill/auto";
import { StatusBar } from "expo-status-bar";
import { useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import Auth from "./views/Auth";
import HomeView from "./views/HomeVIew";
import { supabase } from "./state/supabase";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import TaskView from "./views/TaskView";

const Stack = createNativeStackNavigator();

export default function App() {
    const [session, setSession] = useState(undefined);

    async function load() {
        let { data, error } = await supabase.auth.getSession();
        console.log(error);
        setSession(data);

        supabase.auth.onAuthStateChange((_event, session) => {
            console.log(_event);
            setSession(session);
        });
    }

    useEffect(() => {
        load();
    }, []);

    return (
        <View style={styles.container}>
            {session ? (
                <NavigationContainer>
                    <Stack.Navigator
                        screenOptions={{
                            headerShown: false,
                        }}
                    >
                        <Stack.Screen name="HomeView" component={HomeView} />
                        <Stack.Screen name="TaskView" component={TaskView} />
                    </Stack.Navigator>
                </NavigationContainer>
            ) : (
                <Auth />
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
});
