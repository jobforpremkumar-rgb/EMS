export const validate = (schema) => (req, res, next) => {

  const {jd} = req.body
  console.log(typeof(jd.salary));
    
  const result = schema.safeParse(req.body);
  
 if (!result.success) {
    return res.status(400).json({
      error: "Validation failed",
      details: result.error.flatten().fieldErrors,
    });
  }
  req.body = result.data;
  next();
};