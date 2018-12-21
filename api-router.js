// Imports
const express = require('express');
const studentcontrollers = require('./routes/student-controllers');
const teachercontrollers = require('./routes/teacher-controllers');

// Router
exports.router = (() => {
    let apirouter = express.Router();

    // Teachers routes
    apirouter.route('/teacher/register/').post(teachercontrollers.register);
    apirouter.route('/teacher/count/').get(teachercontrollers.count);

    // Students routes
    //apirouter.route('/student/create/').post(studentcontrollers.create);
    //apirouter.route('/student/list/').get(studentcontrollers.list);
    //apirouter.route('/student/count/').get(studentcontrollers.count);

    return apirouter;
})();