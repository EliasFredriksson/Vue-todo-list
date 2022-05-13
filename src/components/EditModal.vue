<template>
    <div id="editModal">
        <div class="__background"></div>
        <form action="#" @submit.prevent="validateEditTodo">
            <label for="todo-text">Edit todo</label>
            <textarea
                type="text"
                id="todo-text"
                required
                v-model="todo.text"
            ></textarea>

            <label for="todo-date">Deadline</label>
            <input
                type="date"
                id="todo-date"
                required
                :value="
                    new Date(this.todo.deadline).toISOString().substr(0, 10)
                "
            />
            <input
                type="time"
                id="todo-time"
                required
                :value="
                    new Date(this.todo.deadline).toISOString().substr(11, 8)
                "
            />

            <input type="submit" value="Finish" />
        </form>
    </div>
</template>

<script lang="ts">
import { Vue, Options } from "vue-class-component";
import { Prop } from "vue-property-decorator";
import { Todo } from "../ts/models/Todo";

export default class EditModalComponent extends Vue {
    @Prop() todo!: Todo;

    public validateEditTodo(e: Event): void {
        e.preventDefault();
        let form = e.target as HTMLFormElement;
        form.reportValidity();
        if (form.checkValidity()) {
            let dateString = form.children[3] as HTMLInputElement;
            let timeString = form.children[4] as HTMLInputElement;
            this.todo.deadline = new Date(
                dateString.value + " " + timeString.value
            );
            this.$emit("closedEditModal", this.todo);
        }
    }
}
</script>

<style lang="scss">
#editModal {
    position: fixed;
    width: 100vw;
    height: 100vh;
    z-index: 100;
    top: 0%;

    .__background {
        z-index: 2;
        position: absolute;
        height: 100%;
        width: 100%;
        background-color: rgba($color: #000000, $alpha: 0.5);
    }

    form {
        border-radius: 10px;
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        z-index: 3;
        @include Mixins.form-mixin;

        textarea {
            min-height: 200px;
        }
    }
}
</style>
