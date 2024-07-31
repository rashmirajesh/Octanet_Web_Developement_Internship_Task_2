document.addEventListener('DOMContentLoaded', function() {
    const taskForm = document.getElementById('task-form');
    const taskInput = document.getElementById('task-input');
    const taskList = document.getElementById('task-list');

    taskForm.addEventListener('submit', function(e) {
        e.preventDefault();
        addTask(taskInput.value);
        taskInput.value = '';
    });

    taskList.addEventListener('click', function(e) {
        if (e.target.classList.contains('delete')) {
            deleteTask(e.target.closest('li'));
        } else if (e.target.classList.contains('edit')) {
            editTask(e.target.closest('li'));
        } else if (e.target.classList.contains('save')) {
            saveTask(e.target.closest('li'));
        } else if (e.target.classList.contains('cancel')) {
            cancelEdit(e.target.closest('li'));
        } else if (e.target.classList.contains('task-text')) {
            toggleComplete(e.target.closest('li'));
        }
    });

    function addTask(taskText) {
        if (taskText.trim() === '') return;

        const li = document.createElement('li');
        li.innerHTML = `
            <span class="task-text">${taskText}</span>
            <input type="text" class="edit-input" value="${taskText}" style="display:none;">
            <div class="actions">
                <button class="edit">Edit</button>
                <button class="delete">Delete</button>
                <button class="save" style="display:none;">Save</button>
                <button class="cancel" style="display:none;">Cancel</button>
            </div>
        `;
        taskList.appendChild(li);
    }

    function deleteTask(taskElement) {
        taskList.removeChild(taskElement);
    }

    function editTask(taskElement) {
        taskElement.classList.add('editing');
        taskElement.querySelector('.task-text').style.display = 'none';
        taskElement.querySelector('.edit-input').style.display = 'inline';
        taskElement.querySelector('.save').style.display = 'inline';
        taskElement.querySelector('.cancel').style.display = 'inline';
        taskElement.querySelector('.edit').style.display = 'none';
        taskElement.querySelector('.delete').style.display = 'none';
    }

    function saveTask(taskElement) {
        const editInput = taskElement.querySelector('.edit-input');
        const newValue = editInput.value.trim();
        if (newValue !== '') {
            taskElement.querySelector('.task-text').innerText = newValue;
            taskElement.classList.remove('editing');
            taskElement.querySelector('.task-text').style.display = 'inline';
            editInput.style.display = 'none';
            taskElement.querySelector('.save').style.display = 'none';
            taskElement.querySelector('.cancel').style.display = 'none';
            taskElement.querySelector('.edit').style.display = 'inline';
            taskElement.querySelector('.delete').style.display = 'inline';
        }
    }

    function cancelEdit(taskElement) {
        taskElement.classList.remove('editing');
        const taskText = taskElement.querySelector('.task-text').innerText;
        taskElement.querySelector('.edit-input').value = taskText;
        taskElement.querySelector('.task-text').style.display = 'inline';
        taskElement.querySelector('.edit-input').style.display = 'none';
        taskElement.querySelector('.save').style.display = 'none';
        taskElement.querySelector('.cancel').style.display = 'none';
        taskElement.querySelector('.edit').style.display = 'inline';
        taskElement.querySelector('.delete').style.display = 'inline';
    }

    function toggleComplete(taskElement) {
        taskElement.classList.toggle('completed');
    }
});
