const express=require('express'); 
const app=express();
const port = 4000;

app.set('puerto',5000);
app.set('view engine','ejs');
app.get('/',(req,res)=>{
    res.render('index.ejs');
   })
app.use(function(err,req,res,next){
    console.error(err.stack);
    res.status(500).send('Algo esta aberiado');
});



function logger(req,res,next){
    console.log('Ruta Recibida '+ req.protocol+'://'+req.get('host')+ req.originalUrl);
    next();
}

const morgan=require('morgan');
app.use(morgan('combined'));
app.use(morgan('dev'));
app.use(express.static('public'));

app.use(express.json());

app.get('/misitio', (req,res)=>{ res.send('Bienvenido a mi sitio web');
});

app.get('/misitio/gastos', (req,res)=>{ res.json(
    {
    gasto:'Salud',
    monto:14575.60,
    informacion:'Corresponde a consultas médicas, pagos de seguros, medicinas'
    } );
});

app.post('/misitio/calculo', (req,res)=>{ 
    console.log(req.body)  ; 
    res.send('Cálculo impuesto a la renta');
});

app.post('/misitio/usuario/:id',(req, res)=>{
    console.log(req.body);
    console.log(req.params);
    res.send('Usuario nuevo registrado');
    })

app.put('/misitio/usuario/:id', (req,res)=>{
    res.send('Usuario '+ (req.params.id) +' actualizado');
   });

app.delete('/misitio/usuario/:id', (req,res)=>{
    res.send('Usuario '+ (req.params.id) +' borrado');
   });

app.get('/misitio/about', (req,res)=>{ res.send('<h1>Acerca de nosotros</h1>');
});

app.get('/misitio/gastos/vivienda', (req,res)=>{ res.send('misitio-gastos-vivienda');
});

app.get('/misitio/gastos/salud', (req,res)=>{ res.send('sitio-gastos-salud');
});

app.set('nombreApp','Aplicacion para manejo de gastos SRI');
console.log(app.get('nombreApp'));
app.listen(app.get('puerto'), ()=>{
    console.log('Nombre de la App',app.get('nombreApp'));
    console.log('Puerto del servidor',app.get('puerto'));
   })




