class Task {
	constructor(id, description, completed = false) {
			this.id = id;
			this.description = description;
			this.completed = completed;
	}

	toggleComplete() {
			this.completed = !this.completed;
	}
}

class TaskManager {
	constructor() {
			const flatTasks = JSON.parse(localStorage.getItem('tasks')) || []
			this.tasks = flatTasks.map(task => new Task(task.id, task.description, task.completed));
			this.loadTasks();
	}

	addTask(description) {
			const id = this.tasks.length ? this.tasks[this.tasks.length - 1].id + 1 : 1;
			const task = new Task(id, description);
			this.tasks.push(task);
			this.saveTasks();
			this.renderTasks();
	}

	deleteTask(id) {
			this.tasks = this.tasks.filter(task => task.id !== id);
			this.saveTasks();
			this.renderTasks();
	}

	toggleTaskComplete(id) {
			const task = this.tasks.find(task => task.id === id);
			if (task) {
					task.toggleComplete();
					this.saveTasks();
					this.renderTasks();
			}
	}

	saveTasks() {
			localStorage.setItem('tasks', JSON.stringify(this.tasks));
	}

	loadTasks() {
			this.renderTasks();
	}

	renderTasks() {
		const taskList = document.getElementById('task-list');
    taskList.innerHTML = '';
    this.tasks.forEach(task => {
        const item = document.createElement('li');
        const span = document.createElement('span');
        span.textContent = task.description;
        item.appendChild(span);
        item.className = 'task ' + (task.completed ? 'completed' : '');
        item.addEventListener('click', () => this.toggleTaskComplete(task.id));

				const deleteButton = document.createElement('button');
				const editButton = document.createElement('button');
				editButton.textContent = 'Editar';
				editButton.addEventListener('click', (e) => {
						e.stopPropagation();
						const newDescription = prompt('Ingrese la nueva descripción:');
						if (newDescription) {
					task.description = newDescription;
					this.saveTasks();
					this.renderTasks();
						}
				});
				
				item.appendChild(editButton);
        deleteButton.textContent = 'Eliminar';
        deleteButton.addEventListener('click', (e) => {
            e.stopPropagation(); 
            this.deleteTask(task.id);
        });

        item.appendChild(deleteButton);
        taskList.appendChild(item);
    });
	}
}

document.addEventListener('DOMContentLoaded', () => {
	const taskManager = new TaskManager();

	document.getElementById('add-task').addEventListener('click', () => {
			const newTask = document.getElementById('new-task').value;
			if (newTask) {
					taskManager.addTask(newTask);
					document.getElementById('new-task').value = '';
			}
	});
});