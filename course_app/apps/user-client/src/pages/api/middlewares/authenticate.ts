import {Request , Response , NextFunction } from 'express';
import jwt from 'jsonwebtoken'
const SECRET = "#S3CR3T#";


export const AuthenticateJwt = (req : Request , res : Response , next : NextFunction) =>
{   
    const authHeader = req.headers.authorization;
  if (authHeader) {
    const token = authHeader.split(' ')[1];
    jwt.verify(token, SECRET, (err, user) => {
      if (err) {
        return res.status(403).send("Error occured while jwt verification");
      }
      if (user !== undefined && typeof user === "object") {
        req.headers['user'] = user.username;
      }else
      {
        return res.status(403).send({message : "User authentication failed"});
      }
      
      next();
    });
  } else {
    return res.status(401).send({message : "User authentication failed"});
  }
}
