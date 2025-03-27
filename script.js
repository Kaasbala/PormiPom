document.addEventListener("DOMContentLoaded", function () {
    const gallery = document.getElementById('gallery');
    const imageFolder = './'; // Images are stored in the same directory as the HTML file
    const imageCount = 200; // Set to load 200 images
    const extensions = ['jpg', 'jpeg', 'png']; // Supported image formats

    // List of colors for the borders
    const borderColors = ['#FF69B4', '#C71585', '#FF1493', '#800080', '#FF6347', '#DC143C', '#FF4500', '#FF00FF', '#8A2BE2'];

    // Function to get a random color from the array
    function getRandomColor() {
        return borderColors[Math.floor(Math.random() * borderColors.length)];
    }

    // Load all images
    for (let i = 1; i <= imageCount; i++) {
        extensions.forEach(ext => {
            const img = document.createElement('img');
            img.src = `${imageFolder}${i}.${ext}`;
            img.alt = `Image ${i}`;
            img.onerror = () => img.remove(); // Remove image if it doesn't exist
            img.style.border = `2px solid ${getRandomColor()}`;
            gallery.appendChild(img);
        });
    }

    // Click event for images to toggle fullscreen duplicate
    gallery.addEventListener('click', function (event) {
        if (event.target.tagName === 'IMG') {
            const clickedImage = event.target;
            let fullscreenImage = document.getElementById('fullscreen-image');

            if (fullscreenImage) {
                fullscreenImage.remove(); // Remove existing fullscreen image
                document.body.style.overflow = 'auto'; // Restore scrolling
            } else {
                fullscreenImage = document.createElement('img');
                fullscreenImage.src = clickedImage.src;
                fullscreenImage.id = 'fullscreen-image';

                // **Apply fullscreen styles**
                fullscreenImage.style.position = 'fixed';
                fullscreenImage.style.top = '0';
                fullscreenImage.style.left = '0';
                fullscreenImage.style.width = '100vw';  // Full viewport width
                fullscreenImage.style.height = '100vh'; // Full viewport height
                fullscreenImage.style.objectFit = 'contain'; // Ensure it scales properly
                fullscreenImage.style.background = 'rgba(0, 0, 0, 0.8)'; // Darken background
                fullscreenImage.style.border = `4px solid ${getRandomColor()}`;
                fullscreenImage.style.zIndex = '1000';
                fullscreenImage.style.cursor = 'pointer';
                fullscreenImage.style.boxShadow = '0px 0px 20px rgba(0,0,0,0.5)';

                // Remove fullscreen image on click
                fullscreenImage.addEventListener('click', function () {
                    fullscreenImage.remove();
                    document.body.style.overflow = 'auto';
                });

                document.body.appendChild(fullscreenImage);
                document.body.style.overflow = 'hidden'; // Prevent scrolling
            }
        }
    });

    // Hover effect to enlarge and bring the image to the foreground
    const images = gallery.querySelectorAll('img');
    images.forEach(img => {
        img.addEventListener('mouseenter', function () {
            img.style.transform = 'scale(1.8)';
            img.style.zIndex = '10';
            img.style.border = `3px solid ${getRandomColor()}`;
        });

        img.addEventListener('mouseleave', function () {
            img.style.transform = 'scale(1)';
            img.style.zIndex = '';
            img.style.border = `2px solid ${getRandomColor()}`;
        });
    });
});
