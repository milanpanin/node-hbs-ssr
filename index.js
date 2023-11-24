import express from 'express';
import { engine } from 'express-handlebars';

const app = express();

app.engine('handlebars', engine());
app.set('view engine', 'handlebars');
app.set('views', './views');
app.use(express.static('public'));

app.get('/:lang/home', async (req, res) => {
  const lang = req.params.lang;
  const data = await import(`./data/home/home_${lang}.json`, { assert: { type: 'json' } });

  res.render('home', data.default);
});

app.get('/:lang/about', async (req, res) => {
  const lang = req.params.lang;
  const data = await import(`./data/about/about_${lang}.json`, { assert: { type: 'json' } });

  res.render('about', data.default);
});

app.use((req, res) => {
  res.status(404).send("404 - Page Not Found");
})

app.listen(3000);