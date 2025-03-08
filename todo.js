let todoItemsContainer = document.getElementById("todoItemsContainer");
let addtodobutton = document.getElementById("addToDoButton");
let saveTodoButton = document.getElementById("saveTodoButton");

function getTodolistfromlocalStorage() {
    let stringifiedTodoList = localStorage.getItem("todoList");
    let parsedtodolist = JSON.parse(stringifiedTodoList);
    if (parsedtodolist === null) {
        return [];
    } else {
        return parsedtodolist;
    }
}
let todoList = getTodolistfromlocalStorage();
let todocount = todoList.length;

saveTodoButton.onclick = function() {
    localStorage.setItem("todoList", JSON.stringify(todoList));
};

function onAddTodo() {
    let inputElement = document.getElementById("todoUserInput");
    let userinputvalue = inputElement.value;
    if (userinputvalue === "") {
        alert("Enter valid value");
        return;
    }
    let uniquenimercount = todocount + 1;
    let todo = {
        text: userinputvalue,
        uniqueno: uniquenimercount,
        isChecked: false,
    };
    todoList.push(todo);
    createAndAppendTodo(todo);
    inputElement.value = "";
}
addtodobutton.onclick = function() {
    onAddTodo();
};

function onTodoStatusChange(checkboxId, labelid, todoid) {
    let checkbox = document.getElementById(checkboxId);
    let labelelement = document.getElementById(labelid);
    /* if (checkbox.checked) {
     } else {
         labelelement.classList.remove("checked");
     }*/
    labelelement.classList.toggle("checked");

    let todoobjectindex = todoList.findIndex(function(eachtodo) {
        let eachtodoid = "todo" + eachtodo.uniqueno;
        if (eachtodoid === todoid) {
            return true;
        } else {
            return false;
        }
    });
    let todoObject = todoList[todoobjectindex];
    if (todoObject.isChecked === true) {
        todoObject.isChecked = false;
    } else {
        todoObject.isChecked = true;
    }
}

function deleteTodo(todoid) {
    let todoElement = document.getElementById(todoid);
    todoItemsContainer.removeChild(todoElement);
    let foundIndex = todoList.findIndex(function(eachItem) {
        let eachItemId = "todo" + eachItem.uniqueno;
        if (eachItemId === todoid) {
            return true;
        } else {
            return false;
        }
    });
    todoList.splice(foundIndex, 1);
}

function createAndAppendTodo(todo) {
    let checkboxId = "checkbox" + todo.uniqueno;
    let labelid = "lable" + todo.uniqueno;
    let todoid = "todo" + todo.uniqueno;
    let todoElement = document.createElement("li");
    todoElement.classList.add("todo-item-container", "d-flex", "flex-row");
    todoElement.id = todoid;
    todoItemsContainer.appendChild(todoElement);

    let inputElement = document.createElement("input");
    inputElement.type = "checkbox";
    inputElement.id = checkboxId;
    inputElement.checked = todo.isChecked;

    inputElement.classList.add("checkbox-input");
    inputElement.onclick = function() {
        onTodoStatusChange(checkboxId, labelid, todoid);
    };
    todoElement.appendChild(inputElement);

    let labelContainer = document.createElement("div");
    labelContainer.classList.add("label-container", "d-flex", "flex-row");
    todoElement.appendChild(labelContainer);

    let labelElement = document.createElement("label");
    labelElement.setAttribute("for", checkboxId);
    labelElement.id = labelid;
    labelElement.classList.add("checkbox-label");
    labelElement.textContent = todo.text;
    if (todo.isChecked === true) {
        labelElement.classList.add("checked");
    }
    labelContainer.appendChild(labelElement);

    let deleteIconContainer = document.createElement("div");
    deleteIconContainer.classList.add("delete-icon-container");
    labelContainer.appendChild(deleteIconContainer);

    let deleteIcon = document.createElement("i");
    deleteIcon.classList.add("far", "fa-trash-alt", "delete-icon");
    deleteIcon.onclick = function() {
        deleteTodo(todoid);
    };
    deleteIconContainer.appendChild(deleteIcon);
}

for (let todo of todoList) {
    createAndAppendTodo(todo);
}