var express = require('express');
var router = express.Router();
var phantom = require('phantom');

router.post('/', function(req, res) {
    var url = req.body.url;
    phantom.create("--ignore-ssl-errors=yes", "--ssl-protocol=any", function (ph) {
        ph.createPage(function(page){
            page.set('viewportSize', {width:1920,height:1080}, function(){
                page.open(url, function(status){
                    if (status == "success") {
                        var image_file_name = url.replace(/\W/g, '_') + ".png";
                        var image_path =  __dirname + "/../public/images/" + image_file_name;
                        page.render(image_path, function(){
                            res.json({ result: '/images/'+ image_file_name }); 
                        });
                    }
                    else {
                        res.json({ result: 'Hello World' });   
                    }
                    page.close();
                    ph.exit();
                });
            });	
        });
    });

})
module.exports = router;
