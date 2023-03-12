// const images = document.querySelectorAll('img');
const menu = document.getElementById('menu');

images.forEach(function(img) {
  img.addEventListener('contextmenu', function(event) {
    // Show the custom menu
    menu.style.display = 'block';

    // Position the menu at the mouse pointer
    menu.style.top = event.clientY + 'px';
    menu.style.left = event.clientX + 'px';

    // Prevent the default context menu from appearing
    event.preventDefault();
  });
});

document.addEventListener('click', function() {
  // Hide the custom menu
  menu.style.display = 'none';
});

// Save image functionality
const saveImageMenuItem = document.getElementById('save-image');
saveImageMenuItem.addEventListener('click', function() {
  const imageUrl = window.getSelection().anchorNode.src;
  window.open(imageUrl, '_blank');
});

// Copy image functionality
const copyImageMenuItem = document.getElementById('copy-image');
copyImageMenuItem.addEventListener('click', function() {
  const imageUrl = window.getSelection().anchorNode.src;
  navigator.clipboard.writeText(imageUrl);
});

// Open image in new tab functionality
const openImageNewTabMenuItem = document.getElementById('open-image-new-tab');
openImageNewTabMenuItem.addEventListener('click', function() {
  const imageUrl = window.getSelection().anchorNode.src;
  window.open(imageUrl, '_blank');
});
