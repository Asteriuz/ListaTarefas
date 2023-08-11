var checkbox = document.querySelector("input[type=checkbox]");


const form = document.querySelector("#form-task");
const inputDescription = document.querySelector("#input-description");
const inputAuthor = document.querySelector("#input-author");
const inputDept = document.querySelector("#input-dept");

const tableBody = document.querySelector("#todo-list");

// if (tableBody.rows.length == 0) {
// 	document.querySelector("#table-task").style.display = "none";
// }

id = 0;

form.addEventListener('submit', (e) => {
	e.preventDefault();

	if (tableBody.rows.length == 0) {
		document.querySelector("#table-task").style.display = "block";
	}

	if (document.querySelector('input[name="rate"]:checked') == null) {
		alert("Por favor, selecione a importância da tarefa.");
		return false;
	};

	const task = {
		"id": id++,
		"description": inputDescription.value,
		"author": inputAuthor.value,
		"dept": inputDept.value,
		"important": document.querySelector('input[name="rate"]:checked').value
	};

	const taskEl = document.createElement('tr');
	taskEl.classList.add('task');

	const taskCheckbox = document.createElement('td');
	const taskCheckboxInput = document.createElement('input');
	taskCheckboxInput.setAttribute('type', 'checkbox');
	taskCheckbox.appendChild(taskCheckboxInput);
	taskEl.appendChild(taskCheckbox);

	taskCheckboxInput.addEventListener('change', function () {
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
		taskEl.appendChild(task_content_el);
	}

	const taskActions = document.createElement('td');
	taskActions.classList.add('actions-td');

	const taskEditBtn = document.createElement('button');
	taskEditBtn.classList.add('edit-button');
	const taskEditImg = document.createElement('img');
	taskEditImg.setAttribute('src', 'images/pencil.png');
	taskEditImg.setAttribute('alt', 'editar');
	taskEditBtn.appendChild(taskEditImg);
	taskActions.appendChild(taskEditBtn);

	const taskDelBtn = document.createElement('button');
	taskDelBtn.classList.add('remove-button');
	const taskDelImg = document.createElement('img');
	taskDelImg.setAttribute('src', 'images/remove.png');
	taskDelImg.setAttribute('alt', 'remover');
	taskDelBtn.appendChild(taskDelImg);
	taskActions.appendChild(taskDelBtn);

	taskEl.appendChild(taskActions);

	tableBody.appendChild(taskEl);

	taskDelBtn.addEventListener('click', (e) => {
		e.preventDefault();
		taskEl.remove();

		if (tableBody.rows.length == 0) {
			document.querySelector("#table-task").style.display = "none";
		}
	});

	// form.reset();
});

function sortTable(n) {
	var table, rows, switching, i, x, y, shouldSwitch, dir, switchcount = 0;
	table = document.getElementById("table-task");
	switching = true;
	dir = "asc";
	while (switching) {
		switching = false;
		rows = table.rows;
		for (i = 1; i < (rows.length - 1); i++) {
			shouldSwitch = false;
			x = rows[i].getElementsByTagName("TD")[n];
			y = rows[i + 1].getElementsByTagName("TD")[n];
			if (dir == "asc") {
				if (x.innerHTML.toLowerCase() > y.innerHTML.toLowerCase()) {
					shouldSwitch = true;
					break;
				}
			} else if (dir == "desc") {
				if (x.innerHTML.toLowerCase() < y.innerHTML.toLowerCase()) {
					shouldSwitch = true;
					break;
				}
			}
		}
		if (shouldSwitch) {
			rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
			switching = true;
			switchcount++;
		} else {
			if (switchcount == 0 && dir == "asc") {
				dir = "desc";
				switching = true;
			}
		}
	}
}

descriptionTh = document.querySelector("#description-th");
authorTh = document.querySelector("#author-th");
deptTh = document.querySelector("#dept-th");
importantTh = document.querySelector("#important-th");

descriptionTh.addEventListener('click', (e) => {
	e.preventDefault();
	sortTable(1);
});

authorTh.addEventListener('click', (e) => {
	e.preventDefault();
	sortTable(2);
});

deptTh.addEventListener('click', (e) => {
	e.preventDefault();
	sortTable(3);
});

importantTh.addEventListener('click', (e) => {
	e.preventDefault();
	sortTable(4);
});

function myFunction() {
	document.getElementById("myDropdown").classList.toggle("show");
}


// Close the dropdown if the user clicks outside of it
window.onclick = function (event) {
	if (!event.target.matches('.dropbtn')) {
		var dropdowns = document.getElementsByClassName("dropdown-content");
		var i;
		for (i = 0; i < dropdowns.length; i++) {
			var openDropdown = dropdowns[i];
			if (openDropdown.classList.contains('show')) {
				openDropdown.classList.remove('show');
			}
		}
	}
}

function toggleCol() {
	
}