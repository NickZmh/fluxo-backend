import { Prisma } from '@prisma/client';
import { clientPublicSelect } from '../selects/select.client';

export type ClientSelected = Prisma.ClientGetPayload<{
  select: typeof clientPublicSelect;
}>;

export const mapClient = (c: ClientSelected) => ({
  id: c.id,
  name: c.name,
  surname: c.surname,
  status: c.status,
  createdAt: c.createdAt,
  phone: c.phone,
  email: c.email,
  notes: c.notes,

  createdBy: c.user
    ? {
        firstName: c.user.firstName,
        lastName: c.user.lastName,
      }
    : null,

  products: c.products.map((p) => ({
    id: p.id,
    name: p.name,
  })),
});
