$(document).ready(function() {
    $('#add-task-btn').click(function() {
        let taskText = $('#task-input').val().trim();  
        if (taskText !== '') {
            $('#task-list').append(`           
                <li>
                    ${taskText}
                    <div class="task-buttons">
                        <button class="complete-btn">Completed</button>
                        <button class="delete-btn">Delete</button>
                    </div>
                </li>
            `);
            $('#task-input').val('');
        }
    });

    $(document).on('click', '.delete-btn', function(event) {
        event.stopPropagation();  
        $(this).closest('li').remove();  
    });

    $(document).on('click', '.complete-btn', function(event) {
        event.stopPropagation();  
        $(this).closest('li').toggleClass('completed');  
    });
});
