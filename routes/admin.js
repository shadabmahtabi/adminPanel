var express = require('express');
var router = express.Router();
const userModel = require('./users')

// GET /admin
router.get('/', function(req, res, next) {
  res.render('admin', { title: 'Express' });
});

// GET /admin/staffs/
router.get('/staffs', async function(req, res, next) {

  const users = await userModel.find().exec()

  res.render('staffs', { title: 'All Staff', users });
});

// GET /admin/staff/:id
router.get('/staff/:id', async function(req, res, next) {

  const user = await userModel.findById(req.params.id).exec()

  res.render('staff-profile', { title: 'All Staff', user });
});

// GET /admin/staff/account/:id
router.get('/staff/account/:id', async function(req, res, next) {

  const user = await userModel.findById(req.params.id).exec()

  res.render('staff-account-details', { title: 'All Staff', user });
});

// POST /admin/staff/update/:id
router.post('/staff/update/:id', async function(req, res, next) {
  
  await userModel.findOneAndUpdate({_id: req.params.id}, req.body).exec()
  
  const user = await userModel.findById(req.params.id).exec()
  
  res.render('staff-account-details', { title: 'All Staff', user });
});

// POST /admin/staff/delete/:id
router.get('/staff/delete/:id', async function(req, res, next) {

  await userModel.findOneAndDelete({_id: req.params.id}).exec()

  res.redirect('/admin/staffs')
});

// GET /admin/calendar/
router.get('/calendar', function(req, res, next) {
  res.render('calendar', { title: 'Calendar' });
});

// GET /admin/messages/
router.get('/messages', function(req, res, next) {
  res.render('messages', { title: 'All Staff' });
});


// girl = https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=1964&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D

// boy = https://images.unsplash.com/photo-1529068755536-a5ade0dcb4e8?q=80&w=1781&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D

// man = https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D


module.exports = router;
