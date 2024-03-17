'use strict'

const todoControl = document.querySelector('.todo-control')
const headerInput = document.querySelector('.header-input')
const todoList = document.querySelector('.todo-list')
const todoCompleted = document.querySelector('.todo-completed')

let todoData = []

const render = function () {
    todoList.innerHTML = ''
    todoCompleted.innerHTML = ''

    todoData.forEach(function (item) {
        const li = document.createElement('li')

        li.classList.add('todo-item')

        li.innerHTML = '<span class="text-todo">' + item.text +
            '</span>' +
            '<div class="todo-buttons">' +
            '<button class="todo-remove"></button>' +
            '<button class="todo-complete"></button>' +
            '</div>'

        if (item.completed) {
            todoCompleted.append(li)
        } else {
            todoList.append(li)
        }

        li.querySelector('.todo-complete').addEventListener('click', function () {
            item.completed = !item.completed
            render()
        })
        li.querySelector('.todo-remove').addEventListener('click', function () {
            todoData.splice(todoData.indexOf(item), 1)
            render()
        })

    })
    localStorage.setItem('todoData', JSON.stringify(todoData))
}

todoControl.addEventListener('submit', function (event) {
    event.preventDefault()

    const newTodo = {
        text: headerInput.value,
        completed: false
    }
    if (headerInput.value.trim() == '') {
        headerInput.value = ''
    } else {
        todoData.push(newTodo)
        headerInput.value = ''
    }
    render()
})

document.addEventListener('DOMContentLoaded', function () {
    if (JSON.parse(localStorage.getItem('todoData')) !== null) {
        todoData = JSON.parse(localStorage.getItem('todoData'))
    } else {
        todoData = []
    }

    render()
})