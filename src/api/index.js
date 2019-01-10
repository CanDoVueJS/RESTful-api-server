import { version } from '../../package.json';
import { Router } from 'express';
import passportLib from '../lib/passport';
// import { isAuthenticated } from '../lib/jwt';

/** @desv Views */
import AuthView from './Auth';
import UserView from './User';
import PostView from './Post';

export default ({ config }) => {
  passportLib.init();

  const API = Router();

  // mount the test resource
  API.use('/auth', AuthView);
  API.use('/users', UserView);
  API.use('/posts', PostView);

  // perhaps expose some API metadata at the root
  API.get('/', (req, res) => {
    res.json({ version });
  });

  return API;
};
