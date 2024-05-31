
var dataForm = document.getElementById('dataForm');
var dataTable = document.getElementById('dataTable');
var tbody = dataTable.querySelector('tbody');

var data = [];
var editIndex = -1; 

dataForm.addEventListener('submit', function (event) {
    event.preventDefault();

    var name = document.getElementById('name').value;
    var mobile = document.getElementById('mobile').value;
    var age = document.getElementById('age').value;
    var birthdate = document.getElementById('birthdate').value;
    var email = document.getElementById('email').value;
    var gender = document.getElementById('gender').value;
    var img = document.getElementById('img').files[0];
 

    if (editIndex === -1) {
        var person = { name, mobile, age, birthdate, email, gender, img: URL.createObjectURL(img) };
        data.push(person);
    } else {
        
        data[editIndex] = { name, mobile, age, birthdate, email, gender, img: URL.createObjectURL(img) };
        editIndex = -1; 
    }

    dataForm.reset();

    show_Tabledata();
});

function show_Tabledata() {
    tbody.innerHTML = '';

    data.forEach((user, index) => {
        var row = document.createElement('tr');
        row.innerHTML = `
            <td>${user.name}</td>
            <td>${user.mobile}</td>
            <td>${user.age}</td>
            <td>${user.birthdate}</td>
            <td>${user.email}</td>
            <td>${user.gender}</td>
            <td><img src="${user.img}" alt="User Image"></td>
            <td><button onclick="editRow(${index})">edit</button></td>
            <td><button onclick="deleteRow(${index})">delete</button></td>
        `;
        tbody.appendChild(row);

        var row = document.createElement('tr');
        row.innerHTML = `
        <td>${user.name}</td>
        <td>${user.name}</td>

        `

    
        
    });
}

function editRow(index) {
    
    var user = data[index];
    document.getElementById('name').value = user.name;
    document.getElementById('mobile').value = user.mobile;
    document.getElementById('age').value = user.age;
    document.getElementById('birthdate').value = user.birthdate;
    document.getElementById('email').value = user.email;
    document.getElementById('gender').value = user.gender;
    
    editIndex = index;
}

function deleteRow(index) {
    
    data.splice(index, 1);
    show_Tabledata(); // 
}

show_Tabledata();


function downloadJson() {
    var jsonContent = JSON.stringify(data, null, 2);

    var blob = new Blob([jsonContent], { type: 'application/json' });
    var url = URL.createObjectURL(blob);

  
    var a = document.createElement('a');
    a.href = url;
    a.download = 'data.json';
    a.click();

   
    URL.revokeObjectURL(url);
}


document.getElementById('downloadJson').addEventListener('click', function () {
    downloadJson();
});



