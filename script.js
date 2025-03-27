document.addEventListener("DOMContentLoaded", function () {
    const gallery = document.getElementById('gallery');
    const imageFolder = './'; // Images are stored in the same directory as the HTML file
    const imageCount = 200; // Set to load 200 images
    const extensions = ['jpg', 'jpeg', 'png']; // Supported image formats

    // List of colors for the borders
    const borderColors = ['#FF69B4', '#C71585', '#FF1493', '#800080', '#FF6347', '#DC143C', '#FF4500', '#FF00FF', '#8A2BE2'];

    function getRandomColor() {
        return borderColors[Math.floor(Math.random() * borderColors.length)];
    }

    // Load all images
    for (let i = 1; i <= imageCount; i++) {
        extensions.forEach(ext => {
            const img = document.createElement('img');
            img.src = `${imageFolder}${i}.${ext}`;
            img.alt = `Image ${i}`;
            img.onerror = () => img.remove();
            img.style.border = `2px solid ${getRandomColor()}`;
            gallery.appendChild(img);

            // Attach hover effect only to gallery images
            img.addEventListener('mouseenter', function () {
                if (!img.classList.contains('fullscreen')) { // Prevent scaling for fullscreen
                    img.style.transform = 'scale(1.8)';
                    img.style.zIndex = '10';
                    img.style.border = `3px solid ${getRandomColor()}`;
                }
            });

            img.addEventListener('mouseleave', function () {
                if (!img.classList.contains('fullscreen')) { // Prevent scaling for fullscreen
                    img.style.transform = 'scale(1)';
                    img.style.zIndex = '';
                    img.style.border = `2px solid ${getRandomColor()}`;
                }
            });
        });
    }

    // Click event for images to toggle fullscreen duplicate
    gallery.addEventListener('click', function (event) {
        if (event.target.tagName === 'IMG') {
            const clickedImage = event.target;
            let fullscreenOverlay = document.getElementById('fullscreen-overlay');

            if (fullscreenOverlay) {
                fullscreenOverlay.remove();
                document.body.style.overflow = 'auto';
            } else {
                // Create overlay
                fullscreenOverlay = document.createElement('div');
                fullscreenOverlay.id = 'fullscreen-overlay';
                fullscreenOverlay.style.position = 'fixed';
                fullscreenOverlay.style.top = '0';
                fullscreenOverlay.style.left = '0';
                fullscreenOverlay.style.width = '100vw';
                fullscreenOverlay.style.height = '100vh';
                fullscreenOverlay.style.background = 'rgba(0, 0, 0, 0.8)';
                fullscreenOverlay.style.display = 'flex';
                fullscreenOverlay.style.alignItems = 'center';
                fullscreenOverlay.style.justifyContent = 'center';
                fullscreenOverlay.style.zIndex = '1000';
                fullscreenOverlay.style.cursor = 'pointer';

                // Create fullscreen image inside overlay
                const fullscreenImage = document.createElement('img');
                fullscreenImage.src = clickedImage.src;
                fullscreenImage.id = 'fullscreen-image';
                fullscreenImage.classList.add('fullscreen');
                fullscreenImage.style.maxWidth = '90vw';
                fullscreenImage.style.maxHeight = '90vh';
                fullscreenImage.style.border = `4px solid ${getRandomColor()}`;
                fullscreenImage.style.boxShadow = '0px 0px 20px rgba(0,0,0,0.5)';

                // Close fullscreen on click
                fullscreenOverlay.addEventListener('click', function () {
                    fullscreenOverlay.remove();
                    document.body.style.overflow = 'auto';
                });

                // Append image to overlay
                fullscreenOverlay.appendChild(fullscreenImage);
                document.body.appendChild(fullscreenOverlay);
                document.body.style.overflow = 'hidden';
            }
        }
    });
});
