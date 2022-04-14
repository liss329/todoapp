console.log("App.js: loaded");

import {element, render} from "./view/html-util.js";

export class App {
    constructor() {
        console.log("App initialized");
    }
    mount() {
        const formElement = document.querySelector("#js-form");
        const inputElemnt = document.querySelector("#js-form-input");
        const containerElement = document.querySelector("#js-todo-list");
        const todoItemCoutElement = document.querySelector("#js-todo-count");
        
        // TodoリストをまとめるList要素
        const todoListElement = element`<ul />`;
        // Todoアイテム数
        let todoItemCount = 0;
        formElement.addEventListener("submit", (event) => {
            // 本来のsubmitイベントの動作（他のURIに遷移。指定がない場合は自分自身）を止める
            event.preventDefault();
            
            // 追加するTodoアイテムの要素(li要素)を作成する
            const todoItemElement = element`<li>${inputElemnt.value}</li>`;

            // TodoアイテムをtodoListElementに追加する
            todoListElement.appendChild(todoItemElement);

            // コンテナ要素の中身をTodoリストをまとめるList要素で上書きする
            render(todoListElement, containerElement);

            // Todoアイテム数を+1し、表示されているテキストを更新する
            todoItemCount += 1;
            todoItemCoutElement.textContent = `Todoアイテム数: ${todoItemCount}`;

            // 入力欄を空文字列にしてリセットする
            inputElemnt.value = "";
        });

    }
}
