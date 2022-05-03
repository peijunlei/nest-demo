export default function logger(req: Request, res: Response, next) {
  console.log(`Request===>`, req.method.toLocaleUpperCase(), req.url);
  next();
};