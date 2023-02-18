const Joi = require('joi');

const AuthorSchema = Joi.object({
    firstname: Joi.string()
            .min(2)
            .max(255)
            .trim()
            .required(),
    lastname: Joi.string()
            .min(2)
            .max(255)
            .required()
            .trim(),
    DOB: Joi.date()
            .greater('1-1-1900')
            .required()
            .max('1-1-2024'),
    country: Joi.string()
            .optional()
            .trim(),
    books: Joi.array()
            .items(Joi.string())
            .optional(),
    createAt : Joi.date()
            .default(Date.now),
    lastUpdateAt : Joi.date()
            .default(Date.now)

})

const updateAuthorSchema = Joi.object({
    firstname: Joi.string()
            .min(5)
            .max(255)
            .trim(),
    lastname: Joi.string()
            .min(5)
            .max(255)
            .trim(),
    DOB: Joi.date()
            .min(1900)
            .max(2023),
    country: Joi.string()
            .trim(),
    books: Joi.array()
            .items(Joi.string())
            .optional()
    })

async function addAuthorValidatorMiddleware(req, res, next) {
    const authorpayload = req.body

    try {
        await AuthorSchema.validateAsync(authorpayload)
        next()
    } catch (error) {
        next({
                message: error.details[0].message,
                status : 400
        })
    }
}

async function updateAuthorValidatorMiddleware(req, res, next) {
        const authorpayload = req.body
    
        try {
            await updateAuthorSchema.validateAsync(authorpayload)
            next()
        } catch (error) {
            next({
                    message: error.details[0].message,
                    status : 400
            })
        }
    }

module.exports = {addAuthorValidatorMiddleware, updateAuthorValidatorMiddleware}