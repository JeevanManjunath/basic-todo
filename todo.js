let todoItemsContainer = document.getElementById("todoItemsContainer");
let addTodoButton = document.getElementById("addToDoButton");
let saveTodoButton = document.getElementById("saveTodoButton");

let todoList = JSON.parse(localStorage.getItem("todoList")) || [];

saveTodoButton.addEventListener("click", () => {
    localStorage.setItem("todoList", JSON.stringify(todoList));
});

function onAddTodo() {
    let inputElement = document.getElementById("todoUserInput");
    let userInputValue = inputElement.value.trim();
    
    if (userInputValue === "") {
        alert("Enter a valid task.");
        return;
    }

    let uniqueNo = todoList.length > 0 ? todoList[todoList.length - 1].uniqueno + 1 : 1;
    let todo = { text: userInputValue, uniqueno: uniqueNo, isChecked: false };

    todoList.push(todo);
    createAndAppendTodo(todo);
    localStorage.setItem("todoList", JSON.stringify(todoList)); // Update storage

    inputElement.value = "";
}

addTodoButton.addEventListener("click", onAddTodo);

function onTodoStatusChange(checkboxId, labelid, todoid) {
    let checkbox = document.getElementById(checkboxId);
    let labelelement = document.getElementById(labelid);
    
    labelelement.classList.toggle("checked");

    let todoobjectindex = todoList.findIndex(function(eachtodo) {
        return "todo" + eachtodo.uniqueno === todoid;
    });

    if (todoobjectindex !== -1) {
        todoList[todoobjectindex].isChecked = checkbox.checked; // Correctly update `isChecked` property
    }
}


function deleteTodo(todoId) {
    let todoElement = document.getElementById(todoId);
    todoItemsContainer.removeChild(todoElement);

    todoList = todoList.filter(todo => "todo" + todo.uniqueno !== todoId);
    localStorage.setItem("todoList", JSON.stringify(todoList)); // Update storage
}

function createAndAppendTodo(todo) {
    let checkboxId = "checkbox" + todo.uniqueno;
    let labelId = "label" + todo.uniqueno;
    let todoId = "todo" + todo.uniqueno;

    let todoElement = document.createElement("li");
    todoElement.classList.add("todo-item-container", "d-flex", "flex-row");
    todoElement.id = todoId;

    let inputElement = document.createElement("input");
    inputElement.type = "checkbox";
    inputElement.id = checkboxId;
    inputElement.checked = todo.isChecked;
    inputElement.classList.add("checkbox-input");
    inputElement.addEventListener("change", () => onTodoStatusChange(checkboxId, labelId, todoId));

    let labelContainer = document.createElement("div");
    labelContainer.classList.add("label-container", "d-flex", "flex-row");

    let labelElement = document.createElement("label");
    labelElement.setAttribute("for", checkboxId);
    labelElement.id = labelId;
    labelElement.classList.add("checkbox-label");
    labelElement.textContent = todo.text;
    if (todo.isChecked) {
        labelElement.classList.add("checked");
    }

    let deleteIconContainer = document.createElement("div");
    deleteIconContainer.classList.add("delete-icon-container");

    let deleteIcon = document.createElement("i");
    deleteIcon.classList.add("far", "fa-trash-alt", "delete-icon");
    deleteIcon.addEventListener("click", () => deleteTodo(todoId));

    deleteIconContainer.appendChild(deleteIcon);
    labelContainer.appendChild(labelElement);
    labelContainer.appendChild(deleteIconContainer);
    
    todoElement.appendChild(inputElement);
    todoElement.appendChild(labelContainer);
    
    todoItemsContainer.appendChild(todoElement);
}

todoList.forEach(createAndAppendTodo);
