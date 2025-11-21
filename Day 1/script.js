
        /* --- JAVASCRIPT LOGIC --- */
        
        // 1. Select DOM Elements
        const habitInput = document.getElementById('habit-input');
        const addBtn = document.getElementById('add-btn');
        const habitList = document.getElementById('habit-list');

        // 2. Load Habits from LocalStorage on startup
        // We check if data exists, if not, we start with an empty array
        let habits = JSON.parse(localStorage.getItem('habits')) || [];

        // 3. Function to save to LocalStorage
        function saveToLocalStorage() {
            localStorage.setItem('habits', JSON.stringify(habits));
        }

        // 4. Function to Render (Display) the list
        function renderHabits() {
            // Clear current list to prevent duplicates
            habitList.innerHTML = '';

            habits.forEach((habit, index) => {
                const li = document.createElement('li');

                // Create text span
                const span = document.createElement('span');
                span.textContent = habit.text;
                if (habit.done) {
                    span.classList.add('completed');
                }

                // Toggle 'Done' on click
                span.addEventListener('click', () => {
                    toggleHabit(index);
                });

                // Create Delete Button
                const deleteBtn = document.createElement('button');
                deleteBtn.textContent = 'Delete';
                deleteBtn.classList.add('delete-btn');
                deleteBtn.addEventListener('click', () => {
                    deleteHabit(index);
                });

                li.appendChild(span);
                li.appendChild(deleteBtn);
                habitList.appendChild(li);
            });
        }

        // 5. Add Habit Function
        function addHabit() {
            const text = habitInput.value.trim(); // Remove extra spaces
            
            if (text !== "") {
                const newHabit = {
                    text: text,
                    done: false
                };
                
                habits.push(newHabit);
                habitInput.value = ''; // Clear input box
                saveToLocalStorage();
                renderHabits();
            } else {
                alert("Please write a habit first!");
            }
        }

        // 6. Toggle Done Function
        function toggleHabit(index) {
            habits[index].done = !habits[index].done; // Flip true/false
            saveToLocalStorage();
            renderHabits();
        }

        // 7. Delete Habit Function
        function deleteHabit(index) {
            habits.splice(index, 1); // Remove 1 item at specific index
            saveToLocalStorage();
            renderHabits();
        }

        // 8. Event Listeners
        addBtn.addEventListener('click', addHabit);
        
        // Allow pressing "Enter" key to add
        habitInput.addEventListener('keypress', function (e) {
            if (e.key === 'Enter') {
                addHabit();
            }
        });

        // Initial Render
        renderHabits();
