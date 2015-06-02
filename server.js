var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var phantom = require('phantom');

var public_dir = __dirname + '/public';
app.use(express.static(public_dir));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var server_port = process.env.OPENSHIFT_NODEJS_PORT || 8080
var server_ip = process.env.OPENSHIFT_NODEJS_IP || '127.0.0.1'

var router = express.Router();  

app.set('views', __dirname + '/views')
app.set('view engine', 'jade')



app.get('/',function(req,res){
    res.render('index')
});

router.route('/')

.post(function(req, res) {
    var url = req.body.url;
    phantom.create("--ignore-ssl-errors=yes", "--ssl-protocol=any", function (ph) {
        ph.createPage(function(page){
            page.set('viewportSize', {width:1920,height:1080}, function(){
                page.open(url, function(status){
                    if (status == "success") {

                        var image_file_name = url.replace(/\W/g, '_') + ".png"
                        var image_path = public_dir + "/images/" + image_file_name
                        page.render(image_path, function(){
                            res.json({ result: '/images/'+image_file_name}); 
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

app.use('/api', router);

server.listen(server_port, server_ip, function(){
  console.log("Listening on " + server_ip + ", server_port " + server_port)
});


