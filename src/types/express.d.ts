declare module 'express-serve-static-core' {
  namespace Express {
    interface User {
      id: string;
      email: string;
    }

    interface Request {
      user: User;
    }
  }
}

export {};
