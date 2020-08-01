/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| This file is dedicated for defining HTTP routes. A single file is enough
| for majority of projects, however you can define routes in different
| files and just make sure to import them inside this file. For example
|
| Define routes in following two files
| ├── start/routes/cart.ts
| ├── start/routes/customer.ts
|
| and then import them inside `start/routes/index.ts` as follows
|
| import './cart'
| import './customer'
|
*/

import Route from '@ioc:Adonis/Core/Route'

// Session
Route.post('/session', 'AuthController.login')

// Users
Route.post('/users', 'UsersController.store')
Route.put('/users', 'UsersController.update').middleware('auth')
Route.delete('/users', 'UsersController.destroy').middleware('auth')

// Families
Route.post('/families', 'FamiliesController.store').middleware('auth')
Route.get('/families/:id', 'FamiliesController.show').middleware('auth')
Route.put('/families/:id', 'FamiliesController.update').middleware('auth')
