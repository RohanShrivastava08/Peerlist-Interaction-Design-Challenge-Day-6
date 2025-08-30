const mailList = document.getElementById("mailList");
const deleteBtn = document.getElementById("deleteBtn");
const addBtn = document.getElementById("addBtn");
const newHeaderInput = document.getElementById("newHeader");
const newSubtextInput = document.getElementById("newSubtext");

const overlay = document.getElementById("overlay");
const overlayCount = document.getElementById("overlayCount");
const confirmDelete = document.getElementById("confirmDelete");
const cancelDelete = document.getElementById("cancelDelete");
const selectedCountEl = document.getElementById("selectedCount");
const toggleSelectBtn = document.getElementById("toggleSelect");

function updateSelectionUI() {
  const checkboxes = mailList.querySelectorAll(".checkbox");
  const checked = mailList.querySelectorAll(".checkbox:checked").length;

  selectedCountEl.textContent = `${checked} Selected`;
  deleteBtn.disabled = checked === 0;
  toggleSelectBtn.textContent = checked === checkboxes.length && checkboxes.length > 0 
    ? "Unselect All" 
    : "Select All";

  addBtn.disabled = checked > 0;
  newHeaderInput.disabled = checked > 0;
  newSubtextInput.disabled = checked > 0;
}

// Toggle selection when clicking list item
mailList.addEventListener("click", (e) => {
  const li = e.target.closest("li");
  if (!li) return;

  const checkbox = li.querySelector(".checkbox");
  if (e.target !== checkbox) {
    checkbox.checked = !checkbox.checked;
  }
  li.classList.toggle("selected", checkbox.checked);
  updateSelectionUI();
});

// Toggle Select All
toggleSelectBtn.addEventListener("click", () => {
  const checkboxes = mailList.querySelectorAll(".checkbox");
  const selectAll = mailList.querySelectorAll(".checkbox:checked").length !== checkboxes.length;

  checkboxes.forEach(cb => {
    cb.checked = selectAll;
    cb.closest("li").classList.toggle("selected", cb.checked);
  });

  updateSelectionUI();
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
  checkedItems.forEach(item => item.closest("li").remove());
  overlay.classList.remove("active");
  updateSelectionUI();
});

// Cancel delete
cancelDelete.addEventListener("click", () => {
  overlay.classList.remove("active");
});

// Add new item
addBtn.addEventListener("click", () => {
  const header = newHeaderInput.value.trim();
  const subtext = newSubtextInput.value.trim();

  if (header === "" || subtext === "") return;

  const li = document.createElement("li");
  li.innerHTML = `
    <div class="item-text">
      <strong>${header}</strong>
      <p>${subtext}</p>
    </div>
    <input type="checkbox" class="checkbox">
  `;
  mailList.appendChild(li);

  newHeaderInput.value = "";
  newSubtextInput.value = "";
  updateSelectionUI();
});

// Initial update
updateSelectionUI();
