import http from 'http';
import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import bodyParser from 'body-parser';
import middleware from './middleware';
import api from './api';
import config from './config.json';

let app = express();
app.server = http.createServer(app);


// logger
app.use(morgan('dev'));

// 3rd party middleware
app.use(cors({
  exposedHeaders: config.corsHeaders,
}));

app.use(express.json());

// internal middleware
app.use(middleware({ config }));

// api router
app.get('/', function (req, res) {
  res.send('API 서버가 정상적으로 실행되고 있습니다.');
});
app.use('/api', api({ config }));
app.use('/assets', express.static('src/assets'));

app.server.listen(process.env.PORT || config.port, () => {
  console.log('=======================================================================================================');
  console.log(`API 서버가 성공적으로 실행되었습니다. 브라우저를 통해 localhost:${app.server.address().port}에 접속해보세요!`);
  console.log('=======================================================================================================');
});

export default app;
