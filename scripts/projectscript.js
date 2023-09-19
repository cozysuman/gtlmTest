document.addEventListener('DOMContentLoaded', function() {

    const projects = [
        {
            projectName: "Cyber Net",
            projectDescription: "This is a cyber net project handled by evelyn clark",
            clientName: "Cyber Net",
            projectStatus: "In-progress",
            projectManager: "Evelyn Clark"
        },
        {
            projectName: "Flinders Fusa",
            projectDescription: "This is a Flinders FUSA project",
            clientName: "Flinders",
            projectStatus: "In-progress",
            projectManager: "Evelyn Clark"
        }
    ];

    let flippedCard = null;
    let cardCount = 0;
    const modal = document.getElementById('createProjectModal');
    const projectForm = document.getElementById('projectForm');
    const projectCardsContainer = document.querySelector('.project_cards');

    projects.forEach((project, index) => {
        const projFileName = project.projectName.replace(/\s/g, '').toLowerCase();

        const newCard = document.createElement('div');
        newCard.classList.add('card');
        newCard.style.backgroundImage = "url('../GTLM/images/"+projFileName+".png')";
        
        newCard.setAttribute('title', project.projectDescription);

        const cardFront = document.createElement('div');
        cardFront.classList.add('card_face', 'card_front');
        const cardBack = document.createElement('div');
        cardBack.classList.add('card_face', 'card_back');

        const cardContent = document.createElement('div');
        cardContent.classList.add('card_content');

        const projectNameElement = document.createElement('h3');
        projectNameElement.setAttribute('id', 'projName');
        projectNameElement.textContent = project.projectName;

        const clientNameElement = document.createElement('p');
        clientNameElement.setAttribute('id', 'client');
        clientNameElement.textContent = "Client: "+project.clientName;
        clientNameElement.setAttribute('data-value', project.clientName);
        
        const projectStatusElement = document.createElement('p');
        projectStatusElement.setAttribute('id', 'projStatus');
        projectStatusElement.textContent = "Status: "+project.projectStatus;
        projectStatusElement.setAttribute('data-value', project.projectStatus);

        const projectManagerElement = document.createElement('p');
        projectManagerElement.setAttribute('id', 'projManager');
        projectManagerElement.textContent = "Project Manager: "+project.projectManager;
        projectManagerElement.setAttribute('data-value', project.projectManager);

        const editBtn = document.createElement('button');
        editBtn.classList.add('cardBtns', 'editBtn');
        editBtn.textContent = "Edit";

        const viewBtn = document.createElement('button');
        viewBtn.classList.add('cardBtns', 'viewBtn');
        viewBtn.textContent = "View Tasks";

        const deleteBtn = document.createElement('button');
        deleteBtn.classList.add('cardBtns', 'deleteBtn');
        deleteBtn.textContent = "Delete";

        cardContent.appendChild(clientNameElement);
        cardContent.appendChild(projectStatusElement);
        cardContent.appendChild(projectManagerElement);
        cardContent.appendChild(editBtn);
        cardContent.appendChild(viewBtn);
        cardContent.appendChild(deleteBtn);

        cardFront.appendChild(projectNameElement);
        cardBack.appendChild(cardContent);

        newCard.appendChild(cardFront);
        newCard.appendChild(cardBack);

        projectCardsContainer.appendChild(newCard);
    });

    document.getElementById('createProjectBtn').addEventListener('click', () => {
        modal.style.display = 'block';
    });

    projectForm.addEventListener('submit', (event) => {
        event.preventDefault();

        const projectName = document.getElementById('projectName').value;
        const projectDescription = document.getElementById('projectDescription').value;
        const clientName = document.getElementById('clientName').value;
        const projectStatus = document.getElementById('projectStatus').value;
        const projectManager = document.getElementById('projectManager').value;
        const projFileName = projectName.replace(/\s/g, '').toLowerCase();

        const newCard = document.createElement('div');
        newCard.classList.add('card');
        newCard.style.backgroundImage = "url('../GTLM/images/"+projFileName+".png')";
        
        newCard.setAttribute('title', projectDescription);

        const cardFront = document.createElement('div');
        cardFront.classList.add('card_face', 'card_front');
        const cardBack = document.createElement('div');
        cardBack.classList.add('card_face', 'card_back');

        const cardContent = document.createElement('div');
        cardContent.classList.add('card_content');

        const projectNameElement = document.createElement('h3');
        projectNameElement.setAttribute('id', 'projName');
        projectNameElement.textContent = projectName;

        const clientNameElement = document.createElement('p');
        clientNameElement.setAttribute('id', 'client');
        clientNameElement.textContent = "Client: "+clientName;
        clientNameElement.setAttribute('data-value', clientName);
        
        const projectStatusElement = document.createElement('p');
        projectStatusElement.setAttribute('id', 'projStatus');
        projectStatusElement.textContent = "Status: "+projectStatus;
        projectStatusElement.setAttribute('data-value', projectStatus);

        const projectManagerElement = document.createElement('p');
        projectManagerElement.setAttribute('id', 'projManager');
        projectManagerElement.textContent = "Project Manager: "+projectManager;
        projectManagerElement.setAttribute('data-value', projectManager);

        const editBtn = document.createElement('button');
        editBtn.classList.add('cardBtns', 'editBtn');
        editBtn.textContent = "Edit";

        const viewBtn = document.createElement('button');
        viewBtn.classList.add('cardBtns', 'viewBtn');
        viewBtn.textContent = "View Tasks";

        const deleteBtn = document.createElement('button');
        deleteBtn.classList.add('cardBtns', 'deleteBtn');
        deleteBtn.textContent = "Delete";

        cardContent.appendChild(clientNameElement);
        cardContent.appendChild(projectStatusElement);
        cardContent.appendChild(projectManagerElement);
        cardContent.appendChild(editBtn);
        cardContent.appendChild(viewBtn);
        cardContent.appendChild(deleteBtn);

        cardFront.appendChild(projectNameElement);
        cardBack.appendChild(cardContent);

        newCard.appendChild(cardFront);
        newCard.appendChild(cardBack);

        projectCardsContainer.appendChild(newCard);

        modal.style.display = 'none';
        projectForm.reset();
    });

    projectCardsContainer.addEventListener('click', (event) => {
        const editButton = event.target.closest('.editBtn');
        if (editButton) {
            const card = editButton.closest('.card');
            openEditModal(card);
        }
        const clickedCard = event.target.closest('.card');
        if (clickedCard) {
            if (flippedCard && flippedCard != clickedCard) {
                flippedCard.classList.remove('is-flipped');
            }

            clickedCard.classList.toggle('is-flipped');
            flippedCard = clickedCard.classList.contains('is-flipped') ? clickedCard : null;
        } 

        const deleteBtn = event.target.closest('.deleteBtn');
        if (deleteBtn) {
            const card = deleteBtn.closest('.card');
            openDeleteModal(card);
        }


        const viewBtn = event.target.closest('.viewBtn');
        if (viewBtn) {
            accessTaskList();
        }


    });

    document.addEventListener('click', (event) => {
        if (!projectCardsContainer.contains(event.target) && event.target !== modal && !modal.contains(event.target)) {
            if (flippedCard) {
                flippedCard.classList.remove('is-flipped');
                flippedCard = null;
            }
        } 
    });

    const createCancelBtn = document.getElementById('createCancel');
    const editCancelBtn = document.getElementById('editCancel');

    createCancelBtn.addEventListener('click', () => {
        modal.style.display = 'none';
        projectForm.reset();
    });

    editCancelBtn.addEventListener('click', () => {
        const editModal = document.getElementById('editProjectModal');
        editModal.style.display = 'none';
    });

    function openEditModal(card) {
        const projectName = card.querySelector('#projName').textContent;
        const projectDescription = card.getAttribute('title');
        const clientName = card.querySelector('#client').getAttribute('data-value');
        const projectStatus = card.querySelector('#projStatus').getAttribute('data-value');
        const projectManager = card.querySelector('#projManager').getAttribute('data-value');

        const editProjectName = document.getElementById('editProjectName');
        const editProjectDescription = document.getElementById('editProjectDescription');
        const editClientName = document.getElementById('editClientName');
        const editProjectStatus = document.getElementById('editProjectStatus');
        const editProjectManager = document.getElementById('editProjectManager');
    
        for (let i = 0; i < editProjectManager.options.length; i++) {
            if (editProjectManager.options[i].value === projectManager) {
                editProjectManager.options[i].selected = true;
                break;
            }
        }

        for (let i = 0; i < editProjectStatus.options.length; i++) {
            if (editProjectStatus.options[i].value === projectStatus) {
                editProjectStatus.options[i].selected = true;
                break;
            }
        }
        
        editProjectName.value = projectName;
        editProjectDescription.value = projectDescription;
        editClientName.value = clientName;
        editProjectStatus.value = projectStatus;
        editProjectManager.value = projectManager;

        const editModal = document.getElementById('editProjectModal');
        editModal.style.display = 'block';

        const editSubmitBtn = editModal.querySelector('#editSave');
        editSubmitBtn.addEventListener('click', (event) => {
            event.preventDefault();

            card.querySelector('#projName').textContent = editProjectName.value;
            card.setAttribute('title', editProjectDescription.value);
            card.querySelector('#client').textContent = "Client: "+editClientName.value;
            card.querySelector('#client').setAttribute('data-value', editClientName.value);
            card.querySelector('#projStatus').textContent = "Status: "+editProjectStatus.value;
            card.querySelector('#projStatus').setAttribute('data-value', editProjectStatus.value);
            card.querySelector('#projManager').textContent = "Project Manager: "+editProjectManager.value;
            card.querySelector('#projManager').setAttribute('data-value', editProjectManager.value);

            editModal.style.display = 'none';
        });
    }

    function openDeleteModal(card) {
        const deleteModal = document.getElementById('deleteModal');
        const confirmDeleteBtn = document.getElementById('confirmDelete');
        const cancelDeleteBtn = document.getElementById('cancelDelete');

        confirmDeleteBtn.addEventListener('click', () => {
            card.remove();
            deleteModal.style.display = 'none';
        });

        cancelDeleteBtn.addEventListener('click', () => {
            deleteModal.style.display = 'none';
        });

        deleteModal.style.display = 'block';
    }

    function accessTaskList(){
        window.location.href = './taskList.html';
    }

});