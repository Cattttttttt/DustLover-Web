const Joi = require('joi')
const Koa = require('koa')
const { answer: AnswerModel,
        question: QuestionModel } = require('../models').models
const { PREVIEW_LENGTH } = require('../config')

class AnswerController {

  /**
   * 
   * @param {number} id 
   */
  static async findAnswerById(id) {

    if(id) {
      const data = await AnswerModel.findOne({ where: { id } })
      return data
    }
    return false
  }

  /**
   * 
   * @param {Koa.Context} ctx 
   */
  static async createAnswer(ctx) {

    const checkRule = Joi.object({
      content: Joi.string().required(),
      questionId: Joi.number().required()
    })
    const validator = checkRule.validate(ctx.request.body)

    if(validator) {

      const { content, questionId } = ctx.request.body
      await AnswerModel.create({ content, questionId })

      ctx.status = 204

    } else {
      ctx.throw(400)
    }

  }

  /**
   * 
   * @param {Koa.Context} ctx 
   */
  static async deleteAnswer(ctx) {

    const checkRule = Joi.object({
      id: Joi.number().required()
    })
    const validator = checkRule.validate(ctx.params)
    
    if(validator) {

      const { id } = ctx.params

      await AnswerModel.destroy({ where: { id } })

      ctx.status = 204

    } else {
      ctx.throw(400)
    }

  }

  /**
   * 
   * @param {Koa.Context} ctx 
   */
  static async updateAnswer(ctx) {

    const checkRule = Joi.object({
      id: Joi.number().required(),
      content: Joi.string().required()
    })
    const validator = checkRule.validate({
      id: ctx.params.id,
      ...ctx.request.body
    })

    if(validator) {

      const id = ctx.params.id
      const { content } = ctx.request.body

      await AnswerModel.update({ content }, { where: { id } })

      ctx.status = 204

    } else {
      ctx.throw(400)
    }

  }

  /**
   * 
   * @param {Koa.Context} ctx 
   */
  static async getAnswerList(ctx) {

    const checkRule = Joi.object({
      page: Joi.number(),
      pageSize: Joi.number(),
      preview: Joi.number()
    })
    const validator = checkRule.validate(ctx.query)

    if(validator) {

      const { page = 1, pageSize = 10, preview = 1 } = ctx.query
      const data = await AnswerModel.findAndCountAll({
        attributes: ['id', 'content', 'createdAt'],
        includes: [
          {
            model: QuestionModel,
            attributes: ['id', 'content', 'createdAt'],
            as: 'question'
          }
        ],
        offset: pageSize * (page - 1),
        limit: pageSize,
        order: [['createdAt', 'DESC']],
        row: true,
        distinct: true
      })

      if(preview) {
        data.rows.forEach(answer => {
          answer.content = answer.content.slice(0, PREVIEW_LENGTH.ANSWER)
          if(answer.question) answer.question.content = answer.question.content.slice(0, PREVIEW_LENGTH.QUESTION)
        })
      }

      ctx.body = data

    } else {
      ctx.throw(400)
    }
  }

}

module.exports = AnswerController