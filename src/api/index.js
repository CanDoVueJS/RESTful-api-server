import { version } from '../../package.json';
import { Router } from 'express';
import passportLib from '../lib/passport';

/** @desv Views */
import AuthView from './auth';
import UserView from './user';
import PostView from './post';
import MemoView from './memo';

export default ({ config }) => {
  passportLib.init();

  const API = Router();

  // mount the test resource
  API.use('/auth', AuthView);
  API.use('/users', UserView);
  API.use('/posts', PostView);
  API.use('/memos', MemoView);

  // perhaps expose some API metadata at the root
  API.get('/', (req, res) => {
    res.json({ version });
  });

  return API;
};
