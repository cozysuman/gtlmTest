let currentColumn;
let editMode = false;
let editedTaskIndex = -1;
let uniqueTitle = true;

//arrays to store tasks under different columns
const todoTasksArray = [];
const inProgressTasksArray = [];
const completedTasksArray = [];

document.addEventListener('DOMContentLoaded', () => {
    reloadAssigneeOptions();
});

function reloadAssigneeOptions(){
    var selectAssignee = document.getElementById("newAssignee");

    //remove all existing elements from the select tag for assignees, before we populate
    while (selectAssignee.length > 0) {
        selectAssignee.remove(0);
    }

        var selectedAssignees = document.getElementById("selected-assignees");
        var selectedAssigneesListLiElements = selectedAssignees.querySelectorAll("li");

        //populate the options for assignees
        var options = ["Sam","John","Mark","Evelyn","GroupA","GroupB"];

        for(var i=0;i<options.length;i++){
            var alreadySelected = false;

            var option = document.createElement("option");

            selectedAssigneesListLiElements.forEach(function (li){
                //extract the first name before the remove button
                if (li.textContent.split(" ")[0]=== options[i]) {
                    // If the content matches, set the flag to true
                    alreadySelected = true;
                }
            });

            if(!alreadySelected){
                option.text = options[i];
                selectAssignee.append(option);
            }
        }
    
}


//open add task modal window
function openAddTaskModal(column){
    console.log("current column: "+column);

    currentColumn = column;
    editMode = false;
    //editedTaskIndex = -1;

    //reset the values from pop-up
    document.getElementById('task-title').value = '';
    document.getElementById('task-status').value = currentColumn;
    document.getElementById('newSprint').value ='';
    document.getElementById('newType').value ='';
    document.getElementById('newPriority').value ='';
    document.getElementById('newDueDate').value ='';
    document.getElementById("newAssignee").value='';
    document.getElementById('task-description').value = '';
    document.getElementById("fileInput").value="";
    document.getElementById("uploadedFile").innerHTML=""; // Get the element by its id


    var selectedAssignees = document.getElementById("selected-assignees");

    //remove all existing elements from the selected assignees list before we populate
    while (selectedAssignees.firstChild) {
        selectedAssignees.removeChild(selectedAssignees.firstChild);
      }

    reloadAssigneeOptions();

    document.getElementById('task-modal').style.display = 'block';
}

//close add task modal window
function closeTaskModal(){
    document.getElementById('task-modal').style.display = 'none';
}

function saveTask(){
    uniqueTitle = true; //reset

    var title = document.getElementById('task-title').value;
    var status = document.getElementById('task-status').value;
    var sprint = document.getElementById('newSprint').value;
    var type = document.getElementById('newType').value;
    var priority = document.getElementById('newPriority').value;
    var dueDate = document.getElementById('newDueDate').value;
    var description = document.getElementById('task-description').value;

    //extract the selected assignees
    var selectedAssignees = document.getElementById("selected-assignees");
    var selectedAssigneesListLiElements = selectedAssignees.querySelectorAll("li");

    //the assignees array
    var assignee = [];

    selectedAssigneesListLiElements.forEach(function(li){
        // Exclude the remove <button> elements within the <li>
        var assigneeName = Array.from(li.childNodes)
        .filter((node) => node.nodeType === Node.TEXT_NODE)
        .map((node) => node.textContent.trim());

        // Add the extracted text(assignee) content to the array
        if (assigneeName) {
            assignee.push(assigneeName);
        }
    });

    //validation for title
    if (!title) {
        alert('Please enter a task title.');
    }else{

        var task = { title, status, sprint,type,priority,dueDate, assignee,description};

    if (editMode) {
        // Editing an existing task
        //console.log("am I updated?")
        updateTask(task);
        closeTaskModal();
    } else {

        //check if the task title is unique for the column before saving
        uniqueTitleChecker(task);
        console.log("uniqueTitle? "+ uniqueTitle);
        //task title is unique

        if(uniqueTitle){
                // Adding a new task
                addTask(task);
                //saved task to respective task array, the index of the task in array match the index of task in column
                
                //check the type of task based on the task status & save task to the respective array
                if(status==="todo"){
                    todoTasksArray.push(task);
                }else if(status==="inprogress"){
                    inProgressTasksArray.push(task);
                }else if(status==="completed"){
                    completedTasksArray.push(task);
                }

                closeTaskModal();
        }else{
            alert("Please enter a unique task title.");
        }
    }


        
    }
    
}

function addTask(task){
    const taskElement = document.createElement('div');
    taskElement.classList.add('task');
    taskElement.setAttribute('id', `${task.title}`); 
    taskElement.setAttribute('draggable', 'true'); 
    taskElement.innerHTML = `<span>${task.title}</span>`;
    taskElement.onclick = () => editTask(task);

    // Add the ondragstart event handler to initiate drag-and-drop
    taskElement.ondragstart = dragStartWithinColumn;
    taskElement.ondragenter= dragEnter;
    taskElement.ondragleave=dragLeave;
    taskElement.ondrop = (event) => dropWithinColumn(event, task.status);
    taskElement.ondragover = dragOverWithinColumn;
    //add task to the column in the html page based on column id
    document.getElementById(`${task.status}-tasks`).appendChild(taskElement);
}
function dragStart(event) {
    event.dataTransfer.setData("text/plain", event.target.id);
}
// Function to allow drop and prevent the default behavior
function allowDrop(event) {
    event.preventDefault();  
}
// Function to handle the dragenter event
function dragEnter(event) {
    event.preventDefault();
    event.target.classList.add('drag-over');
}

// Function to handle the dragleave event
function dragLeave(event) {
    event.preventDefault();
    // Remove the visual feedback when the draggable element leaves the drop target
    event.target.classList.add('drag-over');
}

// Function to handle the drop event
function drop(event, status) {
    event.preventDefault();
    const taskId = event.dataTransfer.getData('text/plain');
    const taskElement = document.getElementById(taskId);
    previousStatus=taskElement.parentElement.id;
    if (`${status}-tasks` !== previousStatus) {
        // const targetColumn = document.getElementById(`${status}-tasks`);
        const targetColumn = document.getElementById(status);
        console.log("target column is "+targetColumn);
        const taskIndex = Array.from(targetColumn.getElementsByClassName('task')).indexOf(taskElement);
        // Move the task to the new column below the target task
        if (taskIndex >= 0) {
            targetColumn.insertBefore(taskElement, targetColumn.children[taskIndex + 1]);
        } else {
            // If no target task found, simply append the task to the end of the new column
            targetColumn.appendChild(taskElement);
        }
    }
    let previousArray;
    switch (previousStatus) {
        case 'todo-tasks':
            previousArray = todoTasksArray;
            break;
        case 'inprogress-tasks': 
            previousArray = inProgressTasksArray;
            break;
        case 'completed-tasks':
            previousArray = completedTasksArray;
            break;
    }
    let newStatus;
        switch (status) {
            case 'todo-tasks':
                // previousArray = inProgressTasksArray;
                newStatus = 'todo';
                break;
            case 'inprogress-tasks':
                // previousArray = todoTasksArray;
                newStatus = 'inprogress';
                break;
            case 'completed-tasks':
                // previousArray = inProgressTasksArray;
                newStatus = 'completed';
                break;
        }
        if (previousArray) {
            const taskIndexInPreviousArray = previousArray.findIndex(task => task.title === taskId);
            if (taskIndexInPreviousArray !== -1) {
                const movedTask = previousArray.splice(taskIndexInPreviousArray, 1)[0];
                movedTask.status = newStatus;
                // Push the task into the new array
                switch (newStatus) {
                    case 'todo':
                        todoTasksArray.push(movedTask);
                        break;
                    case 'inprogress':
                        inProgressTasksArray.push(movedTask);
                        break;
                    case 'completed':
                        completedTasksArray.push(movedTask);
                        break;
                }
            }
        }
    // Remove the "drag-over" class from all columns after the drop
    const allColumns = document.querySelectorAll('.tasks');
    allColumns.forEach(column => {
        column.classList.remove('drag-over');
    });
    const allTasks= document.querySelectorAll('.task');
    allTasks.forEach(column => {
        column.classList.remove('drag-over');
    });
    const allSpans = document.querySelectorAll('span');
    allSpans.forEach(column => {
        column.classList.remove('drag-over');
    });
}

let draggedTaskId = null;

function dragStartWithinColumn(event) {
    // Store the ID of the dragged task
    event.dataTransfer.setData("text/plain", event.target.id);
    draggedTaskId = event.target.id;
}

function dragOverWithinColumn(event) {
    event.preventDefault();
    const dropTarget = event.target;

    if (dropTarget.classList.contains('task')) {
        // Highlight the drop target to indicate it's a valid drop location
        dropTarget.classList.add('drag-over');
    }
}

function dropWithinColumn(event) {
    event.preventDefault();
    const dropTarget = event.target;

    if (dropTarget.classList.contains('task')) {
        // Determine the IDs of the dragged and drop-target tasks
        const dropTaskId = dropTarget.id;

        // Get the task elements and their parent column
        const column = dropTarget.parentElement;
        const tasks = Array.from(column.getElementsByClassName('task'));

        // Find the positions of the dragged and drop-target tasks
        const draggedTaskIndex = tasks.findIndex(task => task.id === draggedTaskId);
        const dropTaskIndex = tasks.findIndex(task => task.id === dropTaskId);

        // Reorder the tasks in the column
        if (draggedTaskIndex !== -1 && dropTaskIndex !== -1) {
            // Remove the dragged task from the column
            tasks.splice(draggedTaskIndex, 1);

            // Insert the dragged task at the new position
            tasks.splice(dropTaskIndex, 0, document.getElementById(draggedTaskId));

            // Reorder the tasks in the DOM
            tasks.forEach((task, index) => {
                column.appendChild(task);
            });
        }

        // Reset the drop target's highlight
        dropTarget.classList.remove('drag-over');
    }

    // Reset the draggedTaskId
    draggedTaskId = null;
}





// Function to remove a task by index from div in html
function removeTask(statusStore,editedTaskIndex) {
    var column = document.getElementById(`${statusStore}-tasks`);
    var taskElements = column.getElementsByClassName('task');
    
    column.removeChild(taskElements[editedTaskIndex]);
}

//remove task from respective array
function removeTaskFromArray(statusStore,editedTaskIndex){
    if(statusStore==="todo"){
        todoTasksArray.splice(editedTaskIndex,1);
    }else if(statusStore==="inprogress"){
        inProgressTasksArray.splice(editedTaskIndex,1);
    }else if(statusStore==="completed"){
        completedTasksArray.splice(editedTaskIndex,1);
    }
}

//populate the fields in the form with current task details
function editTask(task){
    openAddTaskModal(task.status);
    editMode = true;
    statusStore = task.status;

    console.log("EDIT A TASK"+ editedTaskIndex);

    // Get the current column's tasks (they are in div tags)
    taskIndexChecker(task);
        
    var assigneesArray=[];

    //use the index of the task to populate the task details onto the display
    if(task.status==="todo"){
        document.getElementById('task-title').value = todoTasksArray[editedTaskIndex].title;
        console.log("STATUS: "+todoTasksArray[editedTaskIndex].status);
        document.getElementById('task-status').value = todoTasksArray[editedTaskIndex].status;
        document.getElementById('newSprint').value = todoTasksArray[editedTaskIndex].sprint;
        document.getElementById('newType').value =todoTasksArray[editedTaskIndex].type;
        document.getElementById('newPriority').value =todoTasksArray[editedTaskIndex].priority;
        document.getElementById('newDueDate').value =todoTasksArray[editedTaskIndex].dueDate;
        assigneesArray = todoTasksArray[editedTaskIndex].assignee;
        document.getElementById('task-description').value = todoTasksArray[editedTaskIndex].description;

    }else if(task.status==="inprogress"){
        console.log("populate over here, index="+editedTaskIndex);
        console.log(...inProgressTasksArray);

        document.getElementById('task-title').value = inProgressTasksArray[editedTaskIndex].title;
        document.getElementById('task-status').value = inProgressTasksArray[editedTaskIndex].status;
        document.getElementById('newSprint').value = inProgressTasksArray[editedTaskIndex].sprint;
        document.getElementById('newType').value =inProgressTasksArray[editedTaskIndex].type;
        document.getElementById('newPriority').value =inProgressTasksArray[editedTaskIndex].priority;
        document.getElementById('newDueDate').value =inProgressTasksArray[editedTaskIndex].dueDate;
        assigneesArray = inProgressTasksArray[editedTaskIndex].assignee;
        document.getElementById('task-description').value = inProgressTasksArray[editedTaskIndex].description;
    
    }else if(task.status==="completed"){
        document.getElementById('task-title').value = completedTasksArray[editedTaskIndex].title;
        document.getElementById('task-status').value = completedTasksArray[editedTaskIndex].status;
        document.getElementById('newSprint').value = completedTasksArray[editedTaskIndex].sprint;
        document.getElementById('newType').value =completedTasksArray[editedTaskIndex].type;
        document.getElementById('newPriority').value =completedTasksArray[editedTaskIndex].priority;
        document.getElementById('newDueDate').value =completedTasksArray[editedTaskIndex].dueDate;
        assigneesArray = completedTasksArray[editedTaskIndex].assignee;
        document.getElementById('task-description').value = completedTasksArray[editedTaskIndex].description;
    
    }

    var selectedAssignees = document.getElementById("selected-assignees");

    //populate selected assignees list
    for(var i=0;i<assigneesArray.length;i++){
        var listItem = document.createElement("li");
        listItem.innerHTML = `${assigneesArray[i]} <button class="remove-member-btn" onclick="removeAssignee(this)">Remove</button>`;

        selectedAssignees.append(listItem);
    }

    //reload assignee options
    reloadAssigneeOptions();
}

function updateTask(task){
    console.log(editedTaskIndex);

    //extract tasks details
    var taskTitle = task.title;
    var taskStatus = task.status;
    var taskSprint = task.sprint;
    var taskType = task.type;
    var taskPriority = task.priority;
    var taskDueDate = task.dueDate;
    var assigneesArray = task.assignee;
    var taskDesc = task.description;

    const tasksColumn = document.getElementById(`${currentColumn}-tasks`);

    // Get all the task elements within status-tasks
    const taskElements = tasksColumn.getElementsByClassName('task');
    const selectedTaskElement = taskElements[editedTaskIndex];
    // const secondSpanTag = selectedTaskElement.querySelector('span');

    // Modify the contents of the second span tag
    selectedTaskElement.innerHTML = taskTitle;

    //storage for task details into the respective arrays
    //index was determined through the editTask when a task is clicked to be edited
    if(task.status==="todo"){
        //there is a status change
        if(task.status!==statusStore){
            //task status had been changed if no task is found at index in current array
            todoTasksArray.push({title:taskTitle,status:taskStatus,sprint:taskSprint,type:taskType,priority:taskPriority,dueDate:taskDueDate,assignee:assigneesArray,description:taskDesc});
            //add to div
            addTask(task);

            //remove task from previous array
            removeTaskFromArray(statusStore,editedTaskIndex);
            //remove from div
            removeTask(statusStore,editedTaskIndex);

        }else{
            //updating details of existing task
            todoTasksArray[editedTaskIndex].title=taskTitle;
            todoTasksArray[editedTaskIndex].status=taskStatus;
            todoTasksArray[editedTaskIndex].sprint=taskSprint;
            todoTasksArray[editedTaskIndex].type=taskType;
            todoTasksArray[editedTaskIndex].priority=taskPriority;
            todoTasksArray[editedTaskIndex].dueDate=taskDueDate;
            todoTasksArray[editedTaskIndex].assignee=assigneesArray;
            todoTasksArray[editedTaskIndex].description=taskDesc;
        }

    }else if(task.status==="inprogress"){

        //there is a status change
        if(task.status!==statusStore){

            //task status had been changed if no task is found at index in current array
            inProgressTasksArray.push({title:taskTitle,status:taskStatus,sprint:taskSprint,type:taskType,priority:taskPriority,dueDate:taskDueDate,assignee:assigneesArray,description:taskDesc});
            console.log("in progress array check");
            console.log(...inProgressTasksArray);
            //add to div
            addTask(task);

            //remove task from previous array
            removeTaskFromArray(statusStore,editedTaskIndex);
            //remove from div in html
            removeTask(statusStore,editedTaskIndex);

        }else{
            //updating details of existing task
            inProgressTasksArray[editedTaskIndex].title=taskTitle;
            inProgressTasksArray[editedTaskIndex].status=taskStatus;
            inProgressTasksArray[editedTaskIndex].sprint=taskSprint;
            inProgressTasksArray[editedTaskIndex].type=taskType;
            inProgressTasksArray[editedTaskIndex].priority=taskPriority;
            inProgressTasksArray[editedTaskIndex].dueDate=taskDueDate;
            inProgressTasksArray[editedTaskIndex].assignee=assigneesArray;
            inProgressTasksArray[editedTaskIndex].description=taskDesc;
        }

    }else if(task.status==="completed"){

        //there is a status change
        if(task.status!==statusStore){

            //task status had been changed if no task is found at index in current array
            completedTasksArray.push({title:taskTitle,status:taskStatus,sprint:taskSprint,type:taskType,priority:taskPriority,dueDate:taskDueDate,assignee:assigneesArray,description:taskDesc});
            //add to div
            addTask(task);

            //remove task from current array
            removeTaskFromArray(statusStore,editedTaskIndex);
            //remove from div
            removeTask(statusStore,editedTaskIndex);

        }else{
            //updating details of existing task
            completedTasksArray[editedTaskIndex].title=taskTitle;
            completedTasksArray[editedTaskIndex].status=taskStatus;
            completedTasksArray[editedTaskIndex].sprint=taskSprint;
            completedTasksArray[editedTaskIndex].type=taskType;
            completedTasksArray[editedTaskIndex].priority=taskPriority;
            completedTasksArray[editedTaskIndex].dueDate=taskDueDate;
            completedTasksArray[editedTaskIndex].assignee=assigneesArray;
            completedTasksArray[editedTaskIndex].description=taskDesc;
        }

    }
}

//return the index of task from current column
function taskIndexChecker(task){
    // Get the current column's tasks (they are in div tags)
    const currentColumnTasks = document.getElementById(`${task.status}-tasks`).getElementsByClassName('task');

    // Find the index of the task based on title for current column
    for (let i = 0; i < currentColumnTasks.length; i++) {
        var taskElement = currentColumnTasks[i];
        if (taskElement.textContent === task.title) {

            //EXTRACT the index of the current task from the current column
            //this index match the index from the respective task array!
            editedTaskIndex = i;
            console.log("task index determined: "+editedTaskIndex);
            break;
        }
    }

}

//scan through all 3 columns of tasks and ensure that the task title is unique
//this will help us find the index of the task in each column by ensuring task title is unique across all 3 columns
function uniqueTitleChecker(task){
    // Get the current column's tasks (they are in div tags)
    const todoTasks = document.getElementById('todo-tasks').getElementsByClassName('task');
    const inprogressTasks = document.getElementById('inprogress-tasks').getElementsByClassName('task');
    const completedTasks = document.getElementById('completed-tasks').getElementsByClassName('task');

        for (let i = 0; i < todoTasks.length; i++) {
            var taskElement = todoTasks[i];
            if (taskElement.textContent === task.title) {
                uniqueTitle = false;
                break;
            }
        }

        if(uniqueTitle){
            for (let i = 0; i < inprogressTasks.length; i++) {
                var taskElement = inprogressTasks[i];
                if (taskElement.textContent === task.title) {
                    uniqueTitle = false;
                    break;
                }
            }
        }

        if(uniqueTitle){
            for (let i = 0; i < completedTasks.length; i++) {
                var taskElement = completedTasks[i];
                if (taskElement.textContent === task.title) {
                    uniqueTitle = false;
                    break;
                }
            }
        }

}

function addAssignee(){

    var newAssignee = document.getElementById("newAssignee").value;
    console.log("selected assignee: "+newAssignee);

    var selectedAssignees = document.getElementById("selected-assignees");

    if (newAssignee) {
        var listItem = document.createElement("li");
        listItem.innerHTML = `${newAssignee} <button class="remove-member-btn" onclick="removeAssignee(this)">Remove</button>`;

        selectedAssignees.append(listItem);

    }

    //reload assignee options
    reloadAssigneeOptions();
}

function removeAssignee(element) {
    var listItem = element.parentElement; // Get the <li> element containing the button
    listItem.remove(); // Remove the <li> element from the list

    //reload assignee options
    reloadAssigneeOptions();
}

function deleteTask(){
    var title = document.getElementById('task-title').value;

    const currentColumnTasks = document.getElementById(`${statusStore}-tasks`).getElementsByClassName('task');

    for (let i = 0; i < currentColumnTasks.length; i++) {
        var taskElement = currentColumnTasks[i];
        if (taskElement.textContent === title) {

            //remove task from html for the current column
            taskElement.parentNode.removeChild(taskElement);
            
            //remove the task for the array too!
            removeTaskFromArray(statusStore,editedTaskIndex);

            console.log("task removed from current column & array!");
            break;
        }
    }
    closeTaskModal();
}

function uploadFile() {
    var fileInput = document.getElementById("fileInput");
    var uploadedFile = document.getElementById("uploadedFile");
    var file = fileInput.files[0];

    if (file) {
        // You can perform actions with the selected file here.
        uploadedFile.innerHTML = `Selected File: ${file.name}`;
    } else {
        uploadedFile.innerHTML = "No file selected.";
    }
}

/*
window.onclick = (event) => {
    if (event.target === document.getElementById('task-modal')) {
        closeTaskModal();
    }
}*/

// Comments functionality
document.addEventListener('DOMContentLoaded', () => {
    const commentsList = document.getElementById('commentsList');
    const taskComments = document.getElementById('task-comments');
    const addCommentButton = document.getElementById('addComment');

    addCommentButton.addEventListener('click', () => {
        const commentText = taskComments.value.trim();
        if(commentText !== '') {
            const listItem = document.createElement('li');
            listItem.textContent = commentText;

            const deleteBtn = document.createElement('button');
            deleteBtn.textContent = 'Remove';
            deleteBtn.classList.add('delete-comment');

            deleteBtn.addEventListener('click', () => {
                commentsList.removeChild(listItem);
            });
            listItem.appendChild(deleteBtn);
            commentsList.appendChild(listItem);
            taskComments.value = '';
        }
    });

    const deleteButtons = document.querySelectorAll('.delete-comment');
    deleteButtons.forEach((button) => {
        button.addEventListener('click', () => {
            const listItem = button.parentElement;
            commentsList.removeChild(listItem);
        });
    });
});