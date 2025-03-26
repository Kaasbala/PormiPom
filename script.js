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

            // Check if the clicked image is already fullscreen
            if (fullscreenImage === clickedImage) {
                // If the clicked image is already fullscreen, return it to its original place
                clickedImage.classList.remove('fullscreen');
                document.body.style.overflow = 'auto'; // Allow scrolling again
                fullscreenImage = null; // Reset the fullscreen image state
            } else {
                // If a different image is clicked, make it fullscreen
                if (fullscreenImage) {
                    // Reset the previously fullscreen image
                    fullscreenImage.classList.remove('fullscreen');
                }

                // Make the clicked image fullscreen
                clickedImage.classList.add('fullscreen');
                document.body.style.overflow = 'hidden'; // Prevent scrolling when image is fullscreen
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
