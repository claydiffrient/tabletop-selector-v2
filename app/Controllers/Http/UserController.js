"use strict";

class UserController {
  static get inject() {
    return ["App/Models/User"];
  }

  constructor(User) {
    this.User = User;
  }

  async index({ request }) {
    return await this.User.all();
  }

  async store({ request, response }) {
    const body = request.post();
    const user = await this.User.create(body);
    response.status(201).send(user);
  }

  async show({ params }) {
    return this.User.findOrFail(params.id);
  }

  async update({ request, params }) {
    const body = request.post();
    delete body.password;
    delete body.created_at;
    delete body.updated_at;
    const user = await this.User.findOrFail(params.id);
    user.merge(body);
    await user.save();
    return user;
  }

  async destroy({ request, params }) {
    const user = await this.User.find(params.id);
    await user.delete();
  }

  async login({ request, auth }) {
    const { email, password } = request.post();
    const jwt = await auth.attempt(email, password, true);
    return jwt;
  }

  async register({ request, auth }) {
    const body = request.post();
    await this.User.create(body);
    const { email, password } = body;
    const jwt = await auth.attempt(email, password, true);
    return jwt;
  }
}

module.exports = UserController;
