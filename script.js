document.getElementById('checkbox').addEventListener('change', function() {
    const body = document.body;
    if (this.checked) {
        body.classList.add('dark');
    } else {
        body.classList.remove('dark');
    }
});

function showStep(num) {
    // Check if the clicked indicator is disabled
    const indicatorElement = document.getElementById('indicator' + num);
    if (indicatorElement.classList.contains('disabled')) {
        // If disabled, return early without doing anything
        return;
    }

    // Hide all steps
    for (let i = 1; i <= 4; i++) {
        document.getElementById('step' + i).style.display = 'none';
        document.getElementById('indicator' + i).classList.remove('active');
    }

    // Show the selected step and activate its indicator
    document.getElementById('step' + num).style.display = 'block';
    document.getElementById('indicator' + num).classList.add('active');
}
function validateStudentFile(file) {
    // Check that the file is in the CSV format
    if (file.type !== 'text/csv') {
        alert('The student list file must be in the CSV format.');
        return false;
    }

    // Check that the file contains the required columns
    const columns = ['name', 'career', 'studentId', 'graduationDate'];
    const reader = new FileReader();
    reader.onload = function() {
        const lines = reader.result.split('\n');
        const headerRow = lines[0].split(',');
        if (headerRow.join(',') !== columns.join(',')) {
        alert('The student list file must contain the following columns: ' + columns.join(', '));
        return false;
        }
    };
    reader.readAsText(file);

    return true;
}
// Load the dummy data
const dummyData = [
    { name: 'Alice', career: 'Computer Science', studentId: '1234567890', graduationDate: '2023-08-19' },
    { name: 'Bob', career: 'Mathematics', studentId: '9876543210', graduationDate: '2023-08-19' },
    { name: 'Carol', career: 'Physics', studentId: '0987654321', graduationDate: '2023-08-19' },
    { name: 'Dave', career: 'Chemistry', studentId: '2109876543', graduationDate: '2023-08-19' },
    { name: 'Eve', career: 'Biology', studentId: '3210987654', graduationDate: '2023-08-19' },
];


// Get the file input element
const fileInput = document.querySelector('#studentFile');

// Add a change event listener to the file input element
fileInput.addEventListener('change', function() {
    // Load the dummy data
    displayDummyData();
});


// Display the dummy data in the grid
function displayDummyData() {
    const tbody = document.querySelector('.table tbody');

    for (const student of dummyData) {
        const row = document.createElement('tr');

        const nameCell = document.createElement('td');
        nameCell.textContent = student.name;
        row.appendChild(nameCell);

        const careerCell = document.createElement('td');
        careerCell.textContent = student.career;
        row.appendChild(careerCell);

        const studentIdCell = document.createElement('td');
        studentIdCell.textContent = student.studentId;
        row.appendChild(studentIdCell);

        const graduationDateCell = document.createElement('td');
        graduationDateCell.textContent = student.graduationDate;
        row.appendChild(graduationDateCell);

        tbody.appendChild(row);
    }

    document.querySelector('.grid').style.display = 'block'; // Add this line to show the grid when data is loaded
    document.querySelector('#step1 button').disabled = false;
}

document.querySelector('#step1 button').addEventListener('click', function() {
    showLoading(2, 1500);
});

// Dummy data for responsables
const responsablesData = [
    { faculty: 'Science', career: 'Computer Science', rectorName: 'Dr. Smith' },
    { faculty: 'Engineering', career: 'Electrical Engineering', rectorName: 'Dr. Johnson' },
    { faculty: 'Arts', career: 'Fine Arts', rectorName: 'Dr. Williams' },
    // ... add more if needed
];

// Function to display responsables data
function displayResponsablesData() {
    const tbody = document.querySelector('#responsablesGrid .table tbody');

    for (const responsable of responsablesData) {
        const row = document.createElement('tr');

        const facultyCell = document.createElement('td');
        facultyCell.textContent = responsable.faculty;
        row.appendChild(facultyCell);

        const careerCell = document.createElement('td');
        careerCell.textContent = responsable.career;
        row.appendChild(careerCell);

        const rectorCell = document.createElement('td');
        rectorCell.textContent = responsable.rectorName;
        row.appendChild(rectorCell);

        tbody.appendChild(row);
    }

    document.querySelector('#responsablesGrid').style.display = 'block'; // Show the grid when data is loaded
    document.querySelector('#responsablesGrid').style.display = 'block'; 
    document.querySelector('#step2 button').disabled = false;
}

// Get the file input element
const fileInputResponsable = document.querySelector('#responsableFile');

// Add a change event listener to the file input element
fileInputResponsable.addEventListener('change', function() {
    // Load the dummy responsables data
    displayResponsablesData();
});

// Event listener for the responsables upload button
document.querySelector('#step2 button').addEventListener('click', function() {
    showLoading(3, 1500);
});

// Get the "Edit Details" button
const editButton = document.querySelector('#step3 .button-container #editButton');

// Add a click event listener to the "Edit Details" button
editButton.addEventListener('click', function() {
    showLoading(1, 100);
});

// Get the "Edit Details" button
const genButton = document.querySelector('#step3 .button-container #genButton');

// Add a click event listener to the "Edit Details" button
genButton.addEventListener('click', function() {
    showLoading(4, 3500);
});

function showLoading(step, timeOut){
    // Show the loading GIF and the overlay
    document.getElementById('loadingGif').style.display = 'inline-block';
    document.getElementById('overlay').style.display = 'block';

    // Simulate loading for 1.5 seconds
    setTimeout(function() {
        // Hide the loading GIF and the overlay
        document.getElementById('loadingGif').style.display = 'none';
        document.getElementById('overlay').style.display = 'none';

        document.getElementById('indicator' + step).classList.add('active');
        document.getElementById('indicator' + step).classList.remove('disabled');

        // Advance to the next step
        showStep(step);
    }, timeOut);

}