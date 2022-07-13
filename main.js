// copy and paste start
// https://jp.vuejs.org/v2/examples/todomvc.html
var STORAGE_KEY = 'todos-vuejs-demo'
var todoStorage = {
    fetch: function () {
        var todos = JSON.parse(
            localStorage.getItem(STORAGE_KEY) || '[]'
        )
        todos.forEach(function (todo, index) {
            todo.id = index
        })
        todoStorage.uid = todos.length
        return todos
    },
    save: function (todos) {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(todos))
    }
}

const app = new Vue({
    el: '#app',
    data: {
        todos: [],
        options: [
            { value: -1, lavel: "すべて"},
            { value: 0, lavel: "作業中"},
            { value: 1, lavel: "完了"},
        ],
        current: -1
    },
    created() {
        // auto fetch when you create instance
        this.todos = todoStorage.fetch();
    },
    methods: {
        //add todo
        doAdd: function (event, value) {
            var comment = this.$refs.comment
            if (!comment.value.length) {
                return
            }
            this.todos.push({
                id: todoStorage.uid++,
                comment: comment.value,
                state: 0
            })
            //clear form
            comment.value = ''
        }, 
        watch: {
            todos: {
                handler: function (todos) {
                    todoStorage.save(todos)
                },
                deep: true
            }
        },
        doChangeState: function (item) {
            item.state = item.state ? 0 : 1
        },
        doRemove: function (item) {
            var index = this.todos.indexOf(item)
            this.todos.splice(index, 1)
        }
    }
})