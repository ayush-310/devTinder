# DevTinderAPIS

## authRouter (folder)
- POST/signup
- POST/login
- POST/logout

## ProfileRouter
- GET/profile/view
- PATCH/profile/edit
- PATCH/profile/password (diff API for updating email,password)


## ConnectionRequestRouter
- POST/request/send/interested/:userId
- POST/request/send/ignored/:userId
- POST /request/review/accepted/:requestId
- POST /request/review/rejected/:requestId


## userRouter
- GET /user/connections
- GET /user/requests
- GET /user/feed - Gets you the profiles of other users on platform


Status : ignore, interested, accepted, rejected
