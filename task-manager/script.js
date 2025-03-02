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

            if (!title) {
                alert ("Task title is required!");
                return;
            }

            if (!priority) {
                alert ("Please select a priority!");
                return;
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
            alert("An unexpected error occurred. Please try again.");
            return;
        }
    });

    function renderTasks(filterCompleted = false) {
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
                <button class="delete-btn">Delete</button>
            `;

            taskList.appendChild(taskCard);
        });
    }

    taskList.addEventListener("click", function(e) {
        if (e.target.classList.contains("complete-btn")) {  //event.target
            e.stopPropagation();                            //stop event bubbling
            const taskId = parseInt(e.target.parentElement.dataset.id);
            const task = tasks.find(t => t.id === taskId);
            task.completed = !task.completed;
            renderTasks();
        }

        if (e.target.classList.contains("delete-btn")) {    //event.target
            e.stopPropagation();                            //stop event bubbling
            const taskId = parseInt(e.target.parentElement.dataset.id);
            tasks = tasks.filter(t => t.id !== taskId);
            renderTasks();
        }
    });

    filterCompletedButton.addEventListener("click", function() {
        renderTasks(true);
    });

    sortPriorityButton.addEventListener("click", function() {
        const priorityOrder = { "low": 1, "medium": 2, "high": 3 };
        tasks.sort((a, b) => priorityOrder[a.priority] - priorityOrder[b.priority]);
        renderTasks();
    });
});
