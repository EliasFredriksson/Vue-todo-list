<template>
    <div class="__todo">
        <div class="__infos">
            <h3>{{ todo.text }}</h3>
            <hr />

            <p>
                Deadline:
                {{ todo.deadline.toLocaleDateString() }} -
                {{ todo.deadline.toLocaleTimeString().substr(0, 5) }}
            </p>
        </div>
        <div class="__buttons">
            <button
                @click="$emit('toggleDone')"
                v-if="todo.done"
                class="__button-undo"
            ></button>
            <button
                @click="$emit('toggleDone')"
                v-else
                class="__button-complete"
            ></button>
            <button @click="$emit('editTodo')">✏️</button>
            <button @click="$emit('removeTodo')">🗑️</button>
        </div>
    </div>
</template>

<script lang="ts">
import { Vue } from "vue-class-component";
import { Todo } from "../ts/models/Todo";
import { Prop } from "vue-property-decorator";

export default class TodoComponent extends Vue {
    @Prop() todo!: Todo | null;
    // @Prop() callback(): void;

    // Extra uppgift:
    // Skapa en sida som kan söka efte filmer med omdb apit.
}
</script>

<style lang="scss">
.__todo {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: Vars.$spacing-medium;

    background-color: Colors.$blue;
    color: white;

    padding: Vars.$spacing-medium;
    border-radius: Vars.$border-radius;

    .__infos {
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        gap: Vars.$spacing-small;

        background-color: white;
        padding: 20px;
        color: black;
        height: 100%;
        width: 100%;
        border-radius: calc(Vars.$border-radius / 2);
    }

    .__buttons {
        display: flex;
        flex-direction: row;
        align-items: center;
        gap: Vars.$spacing-medium;

        .__button-complete {
            background-color: rgb(255, 171, 171);

            &::before {
                content: "\2715";
                padding-bottom: 5px;
            }
            &:hover {
                &::before {
                    content: "\21E9";
                    padding-bottom: 0px;
                }
                background-color: rgb(174, 250, 174);
            }
        }
        .__button-undo {
            background-color: rgb(174, 250, 174);
            &::before {
                content: "\2713";
            }

            &:hover {
                &::before {
                    content: "\21E7";
                }
                background-color: rgb(255, 171, 171);
            }
        }
        button {
            width: 40px;
            height: 40px;
            font-size: 15pt;
            display: flex;
            justify-content: center;
            align-items: center;
            padding: Vars.$spacing-small;
            border: none;
            border-radius: calc(Vars.$border-radius/2);
            cursor: pointer;
            @include Mixins.button-mixin(Colors.$blue-dark);
        }
    }

    @include Mixins.breakpoint-mobile {
        flex-direction: row;
        justify-content: space-between;
    }
}
</style>
