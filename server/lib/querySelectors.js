const { CarBrand, CarModel, Category, Sequelize } = require('../database');
const Op = Sequelize.Op;

function getListQuery({ limit, offset = 0 } = {}) {
    const query = {
        offset,
        where: {},
        order: [['createdAt', 'ASC'],]
    };

    if (+limit) {
        query.limit = limit;
    }

    return query;
}

function getProductAssociations() {
    return [
        {
            model: Category,
            as: 'category',
        },
        {
            model: CarBrand,
            as: 'carBrand',
        },
        {
            model: CarModel,
            as: 'carModel',
        }
    ];
}

function getProductsPageQuery(requestQuery = {}) {
    requestQuery.limit = 12;
    requestQuery.offset = requestQuery.offset || 0;

    const productsQuery = {
        where: {},
        limit: requestQuery.limit,
        offset: requestQuery.offset,
        include: getProductAssociations(),
        raw: true,
        order: [['createdAt', 'DESC']]
    };

    if (requestQuery.category) {
        productsQuery.where.categoryId = { [Op.eq]: requestQuery.category, };
    }

    if (requestQuery.car_brand) {
        productsQuery.where.carBrandId = { [Op.eq]: requestQuery.car_brand, };
    } else if (requestQuery.car_model) {
        productsQuery.where.carModelId = { [Op.eq]: requestQuery.car_model, };
    }

    return productsQuery;
}

module.exports = {
    getListQuery,
    getProductsPageQuery,
    getProductAssociations,
};