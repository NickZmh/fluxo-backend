import 'express';

declare module 'express' {
  interface Request {
    redirectTo?: string | null;
    user: {
      id: string;
      email: string;
    };
  }
}
