// ... (existing code)

const server = 'http://localhost:3000';

// Function to handle the "View" button click event
async function onViewButtonClick() {
    console.log("View button clicked.");
    await fetchCommodities();
}

// Function to handle the "Add" button click event
async function onAddButtonClick() {
    console.log("Add button clicked.");
    commodityId = document.getElementById('commodityId').value;
    commodityName = document.getElementById('commodityName').value;

    if (commodityId && commodityName) {
        await addcommodity();
        await fetchCommodities();
    }
}

// Function to handle the "Edit" button click event
async function onEditButtonClick() {
    console.log("Edit button clicked.");
    commodityId = document.getElementById('commodityId').value;
    commodityName = document.getElementById('commodityName').value;

    if (commodityId && commodityName) {
        await updateCommodity();
        await fetchCommodities();
    }
}

// Function to handle the "Delete" button click event
async function onDeleteButtonClick() {
    console.log("Delete button clicked.");
    commodityId = document.getElementById('commodityId').value;

    if (commodityId) {
        await deleteCommodity();
        await fetchCommodities();
    }
}

// Function to fetch commodities from the server and populate the table
async function fetchCommodities() {
    // Fetch commodities from the server
     console.log("Fetching commodities from the server...");
    const response = await fetch(`${server}/commodities`);
    const commodities = await response.json();
    populateContent(commodities);
}

// Function to add a new commodity to the server
async function addcommodity() {
   console.log("Adding commodity to the server..."); 
    const url = `${server}/commodities`;
    const commodity = { id: parseInt(commodityId), name: commodityName };
    const options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(commodity)
    };
    const response = await fetch(url, options);
}

// Function to update a commodity on the server
async function updateCommodity() {
    console.log("Updating commodity on the server...");
    const url = `${server}/commodities/${commodityId}`;
    const commodity = { name: commodityName };
    const options = {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(commodity)
    };
    const response = await fetch(url, options);
}

// Function to delete a commodity from the server
async function deleteCommodity() {
    console.log("Deleting commodity from the server...");
    const url = `${server}/commodities/${commodityId}`;
    const options = {
        method: 'DELETE'
    };
    const response = await fetch(url, options);
}

// ... (existing code)

// Attach event listeners to the buttons
document.addEventListener("DOMContentLoaded", function () {
    document.querySelector("button[type='button'][value='View']").addEventListener("click", onViewButtonClick);
    document.querySelector("button[type='button'][value='Add']").addEventListener("click", onAddButtonClick);
    document.querySelector("button[type='button'][value='Edit']").addEventListener("click", onEditButtonClick);
    document.querySelector("button[type='button'][value='Delete']").addEventListener("click", onDeleteButtonClick);
});
