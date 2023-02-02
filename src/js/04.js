// HTML has form markup. Write a script that will save field values to local storage when the user types something.

<form class="feedback-form" autocomplete="off">
   <label>
     Email
     <input type="email" name="email" autofocus />
   </label>
   <label>
     message
     <textarea name="message" rows="8"></textarea>
   </label>
   <button type="submit">Submit</button>
</form>

// Do this task in 03-feedback.html and 03-feedback.js files. Break it down into several subtasks:

// Track the input event on the form, and each time write an object with the email and message fields to the local storage, in which you save the current values ​​of the form fields. Let the string "feedback-form-state" be the key for the store.
// When loading the page, check the state of the storage, and if there is saved data, fill in the form fields with them. Otherwise, the fields must be empty.
// When submitting the form, clear the storage and form fields, and output an object with the fields email, message and their current values to the console.
// Make sure that the storage is updated no more than once every 500 milliseconds. To do this, add to the project and use the lodash.throttle library.
