const Course = require('../models/Course')
const { mongooseToObject } = require('../../util/mongoose');

class CourseController {
    // [GET] /courses/:slug
    show (req, res, next) {
        Course.findOne({ slug: req.params.slug })
            .then(course => {
                res.render('courses/show', { course: mongooseToObject(course) });
            })
            .catch(next)
    }

    // [GET] /courses/create
    create (req, res, next) {
        res.render('courses/create')
    }

    // [POST] /courses/store
    store (req, res, next) {
        const formData = req.body;
        formData.image = 'https://scontent.fdad3-4.fna.fbcdn.net/v/t39.30808-6/363321386_1165496951519862_4056136368458591629_n.jpg?_nc_cat=101&cb=99be929b-59f725be&ccb=1-7&_nc_sid=09cbfe&_nc_ohc=wXTJ0GxriS0AX9KEMEX&_nc_ht=scontent.fdad3-4.fna&oh=00_AfAfa-nRJMcWzYOVSZlRzETjtvFfrubmmLzBHJ0qmZd-zA&oe=64CB74A9';
        const course = new Course(formData);
        course.save()
            .then(() => res.redirect('/'))
            .catch(error => {
                
            })
    }

    // [GET] /courses/:id/edit
    edit (req, res, next) {
        Course.findById(req.params.id)
            .then(course => res.render('courses/edit', {
                course: mongooseToObject(course)
            }))
            .catch(next);
    }

    // [PUT] /courses/:id
    update (req, res, next) {
        Course.updateOne({ _id: req.params.id }, req.body)
            .then(() => res.redirect('/me/stored/courses'))
            .catch(next);
    }

    // [DELETE] /courses/:id
    destroy (req, res, next) {
        Course.deleteOne({ _id: req.params.id })
            .then(() => res.redirect('back'))
            .catch(next)
    }
}

module.exports = new CourseController;
 