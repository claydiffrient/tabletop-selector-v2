"use strict";

/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| Http routes are entry points to your web application. You can create
| routes for different URLs and bind Controller actions to them.
|
| A complete guide on routing is available here.
| http://adonisjs.com/guides/routing
|
*/

const Route = use("Route");
const Helpers = use("Helpers");

Route.resource("users", "UserController")
  .middleware(["auth"])
  .apiOnly();
Route.post("users/login", "UserController.login");
Route.post("users/register", "UserController.register");

Route.any("*", ({ response }) => {
  response.download(Helpers.publicPath("index.html"));
});
