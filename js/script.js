var checkbox = document.querySelector("input[type=checkbox]");


const form = document.querySelector("#form-task");
const inputDescription = document.querySelector("#input-description");
const inputAuthor = document.querySelector("#input-author");
const inputDept = document.querySelector("#input-dept");

const tableBody = document.querySelector("#todo-list");

id = 0;

form.addEventListener('submit', (e) => {
	e.preventDefault();


	const task = {
		"id": id++,
		"description": inputDescription.value,
		"author": inputAuthor.value,
		"dept": inputDept.value,
		"important": document.querySelector('input[name="rate"]:checked').value
	};

	const task_el = document.createElement('tr');
	task_el.classList.add('task');

	const task_checkbox_el = document.createElement('td');
	const task_checkbox_input_el = document.createElement('input');
	task_checkbox_input_el.setAttribute('type', 'checkbox');
	task_checkbox_el.appendChild(task_checkbox_input_el);
	task_el.appendChild(task_checkbox_el);

	task_checkbox_input_el.addEventListener('change', function () {
		if (this.checked) {
			// 
		} else {
			console.log("Checkbox is not checked..");
		}
	});


	for (const key in task) {
		if (key === 'id') {
			continue;
		}
		const task_content_el = document.createElement('td');
		task_content_el.classList.add(key);
		if (key === 'important') {
			task_content_el.innerText = task[key] + '⭐';
		}
		else {
			task_content_el.innerText = task[key];
		}
		task_el.appendChild(task_content_el);
	}


	const task_actions_el = document.createElement('td');
	task_actions_el.classList.add('actions-td');

	const task_edit_el = document.createElement('button');
	task_edit_el.classList.add('edit-button');
	const task_edit_img_el = document.createElement('img');
	task_edit_img_el.setAttribute('src', 'images/pencil.png');
	task_edit_img_el.setAttribute('alt', 'editar');
	task_edit_el.appendChild(task_edit_img_el);
	task_actions_el.appendChild(task_edit_el);

	const task_delete_el = document.createElement('button');
	task_delete_el.classList.add('remove-button');
	const task_delete_img_el = document.createElement('img');
	task_delete_img_el.setAttribute('src', 'images/remove.png');
	task_delete_img_el.setAttribute('alt', 'remover');
	task_delete_el.appendChild(task_delete_img_el);
	task_actions_el.appendChild(task_delete_el);

	task_el.appendChild(task_actions_el);

	tableBody.appendChild(task_el);

	task_delete_el.addEventListener('click', (e) => {
		e.preventDefault();
		task_el.remove();
	});

	// form.reset();
});