document.addEventListener("DOMContentLoaded", () => {
    console.log("Resume page loaded successfully!");

    // Example: Show/hide sections
    const sections = document.querySelectorAll(".section");
    sections.forEach(section => {
        section.addEventListener("click", () => {
            section.classList.toggle("expanded");
        });
    });
});
