document.addEventListener("DOMContentLoaded", function() {
    const taskForm = document.getElementById("task-form");
    const taskList = document.getElementById("task-list");
    const filterCompletedButton = document.getElementById("filter-completed");
    const sortPriorityButton = document.getElementById("sort-priority");
    const errorMessage = document.getElementById("error-message");

    let tasks = [];

    taskForm.addEventListener("submit", function(e) {
        e.preventDefault();     // Prevent form submission
        errorMessage.textContent = "";

        try {
            const title = document.getElementById("task-title").value.trim();
            const description = document.getElementById("task-desc").value.trim();
            const priority = document.querySelector("input[name='priority']:checked");

            if (!title || !priority) {
                throw new Error("Please fill out all fields and select a priority!");
            }

            const task = {
                id: Date.now(),
                title,
                description,
                priority: priority.value,
                completed: false
            };

            tasks.push(task);
            renderTasks();
            taskForm.reset();    
        } catch (error) {
            console.error("An error occurred: ", error);
            alert(errorMessage.textContent || "An unexpected error occurred. Please try again.");
        }
    });

    function renderTasks(filterCompleted = false) {
        try {

            if (!taskList){
                throw new Error("Task list container not found!");
            } 

            taskList.innerHTML = "";

            let filteredTasks = [...tasks];

            if (filterCompleted) {
                filteredTasks = filteredTasks.filter(task => task.completed);
            }

            filteredTasks.forEach(task => {
                const taskCard = document.createElement("div");
                taskCard.classList.add("task-card");
                taskCard.dataset.id = task.id;

                if (task.completed) {
                    taskCard.classList.add("completed");
                }

                taskCard.innerHTML = `
                    <h3>${task.title}</h3>
                    <p>${task.description}</p>
                    <p>Priority: <strong>${task.priority}</strong></p>
                    <button class="complete-btn">${task.completed ? "Undo" : "Complete"}</button>
                    <button class="delete-btn"><i class="fas fa-trash-alt"></i></button>
                `;

                taskList.appendChild(taskCard);
            });
        } catch (error) {
            console.error("Error in renderTasks():", error);
            alert(errorMessage.textContent || "Error displaying tasks. Please refresh the page.");
        }
    }

    taskList.addEventListener("click", function(e) {
        try {
            if (e.target.classList.contains("complete-btn")) {  //event.target
                e.stopPropagation();                            //stop event bubbling
                const taskId = parseInt(e.target.parentElement.dataset.id);

                if (isNaN(taskId)){
                    throw new Error("Invalid task ID.");
                }
                     
                const task = tasks.find(t => t.id === taskId);
                
                if (!task){
                    throw new Error("Task not found.");
                }

                task.completed = !task.completed;
                renderTasks();
            }
    
            if (e.target.classList.contains("delete-btn")) {    //event.target
                e.stopPropagation();                            //stop event bubbling
                const taskId = parseInt(e.target.parentElement.dataset.id);

                if (isNaN(taskId)){
                    throw new Error("Invalid task ID.");
                }

                const initialLength = tasks.length;
                tasks = tasks.filter(t => t.id !== taskId);
                if (tasks.length === initialLength) {
                    throw new Error("Task deletion failed.");
                }

                renderTasks();
            }
        } catch (error) {
            console.error("Error in task event handling:", error);
            alert(errorMessage.textContent || "An unexpected error occurred.");
        }
    });

    filterCompletedButton.addEventListener("click", function() {
        renderTasks(true);
    });

    sortPriorityButton.addEventListener("click", function() {
        try {
            const priorityOrder = { "low": 1, "medium": 2, "high": 3 };

            tasks.sort((a, b) => {
                if (!a.priority || !b.priority || !priorityOrder[a.priority] || !priorityOrder[b.priority]) {
                    throw new Error("Invalid priority value.");
                }
                return priorityOrder[a.priority] - priorityOrder[b.priority];
            });

            renderTasks();
        } catch (error) {
            console.error("Sorting error:", error);
            alert(errorMessage.textContent || "Error sorting tasks. Please check task priorities.");
        }
    });
});
