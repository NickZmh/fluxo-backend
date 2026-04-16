export const productPublicFields = {
  id: true,
  name: true,
  description: true,
  price: true,
  sku: true,
  createdAt: true,
  imageUrl: true,

  clients: {
    select: {
      id: true,
      name: true,
      surname: true,
      status: true,
    },
  },
} as const;
