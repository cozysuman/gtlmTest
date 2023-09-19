document.addEventListener('DOMContentLoaded', function() {

    const addUserBtn = document.getElementById('addUserBtn');
    const userTable = document.getElementById('userTable');
    const editModal = document.getElementById('editModal');
    const deleteModal = document.getElementById('deleteModal');
    const addModal = document.getElementById('addModal');
    const saveEditBtn = document.getElementById('saveEditBtn');
    const confirmDeleteBtn = document.getElementById('confirmDeleteBtn');
    const cancelDeleteBtn = document.getElementById('cancelDeleteBtn');
    const saveNewUserBtn = document.getElementById('saveNewUserBtn');
    const cancelNewUserBtn = document.getElementById('cancelNewUserBtn');
    const cancelEditUserBtn = document.getElementById('cancelEditUserBtn');

    //current index of user
    var index=0;

    addUserBtn.addEventListener('click', openAddModal);

    // Sample initial user data, make sure role case match the option value case under select
    let users = [
        { employeeID: '001', username: 'Sam', role: 'Developer' },
        { employeeID: '002',username: 'Evelyn', role: 'Manager' },
        { employeeID: '003',username: 'David', role: 'Admin' },
        { employeeID: '004',username: 'User 4', role: 'Developer' },
        { employeeID: '005',username: 'User 5', role: 'Developer' }
    ];

    //populate user table
    function populateTable() {
        //every time this table is populated, reset the userTable with the headings only
        //data is populated using loop below
        userTable.innerHTML = `
            <tr>
                <th>Employee ID</th>
                <th>Username</th>
                <th>Role</th>
                <th>Action</th>
            </tr>
        `;

        users.forEach((user, index) => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${user.employeeID}</td>
                <td>${user.username}</td>
                <td>${user.role}</td>
                <td>
                    <button class="editBtn" data-index="${index}">Edit</button>
                    <button class="deleteBtn" data-index="${index}">Delete</button>
                </td>
            `;
            userTable.appendChild(row);
        });

        const editButtons = document.querySelectorAll('.editBtn');
        const deleteButtons = document.querySelectorAll('.deleteBtn');

        editButtons.forEach(button => {
            button.addEventListener('click', openEditModal);
        });

        deleteButtons.forEach(button => {
            button.addEventListener('click', openDeleteModal);
        });
    }

    populateTable();

    //make add user modal appear
    function openAddModal() {
        //reset values for username and role
        document.getElementById('newEmployeeID').value="";
        document.getElementById('newName').value="";
        document.getElementById('newRole').value="";
        addModal.style.display = 'block';
    }

    //save new user function
    saveNewUserBtn.addEventListener('click', function() {
        const newEmployeeID = document.getElementById('newEmployeeID').value;
        const newName = document.getElementById('newName').value;
        const newRole = document.getElementById('newRole').value;

        //validations to check for empty values
        if (newEmployeeID === "" || newEmployeeID === undefined || newEmployeeID === null) {
            alert("Please fill in Employee Id.")
        }else if (newName === "" || newName === undefined || newName === null) {
            alert("Please fill in new username.")
        }else if (newRole === "" || newRole === undefined || newRole === null) {
            alert("Please fill in new role.")
        }else{
            users.push({ employeeID:newEmployeeID, username: newName, role: newRole });

            addModal.style.display = 'none';
            populateTable();
        }
 
    });

    //cancel save new user
    cancelNewUserBtn.addEventListener('click', function() {
        addModal.style.display = 'none';
    });


    //edit user function
    function openEditModal(event) {
        //extract current user details with current index
        index = event.target.getAttribute('data-index');
        var user = users[index];

        //insert current user details to the input fields
        document.getElementById('editEmployeeID').value = user.employeeID;
        document.getElementById('editName').value = user.username;
        document.getElementById('editRole').value = user.role;

        editModal.style.display = 'block';  
    }

    saveEditBtn.addEventListener('click', function(){
        var employeeID = document.getElementById('editEmployeeID').value;
        var username = document.getElementById('editName').value;
        var role = document.getElementById('editRole').value;

               //validations to check for empty values
            if (employeeID === "" || employeeID === undefined || employeeID === null) {
                alert("Please fill in Employee Id.")
            }else if (username === "" || username === undefined || username === null) {
                alert("Please fill in new username.")
            }else if (role === "" || role === undefined || role === null) {
                alert("Please fill in new role.")
            }else{
                //save to users array after validation
                users[index].employeeID = employeeID;
                users[index].username = username;
                users[index].role = role;
                editModal.style.display = 'none';
                populateTable();
            }
   
    });

    cancelEditUserBtn.addEventListener('click', function(){
        editModal.style.display = 'none';
    });

    //delete user function
    function openDeleteModal(event) {
        index = event.target.getAttribute('data-index');
        deleteModal.style.display = 'block';
    }

    //confirm the deletion of current user at current index
    confirmDeleteBtn.addEventListener('click', function() {
        users.splice(index, 1);
        deleteModal.style.display = 'none';
        populateTable();
    });

    //cancel deletion of user
    cancelDeleteBtn.addEventListener('click', function() {
        deleteModal.style.display = 'none';
    });

});
