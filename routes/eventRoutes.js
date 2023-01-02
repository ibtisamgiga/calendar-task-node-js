const mongoose = require('mongoose')
const express = require('express');
const router = express.Router()
const ec=require('../controllers/eventsController')


router.post('/',ec.create_Event_post)

router.get("/all-events",ec.get_all_events)

router.get("/calendar",ec.get_calendar_events)

router.get("/del/:id",ec.del_events)

router.get('/update/:id',ec.event_update)

router.put('/:id',ec.event_update_post)


module.exports = router