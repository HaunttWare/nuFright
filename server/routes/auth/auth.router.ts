// import express from 'express';
// import passport from 'passport';
// //import { send } from 'process';

// const authRouter = express.Router();
// authRouter.get('/login/failed', (req, res) => {
//   res.status(401).json({
//     success: false,
//     message: 'Counldn\'t login loser'
//   });
// })
// authRouter.get('/login/success', (req, res) => {
//   if (req.user) {
//     res.status(200).json({
//       success: true,
//       message: 'You\'re logged in but still kind of a loser ',
//       user: req.user
//     });
//   }
// })

// // authRouter.get('/logout', (req, res) => {
// //   req.logout();
// //   res.redirect('http://localhost:3000');
// // })

// authRouter.get('/google', passport.authenticate('google', {
//   scope: ['profile']
// }))

// authRouter.get('/google/callback', passport.authenticate('google', {
//     successRedirect: 'http://localhost:3000',
//     failureRedirect: '/login/failed'
// }))

// export default authRouter;

