import { getFacultyById, getSortedFaculty } from '../../models/faculty/faculty.js';

// Display the list of all faculty members
const facultyListPage = (req, res) => {
    const sortBy = req.query.sort || 'name';

    const facultyList = getSortedFaculty(sortBy);

    res.render('faculty/list', {
        title: 'Faculty Directory',
        facultyList,
        sortBy
    });
};

// Display one faculty member's details
const facultyDetailPage = (req, res) => {
    const facultyId = req.params.facultyId;

    const faculty = getFacultyById(facultyId);

    if (!faculty) {
        return res.status(404).render('404', {
            title: '404 - Page Not Found'
        });
    }

    res.render('faculty/detail', {
        title: faculty.name,
        faculty
    });
};

export { facultyListPage, facultyDetailPage };