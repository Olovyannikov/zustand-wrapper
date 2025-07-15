import { create, type StateCreator } from 'zustand';
import { devtools } from 'zustand/middleware';

interface TodoItem {
    id: string;
    title: string;
    isComplete: boolean;
}

interface Todos {
    todos: TodoItem[];
    currentValue: string;
}

interface TodoAction {
    completeToggled: (id: string) => void;
    addTodo: ({ id, text }: { id: string; text: string }) => void;
    currentValueSettled: (value: string) => void;
    resetForm: () => void;
}

const todosSlice: StateCreator<Todos & TodoAction, [['zustand/devtools', never]]> = (set, get) => ({
    todos: [],
    currentValue: '',
    completeToggled: (id: string) => {
        const { todos } = get();

        const updatedTodos = todos.map((todo) => {
            if (todo.id !== id) return todo;
            return {
                ...todo,
                isComplete: !todo.isComplete,
            };
        });

        set({ todos: updatedTodos });
    },
    addTodo: ({ id, text }: { text: string; id: string }) => {
        const { todos, resetForm } = get();
        set({
            todos: [
                ...todos,
                {
                    id,
                    title: text,
                    isComplete: false,
                },
            ],
        });
        resetForm();
    },
    currentValueSettled: (value: string) => {
        set({ currentValue: value });
    },
    resetForm: () => {
        set({ currentValue: '' });
    },
});

export const useTodosStore = create<Todos & TodoAction>()(devtools(todosSlice));
