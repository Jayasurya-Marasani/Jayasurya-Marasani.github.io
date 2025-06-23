    /* -----------------------------------------
     Footer Year Setup
     ----------------------------------------- */
    const currentYear = new Date().getFullYear();
    const footerCopyright = document.querySelector(".copyright");
    if (footerCopyright) {
        // Overwrite the text to include the current year
        // e.g., "© 2025 Jayasurya Marasani."
        footerCopyright.textContent = `© ${currentYear} Jayasurya Marasani.`;
    }