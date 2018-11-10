import resource from 'resource-router-middleware';
import { User } from '../models';

export default ({ config }) => resource({
  id: 'user',
  /** For requests with an `id`, you can auto-load the entity.
   *  Errors terminate the request, success sets `req[id] = data`.
   */
  async load (req, id, callback) {
    try {
      const user = await User.findById(id);
      callback(user ? null : 'Not Found', user);
    }
    catch (e) {}
  },
  /** GET / - List all entities */
  async index ({ params }, res) {
    try {
      const users = await User.findAll();
      res.json(users);
    }
    catch (e) {}
  },
  /** POST / - Create a new entity */
  async create (req, res) {
    const newUser = await User.create({
      email: req.body.email,
      password: req.body.password,
      name: req.body.name,
    });
    res.json({
      id: newUser.null,
      email: newUser.email,
      name: newUser.name,
    });
  },

  /** GET /:id - Return a given entity */
  read ({ user }, res) {
    res.json(user);
  },

  /** PUT /:id - Update a given entity */
  update ({ facet, body }, res) {
    // for (let key in body) {
    //   if (key !== 'id') {
    //     facet[key] = body[key];
    //   }
    // }
    // res.sendStatus(204);
  },

  /** DELETE /:id - Delete a given entity */
  delete ({ facet }, res) {
    // test.splice(test.indexOf(facet), 1);
    // res.sendStatus(204);
  },
});
