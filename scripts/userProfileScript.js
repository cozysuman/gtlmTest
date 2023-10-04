document.addEventListener('DOMContentLoaded', function() {
  const editButton = document.getElementById('edit-btn');
  const editableFields = document.querySelectorAll('.editable');
  const userInputFrorm = document.getElementById('userProfileFrom');
  const editProfileModal = document.getElementById('editProfileModal');
  const confirmModal = document.getElementById("confirmationModal")
  const saveButton = document.getElementById("saveButton");
  const confirmSaveBtn = document.getElementById("confirmSaveBtn");
  const cancelSaveBtn = document.getElementById("cancelSaveBtn");
  function disableEditButton() {
    editButton.disabled = true;
  }

  function enableEditButton() {
    editButton.disabled = false;
  }
  editButton.addEventListener('click', () => {
    // if (editButton.textContent === 'Edit') {
    //   // editButton.textContent = 'Save';
    //   // const firstRow = document.querySelector('.first-row');
    //   // const secondRow = document.querySelector('.second-row');
    //   // // Get the contents of the second row
    //   // const secondRowContent = Array.from(secondRow.children);

    //   // // Empty the second row
    //   // secondRow.innerHTML = '';


    //   // // Append each field from the second row content into the first row
    //   // secondRowContent.forEach(field => {
    //   //   const fieldName = field.getAttribute('id');
    //   //   const matchingField = firstRow.querySelector(`[id="${fieldName}"]`);
    //   //   firstRow.appendChild(matchingField);
    //   // });


    //   // editableFields.forEach(field => {
    //   //   const currentValue = field.textContent.trim();
    //   //   const fieldName = field.getAttribute('id');
    //   //   field.innerHTML = `<input type="text" id="editedEmail" class="user-detail-input" name="${fieldName}" value="${currentValue}" />`;
    //   // });
    // } 
    // else {
    //   deleteModal.style.display ="block";
    //   isModalOpen = true;
    //   disableEditButton();
    // }
    editProfileModal.style.display ="block";



  });
  saveButton.addEventListener('click',function(){
    confirmModal.style.display = "block";

  });
  confirmSaveBtn.addEventListener('click', function() {
    // // Save changes
    // editButton.textContent = 'Edit';

    // // Update the content of input fields
    // editableFields.forEach(field => {
    //   const newValue = field.querySelector('input').value;
    //   field.innerHTML = newValue;
    // });

    // Close the confirmation modal
    userInputFrorm.submit();
    confirmModal.style.display = "none";
    editProfileModal.style.display ="none";

  });

  cancelSaveBtn.addEventListener('click', function() {
    // Close the confirmation modal without saving
    
    
    // Reset the input fields back to their original values
    // editableFields.forEach(field => {
    //   const originalValue = field.querySelector('input').defaultValue;
    //   field.innerHTML = originalValue;
    // });
    confirmModal.style.display = "none";
    editProfileModal.style.display ="none";

  });
});




