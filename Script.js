// DOM Elements
const habitInput = document.getElementById('habitInput');
const addBtn = document.getElementById('addBtn');
const habitList = document.getElementById('habitList');

// Load data from LocalStorage or start empty
let habits = JSON.parse(localStorage.getItem('habits')) || [];

// Initial render
renderHabits();

// Event Listeners
addBtn.addEventListener('click', addHabit);
habitInput.addEventListener('keypress', function(e) {
    if (e.key === 'Enter') {
        addHabit();
    }
});

// Add a new habit object
function addHabit() {
    const habitText = habitInput.value.trim();
    
    if (habitText === '') {
        alert('Please enter a habit!');
        return;
    }

    const newHabit = {
        id: Date.now(),
        text: habitText,
        completed: false,
        streak: 0
    };

    habits.push(newHabit);
    saveAndRender();
    habitInput.value = ''; // Clear input
}

// Toggle checkbox state and handle streak math
function toggleHabit(id) {
    habits = habits.map(habit => {
        if (habit.id === id) {
            const completed = !habit.completed;
            const streak = completed ? habit.streak + 1 : Math.max(0, habit.streak - 1);
            return { ...habit, completed, streak };
        }
        return habit;
    });
    saveAndRender();
}

// Remove habit from list
function deleteHabit(id) {
    habits = habits.filter(habit => habit.id !== id);
    saveAndRender();
}

// Sync with storage and refresh UI
function saveAndRender() {
    localStorage.setItem('habits', JSON.stringify(habits));
    renderHabits();
}

// Render plain text elements to the DOM
function renderHabits() {
    habitList.innerHTML = ''; // Clear old items

    habits.forEach(habit => {
        const li = document.createElement('li');

        // Create checkbox element
        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.checked = habit.completed;
        checkbox.addEventListener('change', () => toggleHabit(habit.id));

        // Create text span
        const textSpan = document.createElement('span');
        textSpan.textContent = ` ${habit.text} (Streak: ${habit.streak} days) `;
        
        // Apply basic text effect if checked
        if (habit.completed) {
            textSpan.style.textDecoration = 'line-through';
        }

        // Create delete button element
        const deleteBtn = document.createElement('button');
        deleteBtn.textContent = 'Delete';
        deleteBtn.addEventListener('click', () => deleteHabit(habit.id));

        // Assemble row element
        li.appendChild(checkbox);
        li.appendChild(textSpan);
        li.appendChild(deleteBtn);

        habitList.appendChild(li);
    });
}
