const express = require('express')
const expressHandlebars = require('express-handlebars')
const app = express()

const fortunes = [
  "Vença seus medos ou eles vão te conquistar",
  "Rios precisam de nascentes",
  "Não tema o que você não conhece",
  "Você terá uma surpresa agradável",
  "Sempre que possível, mantenha-o simples"
]

app.use(express.static(__dirname+'/public'))
//configura o view engine Handlebars
app.engine('handlebars',expressHandlebars({
  defaultLayout:'main',
}))
app.set('view engine','handlebars')

const port = process.env.PORT | 3000

app.get('/',(req,res)=>res.render('home'))

app.get('/home',(req,res)=>res.render('home'))

app.get('/about',(req,res) => {
  const randomFortune = fortunes[Math.floor(Math.random()*fortunes.length)]
  res.render('about',{fortune:randomFortune})
})

// pagina 404 personalizada
app.use((req,res)=> {
  res.status(404)
  res.render('404')
})

// pagina 500 personalizada
app.use((req,res,next)=> {
  console.error(err.mesage)
  res.status(500)
  res.render('500')
})

app.listen(port,()=>console.log(
  `Express iniciado emhttp://localhost:${port};`
  + `tecle Ctrl-C para terminar.` ))
