const Joi = require('joi');

const BookSchema = Joi.object({
    title: Joi.string()
            .min(5)
            .max(255)
            .trim()
            .required(),
    shortDescription: Joi.string()
            .min(5)
            .max(500)
            .optional()
            .trim(),
    longDescription: Joi.string()
            .min(10)
            .optional()
            .trim(),
    year: Joi.number()
            .integer()
            .required()
            .max(2023),
    isbn: Joi.string()
                .min(10)
                .max(13)
                .required(),
    price : Joi.number()
            .min(0)
            .required(),
    createAt : Joi.date()
            .default(Date.now),
    lastUpdateAt : Joi.date()
            .default(Date.now)
})

const updateBookSchema = Joi.object({
        title: Joi.string()
                .min(5)
                .max(255)
                .trim()
                .optional(),
        shortDescription: Joi.string()
                .min(5)
                .max(500)
                .optional()
                .trim(),
        longDescription: Joi.string()
                .min(10)
                .optional()
                .trim(),
        year: Joi.number()
                .integer()
                .optional()
                .max(2023),
        isbn: Joi.string()
                    .min(10)
                    .max(13)
                    .optional(),
        price : Joi.number()
                .min(0)
                .optional()
    })

async function addBookValidatorMiddleware(req, res, next) {
    const bookpayload = req.body

    try {
        await BookSchema.validateAsync(bookpayload)
        next()
    } catch (error) {
        next({
                message: error.details[0].message,
                status : 400
        })
    }
}

async function updateBookValidatorMiddleware(req, res, next) {
        const bookpayload = req.body
    
        try {
            await updateBookSchema.validateAsync(bookpayload)
            next()
        } catch (error) {
            next({
                    message: error.details[0].message,
                    status : 400
            })
        }
    }

module.exports = {addBookValidatorMiddleware, updateBookValidatorMiddleware}