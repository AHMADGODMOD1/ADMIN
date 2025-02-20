// Hide splash screen and show main panel after 3 seconds
setTimeout(() => {
    document.querySelector(".splash").style.display = "none";
    document.querySelector(".container").style.display = "block";
}, 3000);

let expiry = "";

function openExpiryDialog() { document.getElementById("expiryDialog").style.display = "block"; }
function closeExpiryDialog() { document.getElementById("expiryDialog").style.display = "none"; }
function setExpiry(value) {
    expiry = value;
    document.getElementById("expiryText").innerText = "Expiry: " + expiry;
    closeExpiryDialog();
}

function generateKey() {
    if (!expiry) {
        alert("Please select expiry first!");
        return;
    }
    let key = Math.random().toString(36).substring(2, 18).toUpperCase();
    document.getElementById("generatedKey").innerText = `Key: ${key}`;
    
    let users = JSON.parse(localStorage.getItem("users")) || [];
    users.push({ key, expiry });
    localStorage.setItem("users", JSON.stringify(users));
}

function copyKey() {
    let keyText = document.getElementById("generatedKey").innerText.replace("Key: ", "");
    navigator.clipboard.writeText(keyText);
    alert("Key copied successfully!");
}

function openUserList() {
    let users = JSON.parse(localStorage.getItem("users")) || [];
    document.getElementById("userList").innerHTML = users.map((u, i) => 
        `<p>${u.key} <button class='delete-btn' onclick='deleteUser(${i})'>❌</button></p>`).join("");
    document.getElementById("userListPanel").style.display = "block";
}

function closeUserList() { document.getElementById("userListPanel").style.display = "none"; }
function deleteUser(index) {
    let users = JSON.parse(localStorage.getItem("users"));
    users.splice(index, 1);
    localStorage.setItem("users", JSON.stringify(users));
    openUserList();
}
