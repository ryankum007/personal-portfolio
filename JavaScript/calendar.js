document.addEventListener('DOMContentLoaded', function() {
    const calendarEl = document.getElementById('calendar');
    const popup = document.getElementById("calendarPopup");
    const btn = document.getElementById("selectMeetingDayBtn");
    const closePopup = document.getElementsByClassName("close-popup")[0];
    const selectedDateInput = document.getElementById("selectedDate");
    const selectedDateDisplay = document.getElementById("selectedDateDisplay");
    const selectDateBtn = document.getElementById("selectDateBtn");
    let selectedDate = null;

    const calendar = new FullCalendar.Calendar(calendarEl, {
        initialView: 'dayGridMonth',
        selectable: true,
        selectHelper: true,
        height: '100%', /* Ensure the calendar fits within the popup */
        themeSystem: 'standard', /* Use the standard theme to apply custom CSS */
        validRange: {
            start: new Date().toISOString().split('T')[0] // Restrict past dates
        },
        events: [
            {
                title: 'Unavailable',
                start: '2024-06-01',
                end: '2024-06-02',
                backgroundColor: '#000000', 
                borderColor: '#000000'      
            },
            {
                title: 'Meeting',
                start: '2024-06-05T10:00:00',
                end: '2024-06-05T12:00:00',
                backgroundColor: '#000000', 
                borderColor: '#000000'      
            }
        ],
        dateClick: function(info) {
            const events = calendar.getEvents().filter(event => event.startStr === info.dateStr);
            if (events.length > 0) {
                alert('Events: ' + events.map(event => event.title).join(', '));
                selectDateBtn.style.display = "none";
            } else {
                selectedDate = info.dateStr;
                selectDateBtn.style.display = "block";
            }
        }
    });

    btn.onclick = function() {
        popup.style.display = "block";
        setTimeout(function() { calendar.render(); }, 10); // Ensure calendar is re-rendered properly
    }

    closePopup.onclick = function() {
        popup.style.display = "none";
    }

    window.onclick = function(event) {
        if (event.target == popup) {
            popup.style.display = "none";
        }
    }

    selectDateBtn.onclick = function() {
        if (selectedDate) {
            selectedDateInput.value = selectedDate;
            selectedDateDisplay.innerText = 'Selected date: ' + selectedDate;
            selectedDateDisplay.style.display = "block";
            btn.style.display = "none"; // Hide the "Select Meeting Day" button
            selectDateBtn.style.display = "none"; // Hide the "Select this Day" button
            popup.style.display = "none";
        }
    }

    selectedDateDisplay.onclick = function() {
        popup.style.display = "block";
        setTimeout(function() { calendar.render(); }, 10); // Ensure calendar is re-rendered properly
    }

    calendar.render();
});
