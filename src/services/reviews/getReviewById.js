import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const getReviewById = async (id) => {
  return await prisma.review.findUnique({
    where: { id },
    select: {
      id: true,
      userId: true,
      propertyId: true,
      rating: true,
      comment: true,
    },
  });
};

export default getReviewById;
