export class Todo {
    id: number;
    done: boolean;
    text: string;
    deadline: Date;
    constructor(text: string, deadline: Date, id: number, done = false) {
        this.id = id;
        this.done = done;
        this.text = text;
        this.deadline = deadline;
    }
}
