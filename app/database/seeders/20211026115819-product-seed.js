'use strict';
const { Product } = require('../../models/index');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return Promise.all([
      Product.create({
        name: "hamburguesa",
        price: 250,
        product_code: "HJK5699",
        product_quantity: "20",
        product_family: 1,
        active_notification:false,
        createdAt: new Date(),
        updatedAt: new Date(),
      },{
          include:{
            association: "family",
        }}),

      Product.create({
        name: "helado",
        price: 250,
        product_code: "HJK5698",
        product_quantity: "20",
        product_family: 1,
        active_notification:false,
        createdAt: new Date(),
        updatedAt: new Date(),
      },{
        include:{
          association: "family",
      }}),

      Product.create({
        name: "pizza",
        price: 250,
        product_code: "HJK5697",
        product_quantity: "20",
        product_family: 1,
        active_notification:false,
        createdAt: new Date(),
        updatedAt: new Date(),
      },{
        include:{
          association: "family",
      }}),

      Product.create({
        name: "vino",
        price: 250,
        product_code: "HJK5696",
        product_quantity: "20",
        product_family: 2,
        active_notification:false,
        createdAt: new Date(),
        updatedAt: new Date(),
      },{
        include:{
          association: "family",
      }}),

      Product.create({
        name: "ron",
        price: 250,
        product_code: "HJK5695",
        product_quantity: "20",
        product_family: 2,
        active_notification:false,
        createdAt: new Date(),
        updatedAt: new Date(),
      },{
        include:{
          association: "family",
      }}),

      Product.create({
        name: "cerveza",
        price: 250,
        product_code: "HJK5694",
        product_quantity: "20",
        product_family: 2,
        active_notification:false,
        createdAt: new Date(),
        updatedAt: new Date(),
      },{
        include:{
          association: "family",
      }}),

      Product.create({
        name: "camisa",
        price: 250,
        product_code: "HJK5693",
        product_quantity: "20",
        product_family: 3,
        active_notification:false,
        createdAt: new Date(),
        updatedAt: new Date(),
      },{
        include:{
          association: "family",
      }}),

      Product.create({
        name: "pantalon",
        price: 250,
        product_code: "HJK5692",
        product_quantity: "20",
        product_family: 3,
        active_notification:false,
        createdAt: new Date(),
        updatedAt: new Date(),
      },{
        include:{
          association: "family",
      }}),

      Product.create({
        name: "sweeter",
        price: 250,
        product_code: "HJK5691",
        product_quantity: "20",
        product_family: 3,
        active_notification:false,
        createdAt: new Date(),
        updatedAt: new Date(),
      },{
        include:{
          association: "family",
      }}),
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('products', null, {});
  }
};
