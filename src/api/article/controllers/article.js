'use strict';

/**
 *  article controller
 */

const { createCoreController } = require('@strapi/strapi').factories;

module.exports = createCoreController('api::article.article', ({ strapi }) => ({
  async findOne(ctx) {
    const { id: slug } = ctx.params;

    const entity = await strapi.entityService.findMany('api::article.article', {
      filters: { slug: slug },
      populate: {
        blocks: true,
        author: true,
        category: true,
        cover: true
      }
    });

    if (!entity || entity.length === 0) {
      return ctx.notFound('Article not found');
    }

    const sanitizedEntity = await this.sanitizeOutput(entity[0], ctx);

    return this.transformResponse(sanitizedEntity);
  }
}));
