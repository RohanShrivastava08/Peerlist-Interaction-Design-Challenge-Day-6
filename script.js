const mailList = document.getElementById("mailList");
const deleteBtn = document.getElementById("deleteBtn");
const addBtn = document.getElementById("addBtn");
const newItemInput = document.getElementById("newItem");

const overlay = document.getElementById("overlay");
const overlayCount = document.getElementById("overlayCount");
const confirmDelete = document.getElementById("confirmDelete");
const cancelDelete = document.getElementById("cancelDelete");

// Enable/disable delete button based on selection
mailList.addEventListener("change", () => {
  const checked = mailList.querySelectorAll(".checkbox:checked").length;
  deleteBtn.disabled = checked === 0;
});

// Show overlay with count
deleteBtn.addEventListener("click", () => {
  const checked = mailList.querySelectorAll(".checkbox:checked").length;
  overlayCount.textContent = `${checked} Item${checked > 1 ? "s" : ""}`;
  overlay.classList.add("active");
});

// Confirm delete
confirmDelete.addEventListener("click", () => {
  const checkedItems = mailList.querySelectorAll(".checkbox:checked");
  checkedItems.forEach(item => {
    item.closest("li").remove();
  });
  overlay.classList.remove("active");
  deleteBtn.disabled = true;
});

// Cancel delete
cancelDelete.addEventListener("click", () => {
  overlay.classList.remove("active");
});

// Add new item with preview style
addBtn.addEventListener("click", () => {
  const text = newItemInput.value.trim();
  if (text === "") return;

  const li = document.createElement("li");
  li.innerHTML = `
    <div class="item-text">
      <strong>${text}</strong>
      <p>Newly added item...</p>
    </div>
    <input type="checkbox" class="checkbox">
  `;
  mailList.appendChild(li);
  newItemInput.value = "";
});
