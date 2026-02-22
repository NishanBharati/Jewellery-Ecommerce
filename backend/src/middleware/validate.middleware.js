const validate = (schema) => {
  return (req, res, next) => {

    const result = schema.validate(req.body)

    if (result.error) {
      return res.status(400).send(result.error.message)
    }

    next()
  }
}

export default validate