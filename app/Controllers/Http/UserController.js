"use strict";

const User = use("App/Models/User");

class UserController {
  async index({ request }) {
    return await User.all();
  }

  async store({ request, response }) {
    const body = request.post();
    const user = await User.create(body);
    response.status(201).send(user);
  }

  async show({ params }) {
    return await User.findOrFail(params.id);
  }

  async update({ request, params }) {
    const body = request.post();
    delete body.password;
    delete body.created_at;
    delete body.updated_at;
    const user = await User.findOrFail(params.id);
    user.merge(body);
    await user.save();
    return user;
  }

  async destroy({ request, params }) {
    const user = await User.find(params.id);
    await user.delete();
  }

  async login({ request, auth }) {
    const { email, password } = request.post();
    const jwt = await auth.attempt(email, password, true);
    return jwt;
  }

  async register({ request, auth }) {
    const body = request.post();
    const user = await User.create(body);
    const { email, password } = body;
    const jwt = await auth.attempt(email, password, true);
    return jwt;
  }
}

module.exports = UserController;
