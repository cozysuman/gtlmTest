document.addEventListener('DOMContentLoaded', function() {
  const editButton = document.getElementById('edit-btn');
  const editableFields = document.querySelectorAll('.editable');
  const deleteModal = document.getElementById('editProfileModal');
  function disableEditButton() {
    editButton.disabled = true;
  }

  function enableEditButton() {
    editButton.disabled = false;
  }
  editButton.addEventListener('click', () => {
    if (editButton.textContent === 'Edit') {
      editButton.textContent = 'Save';
      // const firstRow = document.querySelector('.first-row');
      // const secondRow = document.querySelector('.second-row');
      // // Get the contents of the second row
      // const secondRowContent = Array.from(secondRow.children);

      // // Empty the second row
      // secondRow.innerHTML = '';


      // // Append each field from the second row content into the first row
      // secondRowContent.forEach(field => {
      //   const fieldName = field.getAttribute('id');
      //   const matchingField = firstRow.querySelector(`[id="${fieldName}"]`);
      //   firstRow.appendChild(matchingField);
      // });



      editableFields.forEach(field => {
        const currentValue = field.textContent.trim();
        field.innerHTML = `<input type="text" class="user-detail-input" value="${currentValue}" />`;
      });
    } 
    else {
      deleteModal.style.display ="block";
      isModalOpen = true;
      disableEditButton();
    }
  });
  confirmSaveBtn.addEventListener('click', function() {
    // Save changes
    editButton.textContent = 'Edit';

    // Update the content of input fields
    editableFields.forEach(field => {
      const newValue = field.querySelector('input').value;
      field.innerHTML = newValue;
    });

    // Close the confirmation modal
    deleteModal.style.display = 'none';
    enableEditButton();
  });

  cancelSaveBtn.addEventListener('click', function() {
    // Close the confirmation modal without saving
    deleteModal.style.display = 'none';
    
    // Reset the input fields back to their original values
    editableFields.forEach(field => {
      const originalValue = field.querySelector('input').defaultValue;
      field.innerHTML = originalValue;
    });

    // Change the button text back to 'Edit'
    editButton.textContent = 'Edit';
    enableEditButton();
  });
});




