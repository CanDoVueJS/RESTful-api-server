import passport from 'passport';
import LocalStrategy from 'passport-local';
import { User } from '../models';

export default {
  init () {
    passport.use(new LocalStrategy.Strategy(
      { usernameField: 'email', passwordField: 'password' },
      async function (email, password, done) {
        console.log(email, password);
        // 인증 정보 체크 로직
        try {
          const user = await User.findOne({
            where: { email },
          });

          if (user.isValidPassword(password)) {
            return done(null, user);
          }
          else {
            return done(null, false, {});
          }
        }
        catch (e) {
          console.error(e);
          return done(null, false, {});
        }
      }
    ));
  },
};
