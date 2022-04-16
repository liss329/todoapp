console.log("App.js: loaded");

import { TodoListModel } from "./model/TodoListModel.js";
import { TodoItemModel } from "./model/TodoItemModel.js";
import { element, render } from "./view/html-util.js";

export class App {
    constructor() {
        console.log("App initialized");
        // 1. TodoListの初期化
        this.TodoListModel = new TodoListModel();
    }

    mount() {
        const formElement = document.querySelector("#js-form");
        const inputElemnt = document.querySelector("#js-form-input");
        const containerElement = document.querySelector("#js-todo-list");
        const todoItemCoutElement = document.querySelector("#js-todo-count");

        // 2. TodoListModelの状態が更新されたら表示を更新する
        this.TodoListModel.onCharge(() => {

            // TodoリストをまとめるList要素
            const todoListElement = element`<ul />`;

            const todoItems = this.TodoListModel.getTodoItems();
            todoItems.forEach(item => {

                const todoItemElement = item.completed
                    ? element`<li><input type="checkbox" class="checkbox" checked><s>${item.title}</s><button class="delete">x</button>
                    </li>`
                    : element`<li><input type="checkbox" class="checkbox">${item.title}<button class="delete">x</button>
                    </li>`;

                // チェックボックスがトグルしたときのイベントにリスナー関数を登録
                const inputCheckboxElement = todoItemElement.querySelector(".checkbox");
                inputCheckboxElement.addEventListener("change", () => {
                    // 指定したTodoアイテムの完了状態を反転する
                    this.TodoListModel.updateTodo({
                        id: item.id,
                        completed: !item.completed
                    });
                });
                // 削除ボタン(x)がクリックされたときにTodoListModelからアイテムを削除する
                const deleteButtonElement = todoItemElement.querySelector(".delete");
                deleteButtonElement.addEventListener("click", () => {
                    this.TodoListModel.deleteTodo({
                        id: item.id
                    });
                });


                // TodoアイテムをtodoListElementに追加する
                todoListElement.appendChild(todoItemElement);
            });

            // コンテナ要素の中身をTodoリストをまとめるList要素で上書きする
            render(todoListElement, containerElement);

            // アイテム数の表示を更新
            todoItemCoutElement.textContent = `Todoアイテム数: ${this.TodoListModel.getTotalCount()}`;
        });

        // 3. フォームを送信したら、新しいTodoItemModelを追加する
        formElement.addEventListener("submit", (event) => {
            event.preventDefault();
            // 新しいTodoItemをTodoListへ追加する
            this.TodoListModel.addTodo(new TodoItemModel({
                title: inputElemnt.value,
                completed: false
            }))
            // 入力欄を空文字列にしてリセットする
            inputElemnt.value = "";
        });

    }
}
