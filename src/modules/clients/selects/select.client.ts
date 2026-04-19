export const clientPublicSelect = {
  id: true,
  name: true,
  surname: true,
  status: true,
  phone: true,
  email: true,
  notes: true,
  createdAt: true,

  user: {
    select: {
      firstName: true,
      lastName: true,
    },
  },

  products: {
    select: {
      id: true,
      name: true,
    },
  },
} as const;
