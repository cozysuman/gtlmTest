document.addEventListener('DOMContentLoaded', function() {
  const editButton = document.getElementById('edit-btn');
  const userInputFrorm = document.getElementById('userProfileFrom');
  const editProfileModal = document.getElementById('editProfileModal');
  const confirmModal = document.getElementById("confirmationModal")
  const saveButton = document.getElementById("saveButton");
  const confirmSaveBtn = document.getElementById("confirmSaveBtn");
  const cancelSaveBtn = document.getElementById("cancelSaveBtn");
  const cancelButton = document.getElementById("cancelButton");
  editButton.addEventListener('click', () => {
    editProfileModal.style.display ="block";
  });
  cancelButton.addEventListener('click', function() {
    editProfileModal.style.display ="none";
  });
  saveButton.addEventListener('click',function(){
    confirmModal.style.display = "block";
  });
  confirmSaveBtn.addEventListener('click', function() {
    userInputFrorm.submit();
    confirmModal.style.display = "none";
    editProfileModal.style.display ="none";
  });
  
  cancelSaveBtn.addEventListener('click', function() {
    confirmModal.style.display = "none";
    editProfileModal.style.display ="none";
  });
});




