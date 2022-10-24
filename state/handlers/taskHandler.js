import { useImperativeHandle } from "react";
import { supabase } from "../supabase";

let getUncompletedTasks = async () => {
    let { data, error } = await supabase.from("tasks").select();

    console.log(data);
    if (error) {
        console.log(error);
    }

    return data;
};

let addNewTask = async (task_content, update) => {
    let { data } = await supabase.auth.getUser();

    let { error } = await supabase.from("tasks").insert({
        owner: data.user.id,
        task_content,
    });

    if (update) {
        await update();
    }
};

let completeTaskFromDb = async (taskId) => {
    await supabase
        .from("tasks")
        .update({ completed_at: new Date() })
        .match({ id: taskId });
};

let deleteTaskFromDb = async (taskId) => {
    let { data } = await supabase.from("tasks").delete().eq("id", taskId);
};

export {
    getUncompletedTasks,
    addNewTask,
    completeTaskFromDb,
    deleteTaskFromDb,
};
