// Provided course array
const courses = [
    {
        subject: 'CSE',
        number: 110,
        title: 'Introduction to Programming',
        credits: 2,
        certificate: 'Web and Computer Programming',
        description: 'This course will introduce students to programming.',
        technology: ['Python'],
        completed: true
    },
    {
        subject: 'WDD',
        number: 130,
        title: 'Web Fundamentals',
        credits: 2,
        certificate: 'Web and Computer Programming',
        description: 'This course introduces students to the World Wide Web.',
        technology: ['HTML', 'CSS'],
        completed: true
    },
    {
        subject: 'CSE',
        number: 111,
        title: 'Programming with Functions',
        credits: 2,
        certificate: 'Web and Computer Programming',
        description: 'Students become more organized, efficient programmers.',
        technology: ['Python'],
        completed: true
    },
    {
        subject: 'CSE',
        number: 210,
        title: 'Programming with Classes',
        credits: 2,
        certificate: 'Web and Computer Programming',
        description: 'This course will introduce the notion of classes and objects.',
        technology: ['C#'],
        completed: true
    },
    {
        subject: 'WDD',
        number: 131,
        title: 'Dynamic Web Fundamentals',
        credits: 2,
        certificate: 'Web and Computer Programming',
        description: 'Builds on prior experience in Web Fundamentals and programming.',
        technology: ['HTML', 'CSS', 'JavaScript'],
        completed: true
    },
    {
        subject: 'WDD',
        number: 231,
        title: 'Frontend Web Development I',
        credits: 2,
        certificate: 'Web and Computer Programming',
        description: 'Builds on prior experience with Dynamic Web Fundamentals.',
        technology: ['HTML', 'CSS', 'JavaScript'],
        completed: false // Indicating the current course is not completed yet
    }
];

const courseContainer = document.getElementById('course-list');
const totalCreditsDisplay = document.getElementById('total-credits');
const filterButtons = document.querySelectorAll('.filter-buttons button');

// Highlight the filter button that is currently applied
function setActiveButton(activeId) {
    filterButtons.forEach(button => {
        button.classList.toggle('active', button.id === activeId);
    });
}

// Build the course cards and the credit total for whatever list is passed in
function renderCourses(courseList) {
    courseContainer.innerHTML = '';

    courseList.forEach(course => {
        const badge = document.createElement('div');
        badge.classList.add('course-badge');
        if (course.completed) {
            badge.classList.add('completed');
        }
        badge.textContent = `${course.subject} ${course.number}`;
        badge.title = `${course.title} — ${course.credits} credits`;
        courseContainer.appendChild(badge);
    });

    // Total credits for the courses currently displayed, using reduce()
    const totalCredits = courseList.reduce((total, course) => total + course.credits, 0);
    totalCreditsDisplay.innerHTML = `Total Credits: <strong>${totalCredits}</strong>`;
}

// Filter buttons
document.getElementById('btn-all').addEventListener('click', () => {
    renderCourses(courses);
    setActiveButton('btn-all');
});

document.getElementById('btn-cse').addEventListener('click', () => {
    renderCourses(courses.filter(course => course.subject === 'CSE'));
    setActiveButton('btn-cse');
});

document.getElementById('btn-wdd').addEventListener('click', () => {
    renderCourses(courses.filter(course => course.subject === 'WDD'));
    setActiveButton('btn-wdd');
});

// Initial render shows every course
renderCourses(courses);