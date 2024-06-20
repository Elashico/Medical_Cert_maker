document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('medicalForm');

    form.addEventListener('submit', async (event) => {
        event.preventDefault();

        const name = document.getElementById('name').value;
        const age = document.getElementById('age').value;
        const address = document.getElementById('address').value;
        const sex = document.getElementById('sex').value;
        const date_issued_input = document.getElementById('date'); // Get the date input element
        const date_issued = formatDate(date_issued_input.value); // Format the date value
        const illness = document.getElementById('illness').value;
        const doc = document.getElementById('doc').value;

        try {
            const response = await fetch('medical-cert.html');
            let certificateContent = await response.text();

            certificateContent = certificateContent
                .replace('<!--DATE-->', new Date().toLocaleDateString()) // This line is kept as-is
                .replace('<!--NAME-->', name)
                .replace('<!--AGE-->', age)
                .replace('<!--ADDRESS-->', address)
                .replace('<!--SEX-->', sex)
                .replace('<!--DATE_I-->', date_issued)
                .replace('<!--ILLNESS-->', illness)
                .replace('<!--DOC-->', doc);

            const previewWindow = window.open('', '_blank');
            previewWindow.document.open();
            previewWindow.document.write(certificateContent);
            previewWindow.document.close();
        } catch (error) {
            console.error('Error fetching the certificate template:', error);
        }
    });

    // Function to format the date as mm/dd/yyyy
    function formatDate(date) {
        const parts = date.split('-'); // Split by dash (-) assuming yyyy-mm-dd format
        if (parts.length === 3) {
            return `${parts[1]}/${parts[2]}/${parts[0]}`; // mm/dd/yyyy
        }
        return date; // Return as-is if format is unexpected
    }
});
