'use strict'

// Fetch existing todos from localStorage
const getSavedTodos = () => {
    const todosJSON = localStorage.getItem('todos');

    try {
        return todosJSON ? JSON.parse(todosJSON) : [];
    } catch (e) {
        return [];
    }
};

// Save todos to localStorage
const saveTodos = (todos) => {
    localStorage.setItem('todos', JSON.stringify(todos));
};

// Remove todo by id
const removeTodo = (id) => {
    const todoIndex = todos.findIndex((todo) => todo.id === id);

    if (todoIndex > -1) {
        todos.splice(todoIndex, 1);
    }
};

// Toggle the completed value for a given todo
const toggleTodo = (id) => {
    const todo = todos.find((todo) => todo.id === id);

    if (todo) {
        todo.completed = !todo.completed;
    }
};

// Render application todos based on filters
const renderTodos = (todos, filters) => {
    const todoEl = document.querySelector('.todos');
    const filteredTodos = todos.filter((todo) => {
        const searchTextMatch = todo.text.toLowerCase().includes(filters.searchText.toLowerCase());
        const hideCompletedMatch = !filters.hideCompleted || !todo.completed;
        
        return searchTextMatch && hideCompletedMatch;
    });

    const incompleteTodos = filteredTodos.filter((todo) => !todo.completed);

    todoEl.innerHTML = '';
    todoEl.appendChild(generateSummaryDOM(incompleteTodos));

    if (filteredTodos.length > 0) {
        filteredTodos.forEach((todo) => {

            todoEl.appendChild(generateTodoDOM(todo))
        });
    } 
};

// Get the DOM elements for an individual note
const generateTodoDOM = (todo) => {
    
    const containerEl = document.createElement('div');
    const todoEl = document.createElement('label');
    const checkbox = document.createElement('input');
    const todoText = document.createElement('span');
    const removeButton = document.createElement('button');

    // Setup todo checkbox
    checkbox.setAttribute('type', 'checkbox');
    checkbox.checked = todo.completed;
    if (checkbox.checked) {
        todoText.classList.toggle('line-through');
    }
    containerEl.appendChild(todoEl);
    todoEl.appendChild(checkbox);
    checkbox.addEventListener('change', () => {
        // todoText.classList.add('line-through');
        toggleTodo(todo.id);
        saveTodos(todos);
        renderTodos(todos, filters);
    });
    
    // Setup the todo text
    todoText.textContent = todo.text;
    
    todoEl.appendChild(todoText);

    //Setup container
    todoEl.classList.add('list-item');
    containerEl.classList.add('list-item__container');
    containerEl.appendChild(todoEl);

    // Setup the remove button
    removeButton.textContent = 'remove';
    removeButton.classList.add('button', 'button-task');
    containerEl.appendChild(removeButton);
    removeButton.addEventListener('click', () => {
        removeTodo(todo.id);
        saveTodos(todos);
        renderTodos(todos, filters);
    });

    return containerEl;
};

// Get the DOM elements for list summary
const generateSummaryDOM = (incompleteTodos) => {
    const summary = document.createElement('h2');
    summary.classList.add('list-title');

    summary.textContent = incompleteTodos.length === 0 ? 'You have no tasks' 
                        : incompleteTodos.length === 1 ? `You have ${incompleteTodos.length} task left`
                        :  `You have ${incompleteTodos.length} tasks left`; 
    return summary;
};

//style changes

