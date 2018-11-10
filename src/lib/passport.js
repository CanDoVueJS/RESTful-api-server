import passport from 'passport';
import LocalStrategy from 'passport-local';
import { User } from '../models';

export const init = function () {
  passport.use(new LocalStrategy.Strategy({
    usernameField: 'email',
    passwordField: 'password',
  },
  async function (email, password, done) {
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
      return done(null, false, {});
    }
  }
  ));
};
