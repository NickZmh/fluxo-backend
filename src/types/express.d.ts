import 'express';

declare module 'express' {
  interface Request {
    redirectTo?: string;
    user: {
      id: string;
      email: string;
    };
  }
}
