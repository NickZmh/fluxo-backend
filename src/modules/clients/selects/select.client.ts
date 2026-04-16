export const clientPublicSelect = {
  id: true,
  name: true,
  surname: true,
  status: true,
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
