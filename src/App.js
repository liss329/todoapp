import { TodoListModel } from "./model/TodoListModel.js";
import { TodoItemModel } from "./model/TodoItemModel.js";
import { TodoListView } from "./view/TodoListView.js";
import { render } from "./view/html-util.js";

export class App {
    constructor() {
        this.todoListModel = new TodoListModel();
        this.todoListView = new TodoListView();
    }

    /**
     * Todoを追加するときに呼ばれるリスナー関数
     * @param {string} title 
     */
    handleAdd(title) {
        this.todoListModel.addTodo(new TodoItemModel({ title, completed: false }));
    }

    /**
     * Todoの状態を更新したときに呼ばれるリスナー関数
     * @param {{id: string, completed: boolean}}  
     */
    handleUpdate({ id, completed }) {
        this.todoListModel.updateTodo({ id, completed });
    }

    /**
     * Todoを削除した時に呼ばれるリスナー関数
     * @param {id: string}  
     */
    handleDelete({ id }) {
        this.todoListModel.deleteTodo({ id });
    }

    mount() {
        const formElement = document.querySelector("#js-form");
        const inputElement = document.querySelector("#js-form-input");
        const containerElement = document.querySelector("#js-todo-list");
        const todoItemCoutElement = document.querySelector("#js-todo-count");
        this.todoListModel.onCharge(() => {
            const todoItems = this.todoListModel.getTodoItems();
            const todoListView = new TodoListView();
            const todoListElement = todoListView.createElement(todoItems, {
                onUpdateTodo: ({ id, completed }) => {
                    this.handleUpdate({ id, completed });
                },
                onDeleteTodo: ({ id }) => {
                    this.handleDelete({ id });
                }
            });

            render(todoListElement, containerElement);
            todoItemCoutElement.textContent = `Todoアイテム数: ${this.todoListModel.getTotalCount()}`;
        });
        formElement.addEventListener("submit", (event) => {
            event.preventDefault();
            this.handleAdd(inputElement.value);
            inputElement.value = "";
        });
    }
}
