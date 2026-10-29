let taskinput = document.getElementById("taskinput");
let addtask = document.getElementById("addtask");
let tasklist = document.getElementById("tasklist");

let savedTasks = localStorage.getItem("tasks");
let tasks = JSON.parse(savedTasks) || [];

function displayTask(task) {
    let list = document.createElement("li");

    // Task text-ku separate span
    let taskText = document.createElement("span");
    taskText.innerText = task.text;
    list.append(taskText);

    // Already completed task-na highlight aagum
    if (task.completed) {
        taskText.classList.add("highlight");
    }

    // Button group
    let buttonGroup = document.createElement("div");
    buttonGroup.classList.add("button-group");

    // Delete button
    let deleteButton = document.createElement("button");
    deleteButton.innerText = "Delete";
    deleteButton.classList.add("deletebutton");

    deleteButton.addEventListener("click", function() {
        tasks = tasks.filter(function(item) {
            return item !== task;
        });

        localStorage.setItem("tasks", JSON.stringify(tasks));
        list.remove();
    });

    buttonGroup.append(deleteButton);

    // Complete button
    let complete = document.createElement("button");
    complete.innerText = "Complete";
    complete.classList.add("complete");

    buttonGroup.append(complete);
    list.append(buttonGroup);

    complete.addEventListener("click", function() {
        task.completed = !task.completed;

        taskText.classList.toggle("highlight", task.completed);

        localStorage.setItem("tasks", JSON.stringify(tasks));
    });

    tasklist.append(list);
}

// Saved tasks display pannum
tasks.forEach(function(task) {
    displayTask(task);
});
addtask.classList.add("addtask");
// Add new task
addtask.addEventListener("click", function() {
    let newtask = taskinput.value.trim();

    if (newtask === "") {
        return;
    }

    let task = {
        text: newtask,
        completed: false
    };

    tasks.push(task);

    localStorage.setItem("tasks", JSON.stringify(tasks));

    displayTask(task);

    taskinput.value = "";
});
