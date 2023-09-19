document.addEventListener('DOMContentLoaded', function() {

    const addGroupBtn = document.getElementById('addGroupBtn');
    const groupsTable = document.getElementById('groupsTable');
    const editModal = document.getElementById('editModal');
    const deleteModal = document.getElementById('deleteModal');
    const addModal = document.getElementById('addModal');
    const saveEditBtn = document.getElementById('saveEditBtn');
    const confirmDeleteBtn = document.getElementById('confirmDeleteBtn');
    const cancelDeleteBtn = document.getElementById('cancelDeleteBtn');
    const saveNewGroupBtn = document.getElementById('saveNewGroupBtn');
    const cancelNewGroupBtn = document.getElementById('cancelNewGroupBtn');
    const cancelEditGroupBtn = document.getElementById('cancelEditGroupBtn');

    //adding different members to groups
    const memberSelect = document.getElementById("member-select");
    const editMemberSelect = document.getElementById("edit-member-select");
    const addMemberBtn = document.getElementById("add-member-btn");
    const editAddMemberBtn = document.getElementById("edit-add-member-btn");
    const selectedMembersList = document.getElementById("selected-members");
    const editSelectedMembersList = document.getElementById("edit-selected-members");
    let editStatus = false;

    //current index of group
    var index=0;

    addGroupBtn.addEventListener('click', openAddModal);

    // Sample initial groups data
    let groups = [
        { name: 'Group A', members: 'Mary, John', description: 'Data exploration project' },
        { name: 'Group B',members: 'Sam, Sabrina', description: 'Testing team for data exploration' },
    ];

    //populate groups table
    function populateTable() {
        //every time this table is populated, reset the groupsTable with the headings only
        //data is populated using loop below
        groupsTable.innerHTML = `
            <tr>
                <th>Name</th>
                <th>Members</th>
                <th>Description</th>
                <th>Action</th>
            </tr>
        `;

        groups.forEach((group, index) => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${group.name}</td>
                <td>${group.members}</td>
                <td>${group.description}</td>
                <td>
                    <button class="editBtn" data-index="${index}">Edit</button>
                    <button class="deleteBtn" data-index="${index}">Delete</button>
                </td>
            `;
            groupsTable.appendChild(row);
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

    //make add group modal appear
    function openAddModal() {
        //reset values for name, members, description
        document.getElementById('name').value="";
        document.getElementById('member-select').value="";
        document.getElementById('description').value="";
        
        //clear selected members list
        while(selectedMembersList.firstChild){
            selectedMembersList.removeChild(selectedMembersList.firstChild);
        }

        //populate or upate the members select options
        reloadMembersOptions();

        addModal.style.display = 'block';
    }

    //save new group function
    saveNewGroupBtn.addEventListener('click', function() {
        
        const grp_name = document.getElementById('name').value;
        const grp_description = document.getElementById('description').value;

        //extract all the member names as text
        var membersArray=[];
        var memberElements = selectedMembersList.querySelectorAll("li");

        //perform validations
        if (grp_name === "" || grp_name === undefined || grp_name === null) {
            alert("Please fill in Group Name.")
        }else if (memberElements.length === 0 || memberElements.length === 1) {
            alert("Please select at least 2 members.")
        }else if (grp_description === "" || grp_description === undefined || grp_description === null) {
            alert("Please fill in group description.")
        }else{
            //save the group details
            //extract member names
            memberElements.forEach((li)=>{
                //membersArray.push(li.textContent);
    
                    // Exclude the remove <button> elements within the <li>
                    var memberName = Array.from(li.childNodes)
                    .filter((node) => node.nodeType === Node.TEXT_NODE)
                    .map((node) => node.textContent.trim())
                    .join(""); // Concatenate text nodes within the <li> element
    
                    // Add the extracted text content to the array
                    if (memberName) {
                        membersArray.push(memberName);
                    }
    
            });
            
            var combinedMembers = membersArray.join(", ");
    
            groups.push({ name:grp_name, members: combinedMembers, description: grp_description });
    
            addModal.style.display = 'none';
            populateTable();

        }

    });

    //cancel save new group
    cancelNewGroupBtn.addEventListener('click', function() {
        addModal.style.display = 'none';
    });


    //edit group function
    function openEditModal(event) {
        editStatus = true;
        //clear the selection box
        editMemberSelect.value="";

        var editSelectedMembersList = document.getElementById("edit-selected-members");

        //clear the currently selected members to prevent built-up of members
        while(editSelectedMembersList.firstChild){
            editSelectedMembersList.removeChild(editSelectedMembersList.firstChild);
        }

        //extract current group details with current index
        index = event.target.getAttribute('data-index');
        var group = groups[index];

        //insert current group details to the input fields
        document.getElementById('editGroupName').value = group.name;
        document.getElementById('editDescription').value = group.description;

        //split the list of members using comma delimiter
        var membersArray = group.members.split(", ");

        //populate list with current members
        membersArray.forEach((member)=>{
            var listItem = document.createElement("li");
            listItem.innerHTML = `${member} <button class="remove-member-btn">Remove</button>`;
    
            //append li to the parent ul in the groups page
            editSelectedMembersList.appendChild(listItem);

            // Add click event listener to remove the member
            var removeMemberBtn = listItem.querySelector(".remove-member-btn");
            removeMemberBtn.addEventListener("click", function () {
                listItem.remove();
                reloadEditMembersOptions()
            });
        });

        //populate or upate the members select options
        reloadEditMembersOptions();

        editModal.style.display = 'block';  
    }

    saveEditBtn.addEventListener('click', function(){
        var grp_name = document.getElementById('editGroupName').value;
        var grp_description = document.getElementById('editDescription').value;

        //extract all the member names as text
        var membersArray=[];
        var memberElements = editSelectedMembersList.querySelectorAll("li");

        //perform validations
        if (grp_name === "" || grp_name === undefined || grp_name === null) {
            alert("Please fill in Group Name.")
        }else if (memberElements.length === 0 || memberElements.length === 1) {
            alert("Please select at least 2 members.")
        }else if (grp_description === "" || grp_description === undefined || grp_description === null) {
            alert("Please fill in group description.")
        }else{
            //saving the group details post validation
            groups[index].name = document.getElementById('editGroupName').value;
            groups[index].description = document.getElementById('editDescription').value;

            memberElements.forEach((li)=>{

                // Exclude the remove <button> elements within the <li>
                var memberName = Array.from(li.childNodes)
                .filter((node) => node.nodeType === Node.TEXT_NODE)
                .map((node) => node.textContent.trim());

                // Add the extracted text content to the array
                if (memberName) {
                    membersArray.push(memberName);
                }

            });

            var combinedMembers = membersArray.join(", ");
            groups[index].members = combinedMembers;
    
            editModal.style.display = 'none';
            populateTable();
        }
        

    });

    cancelEditGroupBtn.addEventListener('click', function(){
        editModal.style.display = 'none';
    });

    //delete group function
    function openDeleteModal(event) {
        index = event.target.getAttribute('data-index');
        deleteModal.style.display = 'block';
    }

    //confirm the deletion of current group at current index
    confirmDeleteBtn.addEventListener('click', function() {
        groups.splice(index, 1);
        deleteModal.style.display = 'none';
        populateTable();
    });

    //cancel deletion of group
    cancelDeleteBtn.addEventListener('click', function() {
        deleteModal.style.display = 'none';
    });
    

    //add member button within the add modal
    addMemberBtn.addEventListener("click", function () {
        var selectedMember = memberSelect.value;

        if (selectedMember) {
            var listItem = document.createElement("li");
            listItem.innerHTML = `${selectedMember} <button class="remove-member-btn">Remove</button>`;

            //append li to the parent ul in the groups page
            selectedMembersList.appendChild(listItem);

            // Add click event listener to remove the member
            var removeMemberBtn = listItem.querySelector(".remove-member-btn");
            removeMemberBtn.addEventListener("click", function () {
                listItem.remove();
                reloadMembersOptions()
            });
        }

        //reload the member select options for add group modal
        reloadMembersOptions();
    });

    //add member button within the edit modal
    editAddMemberBtn.addEventListener("click", function () {
        var selectedMember = editMemberSelect.value;

        if (selectedMember) {
            var listItem = document.createElement("li");
            listItem.innerHTML = `${selectedMember} <button class="remove-member-btn">Remove</button>`;

            //append li to the parent ul in the groups page
             editSelectedMembersList.appendChild(listItem);

            // Add click event listener to remove the member
            var removeMemberBtn = listItem.querySelector(".remove-member-btn");
            removeMemberBtn.addEventListener("click", function () {
                listItem.remove();
                reloadEditMembersOptions()
            });

            reloadEditMembersOptions();

            // Clear the selected member from the dropdown
            editMemberSelect.value = "";
        }
    });


    let members = ['Ben','Evelyn','John','Mary','Sam','Sabrina'];

    //reload members section
function reloadMembersOptions(){
    var memberSelect = document.getElementById("member-select");

    //remove all existing elements from the select tag for members, before we populate
    while (memberSelect.length > 0) {
        memberSelect.remove(0);
    }

    var selectedMembersList = document.getElementById("selected-members");
    var selectedMembersLiElements = selectedMembersList.querySelectorAll("li");

    for(var i=0;i<members.length;i++){
        var alreadySelected = false;

        var option = document.createElement("option");

        selectedMembersLiElements.forEach(function (li){
            //extract the first member string before the remove button
            if (li.textContent.split(" ")[0]=== members[i]) {
                // If the content matches, set the flag to true
                alreadySelected = true;
            }
        });

        if(!alreadySelected){
            option.text=members[i];
            memberSelect.append(option);
        }

    }
};

function reloadEditMembersOptions(){
    var editMemberSelect = document.getElementById("edit-member-select");

    //remove all existing elements from the select tag for members, before we populate
    while (editMemberSelect.length > 0) {
        editMemberSelect.remove(0);
    }

    var selectedMembersList = document.getElementById("edit-selected-members");
    var selectedMembersLiElements = selectedMembersList.querySelectorAll("li");

    for(var i=0;i<members.length;i++){
        var alreadySelected = false;

        var option = document.createElement("option");

        selectedMembersLiElements.forEach(function (li){
            //extract the first member string before the remove button
            if (li.textContent.split(" ")[0]=== members[i]) {
                // If the content matches, set the flag to true
                alreadySelected = true;
            }
        });

        if(!alreadySelected){
            option.text=members[i];
            editMemberSelect.append(option);
        }

    }
}

});



