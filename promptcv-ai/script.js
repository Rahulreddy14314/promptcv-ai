document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('resume-form');
    const emptyState = document.getElementById('empty-state');
    const resumePreview = document.getElementById('resume');
    const downloadBtn = document.getElementById('download-btn');
    
    // Output elements
    const outName = document.getElementById('out-name');
    const outExperience = document.getElementById('out-experience');
    const outEducation = document.getElementById('out-education');
    const outSkills = document.getElementById('out-skills');

    const autoFillBtn = document.getElementById('auto-fill-btn');

    autoFillBtn.addEventListener('click', () => {
        document.getElementById('fullName').value = 'Alex Morgan';
        document.getElementById('skills').value = 'JavaScript, React, Node.js, TypeScript, Python, SQL, Git, AWS';
        document.getElementById('education').value = 'Bachelor of Science in Computer Science\nUniversity of Technology\nGraduated: May 2021';
        document.getElementById('experience').value = 'Senior Frontend Engineer | TechCorp\nJune 2021 - Present\n- Led the development of a scalable React-based dashboard, improving load times by 40%.\n- Mentored junior developers and conducted code reviews to ensure code quality.\n\nWeb Developer Intern | Creative Solutions\nJan 2020 - May 2021\n- Built responsive landing pages using HTML, CSS, and vanilla JavaScript.\n- Collaborated with designers to implement UI/UX improvements.';
    });

    form.addEventListener('submit', (e) => {
        e.preventDefault();

        // Get values
        const name = document.getElementById('fullName').value;
        const skills = document.getElementById('skills').value;
        const education = document.getElementById('education').value;
        const experience = document.getElementById('experience').value;

        // Set values
        outName.textContent = name;
        outExperience.textContent = experience;
        outEducation.textContent = education;

        // Process skills (comma separated)
        outSkills.innerHTML = '';
        const skillsArray = skills.split(',').map(s => s.trim()).filter(s => s);
        skillsArray.forEach(skill => {
            const li = document.createElement('li');
            li.textContent = skill;
            outSkills.appendChild(li);
        });

        // Toggle visibility with animation
        emptyState.style.display = 'none';
        resumePreview.classList.remove('hidden');
        downloadBtn.style.display = 'flex';
        
        // Slight scroll on mobile to show the result
        if (window.innerWidth < 768) {
            resumePreview.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    });

    function downloadResume() {
        const resumeElement = document.getElementById('resume');
        
        const opt = {
            margin:       0.5,
            filename:     'PromptCV_Resume.pdf',
            image:        { type: 'jpeg', quality: 0.98 },
            html2canvas:  { scale: 2, useCORS: true },
            jsPDF:        { unit: 'in', format: 'a4', orientation: 'portrait' }
        };
        
        html2pdf().set(opt).from(resumeElement).save();
    }

    downloadBtn.addEventListener('click', downloadResume);
});
