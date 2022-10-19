import "react-native-url-polyfill/auto";
import { StatusBar } from "expo-status-bar";
import { useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import Auth from "./views/Auth";
import HomeView from "./views/HomeVIew";
import { supabase } from "./state/supabase";

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
            {session ? <HomeView /> : <Auth />}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
});
