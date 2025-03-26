document.addEventListener("DOMContentLoaded", function() {
    const gallery = document.getElementById('gallery');
    const imageFolder = './'; // Images are stored in the same directory as the HTML file
    const imageCount = 200; // Set to load 200 images
    const extensions = ['jpg', 'jpeg', 'png']; // Supported image formats

    // List of "sexy" colors for the borders
    const borderColors = ['#FF69B4', '#C71585', '#FF1493', '#800080', '#FF6347', '#DC143C', '#FF4500', '#FF00FF', '#8A2BE2'];

    // Function to get a random color from the array
    function getRandomColor() {
        const randomIndex = Math.floor(Math.random() * borderColors.length);
        return borderColors[randomIndex];
    }

    // Load all 200 images
    for (let i = 1; i <= imageCount; i++) {
        extensions.forEach(ext => {
            const img = document.createElement('img');
            img.src = `${imageFolder}${i}.${ext}`; // Check that the images are named 1.jpg, 2.jpg, etc.
            img.alt = `Image ${i}`;
            img.onerror = () => img.remove(); // Remove image if it doesn't exist

            // Set random border color for each image
            img.style.border = `2px solid ${getRandomColor()}`;

            gallery.appendChild(img);
        });
    }

    // Variable to store the state of the currently fullscreen image
    let fullscreenImage = null;

    // Click event for images to toggle fullscreen
    gallery.addEventListener('click', function(event) {
        if (event.target.tagName === 'IMG') {
            const clickedImage = event.target;

            if (fullscreenImage === clickedImage) {
                // If the clicked image is already fullscreen, return it to its original place
                clickedImage.style.position = '';
                clickedImage.style.zIndex = '';
                clickedImage.style.width = '';
                clickedImage.style.height = '';
                clickedImage.style.transform = '';
                fullscreenImage = null; // Reset the fullscreen image state
            } else {
                // If a different image is clicked, make it fullscreen
                if (fullscreenImage) {
                    // Reset the previously fullscreen image
                    fullscreenImage.style.position = '';
                    fullscreenImage.style.zIndex = '';
                    fullscreenImage.style.width = '';
                    fullscreenImage.style.height = '';
                    fullscreenImage.style.transform = '';
                }

                // Make the clicked image fullscreen
                clickedImage.style.position = 'fixed';
                clickedImage.style.top = '50%';
                clickedImage.style.left = '50%';
                clickedImage.style.transform = 'translate(-50%, -50%)';
                clickedImage.style.zIndex = '1000'; // Bring it to the front
                clickedImage.style.width = '80vw'; // Adjust size as needed
                clickedImage.style.height = '80vh'; // Adjust size as needed

                // Set the clicked image as the current fullscreen image
                fullscreenImage = clickedImage;
            }
        }
    });

    // Hover effect to enlarge and bring the image to the foreground
    const images = gallery.querySelectorAll('img');

    images.forEach(img => {
        img.addEventListener('mouseenter', function() {
            img.style.transform = 'scale(1.2)'; // Increase size
            img.style.zIndex = '10'; // Bring to the front
            img.style.border = `3px solid ${getRandomColor()}`; // Change border to a new random color on hover
        });

        img.addEventListener('mouseleave', function() {
            img.style.transform = 'scale(1)'; // Return to original size
            img.style.zIndex = ''; // Remove the zIndex on hover out
            img.style.border = `2px solid ${getRandomColor()}`; // Revert to original random color
        });
    });
});
