import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const updateReviewById = async (id, reviewData) => {
  return await prisma.review.update({
    where: { id },
    data: reviewData,
  });
};

export default updateReviewById;
