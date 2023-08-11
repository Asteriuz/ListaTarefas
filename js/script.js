var checkbox = document.querySelector("input[type=checkbox]");


const form = document.querySelector("#form-task");
const inputDescription = document.querySelector("#input-description");
const inputAuthor = document.querySelector("#input-author");
const inputDept = document.querySelector("#input-dept");

const tableBody = document.querySelector("#todo-list");

if (tableBody.rows.length == 0) {
	document.querySelector("#table-task").style.display = "none";
}

let id = 0;

let tableCols = {
	"description": true,
	"author": true,
	"dept": true,
	"important": true
};

form.addEventListener('submit', (e) => {
	e.preventDefault();

	th = document.querySelectorAll("th");
	for (i = 0; i < th.length; i++) {
		th[i].classList.remove("ascending");
	}

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
		const taskContentEl = document.createElement('td');
		taskContentEl.classList.add(key);
		if (!tableCols[key]) {
			taskContentEl.classList.add("hide");
		}

		if (key === 'important') {
			taskContentEl.innerText = task[key] + '⭐';
		}
		else {
			taskContentEl.innerText = task[key];
		}
		taskEl.appendChild(taskContentEl);
	}

	const taskActions = document.createElement('td');
	taskActions.classList.add('actions-td');

	// const taskEditBtn = document.createElement('button');
	// taskEditBtn.classList.add('edit-button');
	// const taskEditImg = document.createElement('img');
	// taskEditImg.setAttribute('src', 'images/pencil.png');
	// taskEditImg.setAttribute('alt', 'editar');
	// taskEditBtn.appendChild(taskEditImg);
	// taskActions.appendChild(taskEditBtn);

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
	form.reset();
});

function sortTable(n) {
	let table, rows, switching, i, x, y, shouldSwitch, dir, switchcount = 0;
	table = document.getElementById("table-task");
	switching = true;
	dir = "asc";
	th = document.querySelectorAll("th");
	for (i = 0; i < th.length; i++) {
		th[i].classList.remove("ascending");
		th[i].classList.remove("descending");
	}
	th[n].classList.add("ascending");
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
				th[n].classList.remove("ascending");
				th[n].classList.add("descending");
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
};

function toggleCol(n) {
	if (n == 1) {
		let col = document.getElementsByClassName("description");
		for (let i = 0; i < col.length; i++) {
			col[i].classList.toggle("hide");
		}
		document.getElementById("description-th").classList.toggle("hide");
		tableCols["description"] = !tableCols["description"];
	}
	if (n == 2) {
		let col = document.getElementsByClassName("author");
		for (let i = 0; i < col.length; i++) {
			col[i].classList.toggle("hide");
		}
		document.getElementById("author-th").classList.toggle("hide");
		tableCols["author"] = !tableCols["author"];
	}
	if (n == 3) {
		let col = document.getElementsByClassName("dept");
		for (let i = 0; i < col.length; i++) {
			col[i].classList.toggle("hide");
		}
		document.getElementById("dept-th").classList.toggle("hide");
		tableCols["dept"] = !tableCols["dept"];
	}
	if (n == 4) {
		let col = document.getElementsByClassName("important");
		for (let i = 0; i < col.length; i++) {
			col[i].classList.toggle("hide");
		}
		document.getElementById("important-th").classList.toggle("hide");
		tableCols["important"] = !tableCols["important"];
	}
	if (n == 5) {
		let col = document.getElementsByClassName("actions-td");
		for (let i = 0; i < col.length; i++) {
			col[i].classList.toggle("hide");
		}
		document.getElementById("actions-th").classList.toggle("hide");
		tableCols["actions"] = !tableCols["actions"];
	}
}