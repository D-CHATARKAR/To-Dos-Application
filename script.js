let todoItemsContainer = document.getElementById('todoItemsContainer');
let saveButton = document.getElementById("saveTodoButton");

let todoList = getTodoList();


saveButton.onclick = function() {
    localStorage.setItem("todoList", JSON.stringify(todoList));
};


function getTodoList() {
    let g = localStorage.getItem("todoList");
    let parsedTodoList = JSON.parse(g);
    if (parsedTodoList === null) {
        return [];
    } else {
        return parsedTodoList;
    }

};
let todoCount = todoList.length;


function onTodoStatusChanged(checkboxId, labelId, todoId) {
    let checkboxElement = document.getElementById(checkboxId);
    let labelElement = document.getElementById(labelId);
    if (checkboxElement.checked) {
        labelElement.classList.add("checked");
    } else {
        labelElement.classList.remove("checked");
    }

    let todoItemIndex = todoList.findIndex(function(eachtodo) {
        let eachTodoId = "todo" + eachtodo.Num;
        if (eachTodoId === todoId) {
            return true;
        } else {
            return false;
        }

    });

    let todoObject = todoList[todoItemIndex];
    if (todoObject.isChecked === true) {
        todoObject.isChecked = false;
    } else {
        todoObject.isChecked = true;
    }

}

function onDeleteTodo(todoId) {
    let todoElement = document.getElementById(todoId);
    todoItemsContainer.removeChild(todoElement);
    let deletedTodoItemIndex = todoList.findIndex(function(eachTodo) {
        let eachTodoId = "todo" + eachTodo.Num;
        if (eachTodoId === todoId) {
            return true;
        } else {
            false;
        }
    });
    todoList.splice(deletedTodoItemIndex, 1);
}

function createAndAppendTodo(todoList) {

    let checkboxId = "checkbox" + todoList.Num;
    let labelId = "label" + todoList.Num;
    let todoId = "todo" + todoList.Num;
    let todoElement = document.createElement('li');

    todoElement.classList.add("d-flex", "flex-row", "todo-item-container");
    todoElement.id = todoId;
    todoItemsContainer.appendChild(todoElement);

    let inputElement = document.createElement('input');

    inputElement.type = "checkbox";
    inputElement.id = checkboxId;
    inputElement.checked = todoList.isChecked;
    inputElement.classList.add("checkbox-input");
    todoElement.appendChild(inputElement);

    inputElement.onclick = function() {
        onTodoStatusChanged(checkboxId, labelId, todoId);
    }

    let divElement = document.createElement('div');
    divElement.classList.add("label-container", "d-flex", "flex-row");
    todoElement.appendChild(divElement);

    let labelElement = document.createElement('label');
    labelElement.classList.add("checkbox-label");
    labelElement.setAttribute("for", checkboxId);
    labelElement.textContent = todoList.text;
    labelElement.id = labelId;
    divElement.appendChild(labelElement);
    if (todoList.isChecked === true) {
        labelElement.classList.add('checked');
    }

    let delContainer = document.createElement('div');
    delContainer.classList.add("delete-icon-container");
    divElement.appendChild(delContainer);

    let icon = document.createElement('i');
    icon.classList.add("far", "fa-trash-alt", "delete-icon");
    icon.onclick = function() {
        onDeleteTodo(todoId);
    }
    delContainer.appendChild(icon);
}
for (let i of todoList) {
    createAndAppendTodo(i);
}


function onAddTodo() {
    let userInputElement = document.getElementById('todoUserInput');
    let userInputValue = userInputElement.value;

    if (userInputValue === "") {
        alert("Enter Valid Text");
        return;
    }
    todoCount = todoCount + 1;
    let newTodo = {
        text: userInputValue,
        Num: todoCount,
        isChecked: false
    }
    todoList.push(newTodo);
    createAndAppendTodo(newTodo);
    userInputValue = "";
}
let addTodoButton = document.getElementById('addTodoButton');
addTodoButton.onclick = function() {
    onAddTodo();
}