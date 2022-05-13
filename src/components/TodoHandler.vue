<template>
    <div id="todos-wrapper">
        <form id="newTodoForm" action="#" @submit.prevent="validateNewTodo">
            <label for="todo-text">New Todo</label>
            <textarea type="text" id="todo-text" required />

            <label for="todo-date">Deadline</label>
            <input type="date" id="todo-date" required />
            <input type="time" id="todo-time" required />

            <input type="submit" value="Add Todo" />
        </form>
        <div class="__todos">
            <h2>Current</h2>
            <p v-if="this.filterTodos(false).length < 1">Add some todos!</p>
            <TodoComponent
                @removeTodo="this.removeTodo(todo)"
                @toggleDone="this.toggleTodo(todo)"
                @editTodo="this.triggerEditModal(todo)"
                v-for="todo in this.filterTodos(false)"
                :key="todo.id"
                :todo="todo"
            ></TodoComponent>
            <hr />
            <h2>Done</h2>
            <p v-if="this.filterTodos(true).length < 1">Finish some todos!</p>
            <TodoComponent
                @removeTodo="this.removeTodo(todo)"
                @toggleDone="this.toggleTodo(todo)"
                @editTodo="this.triggerEditModal(todo)"
                v-for="todo in this.filterTodos(true)"
                :key="todo.id"
                :todo="todo"
            ></TodoComponent>
        </div>
        <Transition name="fade">
            <EditModalComponent
                :todo="todoToBeEdited"
                v-if="isEditModalVisable"
                @closedEditModal="editTodo"
                @closeModal="closeModal"
            ></EditModalComponent>
        </Transition>
    </div>
</template>

<script lang="ts">
import { Todo } from "../ts/models/Todo";
import { ITodo } from "../ts/models/ITodo";
import { Vue, Options } from "vue-class-component";
import TodoComponent from "./Todo.vue";
import EditModalComponent from "./EditModal.vue";

@Options({
    components: {
        TodoComponent,
        EditModalComponent,
    },
})
export default class TodoHandlerComponent extends Vue {
    todos: Todo[] = [];
    todoToBeEdited: Todo | undefined = undefined;
    isEditModalVisable = false;
    isModalSlideOut = true;

    public validateNewTodo(e: Event): void {
        e.preventDefault();
        let form = e.target as HTMLFormElement;
        form.reportValidity();
        if (form.checkValidity()) {
            let text = form.children[1] as HTMLInputElement;
            let dateString = form.children[3] as HTMLInputElement;
            let timeString = form.children[4] as HTMLInputElement;
            this.addTodo(text.value, dateString.value + " " + timeString.value);
            this.$forceUpdate();
        }
    }

    public mounted(): void {
        this.todos = this.fetchTodos();
    }

    private fetchTodos(): Todo[] {
        const todos: Todo[] = [];
        const storedStringForm: string | null = localStorage.getItem("todos");
        // Check that we have stored todos.
        if (storedStringForm === null) return [];
        // If we have stored todos, continue.
        const parsedObjects: ITodo[] = JSON.parse(storedStringForm);
        parsedObjects.forEach((object: ITodo) => {
            todos.push(
                new Todo(
                    object.text,
                    new Date(object.deadline),
                    object.id,
                    object.done
                )
            );
        });
        return todos;
    }

    private storeTodos(): void {
        localStorage.setItem("todos", JSON.stringify(this.todos));
    }

    private getNewId(): number {
        let maxId = 0;
        this.todos.forEach((todo) => {
            if (todo.id >= maxId) {
                maxId = todo.id;
            }
        });
        return maxId + 1;
    }

    public addTodo(text: string, deadlineString: string): void {
        const newTodo = new Todo(
            text,
            new Date(deadlineString),
            this.getNewId()
        );
        this.todos.push(newTodo);
        this.storeTodos();
    }

    public removeTodo(todo: Todo): void {
        this.todos.splice(this.todos.indexOf(todo), 1);
        this.storeTodos();
    }

    public triggerEditModal(todo: Todo): void {
        let currentTodo = new Todo(
            todo.text,
            todo.deadline,
            todo.id,
            todo.done
        );
        this.todoToBeEdited = currentTodo;
        this.isEditModalVisable = true;
    }

    public editTodo(editedTodo: Todo): void {
        this.todos.forEach((todo: Todo) => {
            if (todo.id === editedTodo.id) {
                todo.text = editedTodo.text;
                todo.deadline = editedTodo.deadline;
                return;
            }
        });
        this.closeModal();
    }

    public closeModal(): void {
        this.isEditModalVisable = false;
        this.todoToBeEdited = undefined;
    }

    public toggleTodo(todo: Todo): void {
        todo.done = !todo.done;
        this.storeTodos();
    }

    public filterTodos(isDone: boolean): Todo[] {
        return this.todos.filter((t: Todo) => {
            return t.done === isDone;
        });
    }
}
</script>

<style scoped lang="scss">
#todos-wrapper {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    position: relative;

    @include Mixins.breakpoint-tablet {
        flex-direction: row;
        align-items: initial;
    }

    form {
        z-index: 1;
        @include Mixins.form-mixin;
        width: min(100%, 800px);
        @include Mixins.breakpoint-tablet {
            width: auto;
        }
    }
    .__todos {
        z-index: 0;
        background-color: Colors.$light;
        width: min(100%, 800px);
        padding: Vars.$spacing-medium;
        box-shadow: 0px 0px 10px 0px Colors.$dark;
        flex-grow: 1;
        display: flex;
        flex-direction: column;
        gap: Vars.$spacing-medium;
        @include Mixins.breakpoint-tablet {
            flex-grow: 0;
        }
    }
}

// Antimation for when the element enters the DOM.
.fade-enter-active {
    animation: fade-in 0.2s ease;
}
// Animation for when the element is removed from the DOM.
.fade-leave-active {
    animation: fade-in 0.2s ease reverse;
}

@keyframes fade-in {
    0% {
        opacity: 0;
    }
    25% {
        opacity: 0;
    }
    100% {
        opacity: 1;
    }
}
</style>
