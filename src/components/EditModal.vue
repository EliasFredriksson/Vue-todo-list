<template>
    <div id="editModal">
        <div class="__background" @click="cancelEdit"></div>
        <Transition name="slide-up">
            <form v-if="visible" action="#" @submit.prevent="validateEditTodo">
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

                <input type="submit" value="Confirm" />
            </form>
        </Transition>
    </div>
</template>

<script lang="ts">
import { Vue } from "vue-class-component";
import { Prop } from "vue-property-decorator";
import { Todo } from "../ts/models/Todo";

export default class EditModalComponent extends Vue {
    @Prop() todo!: Todo;
    visible = false;

    public mounted() {
        setTimeout(() => {
            this.visible = true;
        }, 100);
    }

    public validateEditTodo(e: Event): void {
        this.visible = false;
        e.preventDefault();
        let form = e.target as HTMLFormElement;
        form.reportValidity();
        if (form.checkValidity()) {
            let dateString = form.children[3] as HTMLInputElement;
            let timeString = form.children[4] as HTMLInputElement;
            this.todo.deadline = new Date(
                dateString.value + " " + timeString.value
            );
            setTimeout(() => {
                this.$emit("closedEditModal", this.todo);
            }, 200);
        }
    }

    public cancelEdit(): void {
        this.visible = false;
        setTimeout(() => {
            this.$emit("closeModal");
        }, 200);
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
    button {
        z-index: 99;
    }

    form {
        border-radius: 10px;
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%) scale(1);
        z-index: 3;
        @include Mixins.form-mixin;

        textarea {
            min-height: 200px;
        }
    }
}

// The enter-active is when the element is inserted into the DOM.
.slide-up-enter-active {
    animation: slide-in 300ms;
}
// The enter-active is when the element is removed from the DOM.
.slide-up-leave-active {
    animation: slide-in 200ms reverse;
}

@keyframes slide-in {
    0% {
        transform: translate(-50%, 150%);
    }
    100% {
        transform: translate(-50%, -50%);
    }
}
</style>
