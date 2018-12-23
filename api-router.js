// Imports
const express = require('express');
const teachercontrollers = require('./routes/teacher-controllers');

// Router
exports.router = (() => {
    let apirouter = express.Router();

    // Teachers routes
    apirouter.route('/teacher/register/').post(teachercontrollers.register);
    apirouter.route('/teacher/login/').post(teachercontrollers.login);
    apirouter.route('/teacher/set-establishment/').post(teachercontrollers.set_establishment);
    apirouter.route('/teacher/count/').get(teachercontrollers.count);

    return apirouter;
})();