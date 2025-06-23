// Get the menu element
const menu = document.getElementById('menu');

// Variable to store the selected image
let selectedImage = null;

// Function to display the right-click menu
function displayMenu(event) {
  event.preventDefault(); // Prevent the default context menu
  menu.style.display = 'block'; // Display the menu

  // Calculate the position relative to the image
  const imageContainer = event.target.closest('.image');
  const containerRect = imageContainer.getBoundingClientRect();
  const offsetX = event.clientX - containerRect.left;
  const offsetY = event.clientY - containerRect.top;

  // Set the menu position relative to the image
  menu.style.left = offsetX + 'px';
  menu.style.top = offsetY + 'px';

  // Get the clicked image
  const clickedImage = event.target.closest('.photo');
  selectedImage = clickedImage; // Set the selected image

  // Remove previous event listeners from menu items
  const menuItems = menu.getElementsByTagName('li');
  for (let i = 0; i < menuItems.length; i++) {
    menuItems[i].removeEventListener('click', menuItemClicked);
  }

  // Add event listener to menu items
  for (let i = 0; i < menuItems.length; i++) {
    menuItems[i].addEventListener('click', menuItemClicked);
  }
}

// Function to handle menu item click
function menuItemClicked(event) {
  const operation = event.target.getAttribute('data-operation');
  const color = event.target.getAttribute('data-color');

  // Check the clicked operation
  if (operation === 'makeColor') {
    if (color === 'reddish') {
      makeReddish(selectedImage);
    } else if (color === 'blueish') {
      makeBlueish(selectedImage);
    } else if (color === 'greenish') {
      makeGreenish(selectedImage);
    }
  } else if (operation === 'duplicateImage') {
    duplicateImage(selectedImage);
  } else if (operation === 'increaseBrightness') {
    increaseBrightness(selectedImage);
  } else if (operation === 'reduceResolution') {
    reduceResolution(selectedImage);
  } else if (operation === 'convertToGrayscale') {
    convertToGrayscale(selectedImage);
  } else if (operation === 'filterImages') {
    filterImages(selectedImage);
  } else if (operation === 'createThumbnails') {
    createThumbnails(selectedImage);
  }
}

// fuction to create thumbnails
function createThumbnails(image) {
  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d');
  const thumbnailSize = 100; // Define the size of the thumbnail

  canvas.width = thumbnailSize;
  canvas.height = thumbnailSize;

  // Calculate the aspect ratio of the original image
  const aspectRatio = image.width / image.height;

  let thumbnailWidth;
  let thumbnailHeight;

  // Determine the dimensions of the thumbnail while maintaining the aspect ratio
  if (aspectRatio > 1) {
    thumbnailWidth = thumbnailSize;
    thumbnailHeight = thumbnailSize / aspectRatio;
  } else {
    thumbnailWidth = thumbnailSize * aspectRatio;
    thumbnailHeight = thumbnailSize;
  }

  // Calculate the positioning to center the thumbnail
  const offsetX = (thumbnailSize - thumbnailWidth) / 2;
  const offsetY = (thumbnailSize - thumbnailHeight) / 2;

  // Draw the image on the canvas with the reduced dimensions
  ctx.drawImage(image, offsetX, offsetY, thumbnailWidth, thumbnailHeight);

  // Set the source of the selected image to the thumbnail data URL
  image.src = canvas.toDataURL();
}

// function to filter the images based on criteria
function filterImages(selectedImage) {
  // Get all the image elements
  const images = document.getElementsByClassName('photo');

  // Get the selected image's data-image-name attribute
  const selectedImageName = selectedImage.getAttribute('data-image-name');

  // Iterate over each image and apply the filtering criteria
  for (let i = 0; i < images.length; i++) {
    const image = images[i];
    // Get the image's data-image-name attribute
    const imageName = image.getAttribute('data-image-name');

    // Apply the filtering logic
    if (imageName === selectedImageName) {
      image.style.display = 'block'; // Display the image
    } else {
      image.style.display = 'none'; // Hide the image
    }
  }
}


function convertToGrayscale(image) {
  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d');
  canvas.width = image.width;
  canvas.height = image.height;
  ctx.drawImage(image, 0, 0);

  const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
  const data = imageData.data;

  for (let i = 0; i < data.length; i += 4) {
    const red = data[i];
    const green = data[i + 1];
    const blue = data[i + 2];

    // Calculate grayscale value
    const grayscale = Math.round(0.299 * red + 0.587 * green + 0.114 * blue);

    // Set red, green, and blue components to grayscale value
    data[i] = grayscale;
    data[i + 1] = grayscale;
    data[i + 2] = grayscale;
  }

  ctx.putImageData(imageData, 0, 0);
  image.src = canvas.toDataURL();
}

function reduceResolution(image) {
  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d');

  const newWidth = image.width * 0.5; // Reduce the width by 50%
  const newHeight = image.height * 0.5; // Reduce the height by 50%

  canvas.width = newWidth;
  canvas.height = newHeight;

  ctx.drawImage(image, 0, 0, newWidth, newHeight); // Draw the image with the reduced dimensions
  ctx.putImageData(image, 0, 0);
  image.src = canvas.toDataURL();
}


// Function to increase the brightness of the image
function increaseBrightness(image) {
  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d');
  canvas.width = image.width;
  canvas.height = image.height;
  ctx.drawImage(image, 0, 0);

  const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
  const data = imageData.data;

  for (let i = 0; i < data.length; i += 4) {
    data[i] = Math.min(data[i] + 50, 255); // Increase red component
    data[i + 1] = Math.min(data[i + 1] + 50, 255); // Increase green component
    data[i + 2] = Math.min(data[i + 2] + 50, 255); // Increase blue component
  }

  ctx.putImageData(imageData, 0, 0);
  image.src = canvas.toDataURL();
}
// Function to make the image reddish
function makeReddish(image) {
  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d');
  canvas.width = image.width;
  canvas.height = image.height;
  ctx.drawImage(image, 0, 0);

  const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
  const data = imageData.data;

  for (let i = 0; i < data.length; i += 4) {
    const red = data[i];
    const green = data[i + 1];
    const blue = data[i + 2];

    if (red <= green + blue) {
      data[i] = Math.min(green + blue, 255);
    }
  }

  ctx.putImageData(imageData, 0, 0);
  image.src = canvas.toDataURL();
}

// Function to make the image blueish
function makeBlueish(image) {
  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d');
  canvas.width = image.width;
  canvas.height = image.height;
  ctx.drawImage(image, 0, 0);

  const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
  const data = imageData.data;

  for (let i = 0; i < data.length; i += 4) {
    const red = data[i];
    const green = data[i + 1];
    const blue = data[i + 2];

    if (blue <= red + green) {
      data[i + 2] = Math.min(red + green, 255);
    }
  }

  ctx.putImageData(imageData, 0, 0);
  image.src = canvas.toDataURL();
}

// Function to make the image greenish
function makeGreenish(image) {
  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d');
  canvas.width = image.width;
  canvas.height = image.height;
  ctx.drawImage(image, 0, 0);

  const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
  const data = imageData.data;

  for (let i = 0; i < data.length; i += 4) {
    const red = data[i];
    const green = data[i + 1];
    const blue = data[i + 2];

    if (green <= red + blue) {
      data[i + 1] = Math.min(red + blue, 255);
    }
  }

  ctx.putImageData(imageData, 0, 0);
  image.src = canvas.toDataURL();
}

// Function to duplicate the image
function duplicateImage(image) {
  const duplicate = image.cloneNode(true); // Clone the selected image
  duplicate.removeAttribute('id'); // Remove the ID to avoid duplication

  const imageContainer = document.createElement('div'); // Create a new container for the duplicated image
  imageContainer.classList.add('image'); // Add the necessary class to the container
  imageContainer.appendChild(duplicate); // Append the duplicate image

  // Insert the duplicated image container after the original image container
  image.parentNode.insertBefore(imageContainer, image.nextSibling);
}



// Function to hide the menu
function hideMenu() {
  menu.style.display = 'none'; // Hide the menu
  selectedImage = null; // Reset the selected image
}

// Add event listener to the document for right-click event
document.addEventListener('contextmenu', displayMenu);

// Add event listener to the document for click event to hide the menu
document.addEventListener('click', hideMenu);
