// Modal hidden until list item is clicked
document.querySelectorAll('.category').forEach((item) => {
    item.addEventListener('click', function() {
      document.querySelector('.dark-overlay').style.display = 'block';
    });
  });


// Cancel button dismisses Modal
document.querySelector('#remove-button-cancel').addEventListener('click', function() {
    document.querySelector('.dark-overlay').style.display = 'none';
});


// When list item is clicked, save that particular ID and delete from list 
=======
// // Overlay/Modal hidden until list item is clicked
// document.querySelectorAll('.category').addEventListener('click', function() {
//     document.querySelector('.dark-overlay').style.display = 'block';
// });


// // Cancel dismisses Overlay/Modal
// document.querySelector('#remove-button-cancel').addEventListener('click', function() {
//     document.querySelector('.dark-overlay').style.display = 'none';
// });


// When list item is clicked,


// Modal hidden until list item is clicked
document.querySelectorAll('.category').forEach((item) => {
    item.addEventListener('click', function() {
      document.querySelector('.dark-overlay').style.display = 'block';
    });
  });


// Cancel button dismisses Modal
document.querySelector('#remove-button-cancel').addEventListener('click', function() {
    document.querySelector('.dark-overlay').style.display = 'none';
});
>>>>>>> origin/workingbranch
