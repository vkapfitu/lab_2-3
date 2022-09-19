const classNames = {
    TODO_ITEM: 'todo-container',
    TODO_CHECKBOX: 'todo-checkbox',
    TODO_TEXT: 'todo-text',
    TODO_DELETE: 'todo-delete',
}

const list = document.getElementById('todo-list');
const itemCountSpan = document.getElementById('item-count');
const checkedCountSpan = document.getElementById('checked-count');
const uncheckedCountSpan = document.getElementById('unchecked-count');
const localStorageItemKey = "todo-items"

let id = 1;
let todoMap = localStorage.getItem(localStorageItemKey) !== null
    ? new Map(JSON.parse(localStorage.getItem(localStorageItemKey)))
    : new Map();

function createTodo() {
    let text = prompt("Enter new task");
    if (text == null) {
        return;
    }
    const todo = {id: id++, text, isChecked: Math.random() < 0.5};
    todoMap.set(todo.id, todo);
    renderTodoList();
}

function getTodoInstance(todo) {
    let li = document.createElement("li");
    li.className = classNames.TODO_ITEM;
    li.innerHTML = `<input class="${classNames.TODO_CHECKBOX}" type="checkbox" ${todo.isChecked ? "checked" : ""} 
                                                                    onclick="toggleTodoStatus(${todo.id})">
                    <span class="${classNames.TODO_TEXT}">${todo.text}</span>
                    <button class="${classNames.TODO_DELETE}" onclick="removeTodo(${todo.id})">Remove</button>`;
    return li;
}

function removeTodo(id) {
    todoMap.delete(id);
    renderTodoList();
}

function renderTodoList() {
    list.innerHTML = "";
    updateTodoList();
    updateCounters();
    localStorage.setItem(localStorageItemKey, JSON.stringify(Array.from(todoMap.entries())));
}

function toggleTodoStatus(id) {
    let item = todoMap.get(id);
    item.isChecked = !item.isChecked;
    updateCounters();
}

function updateCounters() {
    let todos = Array.from(todoMap.values());
    let totalItems = todos.length;
    let checkedItemsCount = todos.filter(todo => todo.isChecked).length;
    itemCountSpan.textContent = totalItems;
    checkedCountSpan.textContent = checkedItemsCount;
    uncheckedCountSpan.textContent = totalItems - checkedItemsCount;
}

function updateTodoList() {
    Array.from(todoMap.values())
        .map(todo => getTodoInstance(todo))
        .forEach(todo => list.append(todo));
}

window.onload = function () {
    renderTodoList();
}
