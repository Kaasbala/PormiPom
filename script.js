document.addEventListener("DOMContentLoaded", function() {
    const gallery = document.getElementById('gallery');
    const imageFolder = './'; // Images are stored in the same directory
    const imageCount = 200; // Adjust to the number of images in your directory
    const extensions = ['jpg', 'jpeg', 'png']; // Supported image formats

    for (let i = 1; i <= imageCount; i++) {
        extensions.forEach(ext => {
            const img = document.createElement('img');
            img.src = `${imageFolder}${i}.${ext}`;
            img.alt = `Image ${i}`;
            img.onerror = () => img.remove(); // Remove if image doesn't exist
            gallery.appendChild(img);
        });
    }

    // Hover effect to enlarge the image
    const images = gallery.querySelectorAll('img');

    images.forEach(img => {
        img.addEventListener('mouseenter', function() {
            img.style.transform = 'scale(1.5)'; // Increase size
        });

        img.addEventListener('mouseleave', function() {
            img.style.transform = 'scale(1)'; // Return to original size
        });
    });
});
