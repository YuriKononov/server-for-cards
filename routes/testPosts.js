const router = require('express').Router();
const verify = require('../middleware/authMiddleware');

router.get('/test', verify, (req, res)=>{
    res.json({posts :{
        title: 'asdsdsd',
        des: 'sdsdsdsd'
    }})
})

module.exports = router;