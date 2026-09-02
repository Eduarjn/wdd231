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

// Function to render courses
function renderCourses(courseList) {
    courseContainer.innerHTML = ''; // Clear container
    
    courseList.forEach(course => {
        const badge = document.createElement('div');
        badge.classList.add('course-badge');
        if (course.completed) {
            badge.classList.add('completed');
        }
        badge.innerHTML = `${course.subject} ${course.number}`;
        courseContainer.appendChild(badge);
    });

    // Calculate total credits using reduce()
    const totalCredits = courseList.reduce((acc, course) => acc + course.credits, 0);
    totalCreditsDisplay.innerHTML = `Total Credits: <strong>${totalCredits}</strong>`;
}

// Event Listeners for Filters
document.getElementById('btn-all').addEventListener('click', () => {
    renderCourses(courses);
});

document.getElementById('btn-cse').addEventListener('click', () => {
    const cseCourses = courses.filter(course => course.subject === 'CSE');
    renderCourses(cseCourses);
});

document.getElementById('btn-wdd').addEventListener('click', () => {
    const wddCourses = courses.filter(course => course.subject === 'WDD');
    renderCourses(wddCourses);
});

// Initial Render
renderCourses(courses);