import { EventEmitter } from "../EventEmitter.js";

export class TodoListModel extends EventEmitter{
    /**
     * 
     * @param {TodoItemModel} [items] 初期アイテム一覧（デフォルトは空の配列） 
     */
    constructor(items = []){
        super();
        this.items = items;
    }

    /**
     * TodoItemの合計個数を返す
     * @returns {number}
     */
    getTotalCount(){
        return this.items.length;
    }

    /**
     * 表示できるTodoitemの配列を返す
     * @returns {TodoItemModel[]}
     */
    getTodoItems(){
        return this.items;
    }

    /**
     * TodoListの状態が更新されたときに呼び出されれるリスナー関数を登録する
     * @param {*} listener 
     */
    onCharge(listener){
        this.addEventListener("change", listener);
    }

    /**
     * 状態が変更されたときに呼ぶ登録済みのリスナー関数を呼び出す
     */
    emitChange(){
        this.emit("change");
    }

    /**
     * TodoItemを追加する
     * @param {TodoItemModel} todoItem 
     */
    addTodo(todoItem){
        this.items.push(todoItem);
        this.emitChange();
    }
}