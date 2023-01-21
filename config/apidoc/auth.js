/**
 * @api {post} /v1/auth/register Register
 * @apiDescription Register new user
 * @apiVersion 1.0.0
 * @apiName RegisterUser
 * @apiGroup Auth
 * @apiPermission public
 *
 * @apiHeader {string} Content-Type
 * @apiHeaderExample {json} Header-Example:
 *     {
 *       "Content-Type": "application/json",
 *     }
 *
 * @apiParam {string} email Email
 * @apiParam {string} password Password
 * @apiParam {string} firstName First name
 * @apiParam {string} lastName Last name
 * @apiParamExample {json} Request-Example:
 *     {
 *       "email": "user@api.com",
 *       "password": "password",
 *       "firstName": "User",
 *       "lastName":"Api"
 *     }
 *
 * @apiSuccess (200) {String}  message API message
 *
 * @apiSuccessExample {json} Success-Response:
 *  HTTP/1.1 200
 *  {
 *    "message": "User registered successfully",
 *  }
 *
 */

/**
 * @api {post} /v1/auth/login Login
 * @apiDescription User login
 * @apiVersion 1.0.0
 * @apiName UserLogin
 * @apiGroup Auth
 * @apiPermission public
 *
 * @apiHeader {string} Content-Type
 * @apiHeaderExample {json} Header-Example:
 *     {
 *       "Content-Type": "application/json",
 *     }
 *
 * @apiParam {string} email Email
 * @apiParam {string} password Password
 * @apiParamExample {json} Request-Example:
 *     {
 *       "email": "admin@api.com",
 *       "password": "password",
 *     }
 *
 * @apiSuccess (200) {String}  message API message
 * @apiSuccess (200) {any}  data API login data
 * @apiSuccess (200) {string}  data._id User Id
 * @apiSuccess (200) {string}  data.token Access token
 * @apiSuccess (200) {string}  data.refreshToken Refresh token
 *
 * @apiSuccessExample {json} Success-Response:
 *  HTTP/1.1 200
 *  {
 *    "message": "Login successful",
 *    "data": {
 *      "_id": "6044d1f52fbf64cef88e529d",
 *      "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MDQ0ZDFmNTJmYmY2NGNlZjg4ZTUyOWQiLCJyb2xlIjoiYWRtaW4iLCJpYXQiOjE2MTUxMjQwMjYsImV4cCI6MTYxNTIxMDQyNn0.LmX0MSXiQz4H0wvBfYyq2WfiFRGZhp4o_vRZk90RwbY",
 *      "role": "admin",
 *      "refreshToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MDQ0ZDFmNTJmYmY2NGNlZjg4ZTUyOWQiLCJyb2xlIjoiYWRtaW4iLCJpYXQiOjE2MTUxMjQwMjYsImV4cCI6MTYxNTcyODgyNn0.P-ZMqaw1Ht12KveKyPNILgVskXNBo1x0GdL23J7RV2s"
 *    }
 *  }
 *
 */

/**
 * @api {post} /v1/auth/verify-email VerifyEmail
 * @apiDescription Verify Email
 * @apiVersion 1.0.0
 * @apiName VerifyEmail
 * @apiGroup Auth
 * @apiPermission public
 *
 * @apiHeader {string} Content-Type
 * @apiHeaderExample {json} Header-Example:
 *     {
 *       "Content-Type": "application/json",
 *     }
 *
 * @apiParam {string} token Token provided in email
 * @apiParamExample {json} Request-Example:
 *     {
 *       "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InRlc3QxQHlvcG1haWwuY29tIiwiaWF0IjoxNjE1MDE3ODE0LCJleHAiOjE2MTUxMDQyMTR9.TrGQVxJ8QS_oMve_N2-Wc0hF1S6xokb6m2iyZ1AWsRQ",
 *     }
 *
 * @apiSuccess (200) {String}  message API message
 * @apiSuccess (200) {Boolean}  data Email verified or not
 *
 * @apiSuccessExample {json} Success-Response:
 *  HTTP/1.1 200
 *  {
 *    "message": "Email verified",
 *    "data": true
 *  }
 *
 */

/**
 * @api {post} /v1/auth/forgot-password ForgotPassword
 * @apiDescription Forgot password
 * @apiVersion 1.0.0
 * @apiName ForgotPassword
 * @apiGroup Auth
 * @apiPermission public
 *
 * @apiHeader {string} Content-Type
 * @apiHeaderExample {json} Header-Example:
 *     {
 *       "Content-Type": "application/json",
 *     }
 *
 * @apiParam {string} email User email
 * @apiParamExample {json} Request-Example:
 *     {
 *       "email": "user@api.com",
 *     }
 *
 * @apiSuccess (200) {String}  message API message
 * @apiSuccess (200) {Boolean}  data If the reset link is sent or not
 *
 * @apiSuccessExample {json} Success-Response:
 *  HTTP/1.1 200
 *  {
 *    "message": "Reset link has been sent",
 *    "data": true
 *  }
 *
 */

/**
 * @api {post} /v1/auth/reset-password ResetPassword
 * @apiDescription Reset password
 * @apiVersion 1.0.0
 * @apiName ResetPassword
 * @apiGroup Auth
 * @apiPermission public
 *
 * @apiHeader {string} Content-Type
 * @apiHeaderExample {json} Header-Example:
 *     {
 *       "Content-Type": "application/json",
 *     }
 *
 * @apiParam {string} token Token provided in email
 * @apiParam {string} password New password
 * @apiParamExample {json} Request-Example:
 *     {
 *       "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MDQzMzc1NjM3OTgwZDQ3MjY5ZTMzNDAiLCJpYXQiOjE2MTUwMTc5MTUsImV4cCI6MTYxNTAyMTUxNX0.8u4KaRwmFEsecRBQHseRXFPZ_RfsdRUDAzVVfnwuDb8",
 *       "password": "newpassword",
 *     }
 *
 * @apiSuccess (200) {String}  message API message
 * @apiSuccess (200) {Boolean}  data If password reset is succeeded or not
 *
 * @apiSuccessExample {json} Success-Response:
 *  HTTP/1.1 200
 *  {
 *    "message": "Password reset successful",
 *    "data": true
 *  }
 *
 */
