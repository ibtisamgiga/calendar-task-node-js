const Event = require('../model/Event');


const create_Event_post = async (req, res) => {

    const event = new Event(req.body)
    const result = await event.save()
    console.log(result)
    res.redirect('/events/calendar')

}


const get_all_events = async (req, res) => {

    try {
        const events = await Event.find().sort({ createdAt: -1 });
        //res.render('index', { myevents:events ,makeEvent:helper.makeEvent});
        res.status(201).json(events)
    }
    catch (err) {
        res.send(err)
    }

}



const get_calendar_events = async (req, res) => {

    try {
        const events = await Event.find().sort({ createdAt: -1 });
        res.render('index', { myevents: events });
        //res.json(events)
    }
    catch (err) {
        res.send(err)
    }

}


const del_events =async(req,res)=>{

    const event= await Event.findByIdAndDelete( req.params.id)
    if (!event) return res.status(404).send("ERROR 404");
    res.redirect('/events/calendar')

}



const event_update = async (req, res) => {

    const event = await Event.findById(req.params.id);
    if (!event) return res.status(404).send('404');

    res.render('update', { event });





}

const event_update_post = async (req, res) => {

    // const blog = new Blog(req.body)
    // const result = await blog.save()
    // console.log(result)
    
    try {
        console.log('Request fired')
        const event = await Event.findByIdAndUpdate(req.params.id, {
            $set: {
                name: req.body.name,
                location: req.body.location,
                stime: req.body.stime,
                etime: req.body.etime,
            }
        }, { new: true });
      //res.redirect('/blogs/blogsall')
      res.json({success : true}) 
    } catch (e) {
        console.log(e)
    }

   // res.redirect('/blogs/blogsall')
}










module.exports = {
    create_Event_post,
    get_all_events,
    get_calendar_events,
    del_events,
    event_update,
    event_update_post
}