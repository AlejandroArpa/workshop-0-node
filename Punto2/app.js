const validateGrade = function (grade, callback) {
	try {
		if (grade === '') {
			throw new Error('Debe ingresar una nota');
		}
		else if (grade > 5 || grade < 0) {
			throw new Error('Nota invalida');
		}
		else {
			callback(grade)
		}
	} catch (error) {
		alert(error.message);
		return
	}
}



class Grade {
	constructor(id, grade, important = false) {
		this.id = id;
		this.grade = grade;
		this.important = important;
	}

	toggleImportant() {
		this.important = !this.important;
	}
}

class GradeManager {
	constructor() {
		const flatGrades = JSON.parse(localStorage.getItem('grades')) || []
		this.grades = flatGrades.map(grade => new Grade(grade.id, grade.grade, grade.important));
		this.loadGrades();
	}

	addGrade(grade) {
		const id = this.grades.length ? this.grades[this.grades.length - 1].id + 1 : 1;
		const newGrade = new Grade(id, grade);
		this.grades.push(newGrade);
		this.saveGrades();
		this.renderGrades();
	}

	editGrade(id, newgrade) {
		const grade = this.grades.find(grade => grade.id === id);
		if (grade) {
			grade.grade = newgrade;
			this.saveGrades();
			this.renderGrades();
		}
	}

	deleteGrade(id) {
		this.grades = this.grades.filter(grade => grade.id !== id);
		this.saveGrades();
		this.renderGrades();
	}

	toggleGradeImportant(id) {
		const grade = this.grades.find(grade => grade.id === id);
		if (grade) {
			grade.toggleImportant();
			this.saveGrades();
			this.renderGrades();
		}
	}

	saveGrades() {
		localStorage.setItem('grades', JSON.stringify(this.grades));
	}

	loadGrades() {
		this.renderGrades();
	}

	renderGrades() {
		const gradeList = document.getElementById('grade-list');
		gradeList.innerHTML = '';
		this.grades.forEach(grade => {
			const item = document.createElement('li');
			const span = document.createElement('span');
			span.textContent = grade.grade;
			item.appendChild(span);
			item.className = 'grade ' + (grade.important ? 'important' : '');
			item.addEventListener('click', () => this.toggleGradeImportant(grade.id));
			const deleteButton = document.createElement('button');
			const editButton = document.createElement('button');
			editButton.textContent = 'Editar';
			editButton.addEventListener('click', (e) => {
				e.stopPropagation();
				const newgrade = prompt('Ingrese la nueva nota:');
				validateGrade(newgrade, this.editGrade.bind(this, grade.id));
			});

			item.appendChild(editButton);
			deleteButton.textContent = 'Eliminar';
			deleteButton.addEventListener('click', (e) => {
				e.stopPropagation();
				this.deleteGrade(grade.id);
			});

			item.appendChild(deleteButton);
			gradeList.appendChild(item);
		});
	}
}


document.addEventListener('DOMContentLoaded', () => {
	const gradeManager = new GradeManager();

	document.getElementById('add-grade').addEventListener('click', () => {
		const newgrade = document.getElementById('new-grade').value;
		if (newgrade) {
			validateGrade(newgrade, gradeManager.addGrade.bind(gradeManager));

			document.getElementById('new-grade').value = '';
		}
	});
});