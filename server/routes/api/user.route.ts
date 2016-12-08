import * as express from 'express';
import { User } from '../../models/user.model';
// import { Inspiration } from '../../models/inspiration.model';
import { Text, TextService } from '../../services/text.service';
import { InspirationService } from '../../services/inspiration.service';

const router = express.Router();

router.post('/', (req: any, res: express.Response, next: express.NextFunction) => {
  req.assert('name', 'Name is blank').notEmpty();
  req.assert('phoneNumber', 'Name is blank').notEmpty();
  req.assert('phoneNumber', 'Invalid number').isMobilePhone("en-US");

  const user = new User(...req.body)

  user.save( err => {
    if (err) return next(err);

    sendFirstInspiration(user, res)
      .then( () => {
      res.status(200);
    });
  });
});

function sendFirstInspiration(user, res: express.Response) {
  return InspirationService.getInstance().getRandom()
    .then( (inspiration: any) => {
      const text = new Text(user.phoneNumber, inspiration.content);
      return TextService.getInstance().sendText(text);
    });
}

export const userRouter = router
