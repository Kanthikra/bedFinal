import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const deleteReviewById = async (id) => {
  return await prisma.review.delete({
    where: { id },
  });
};

export default deleteReviewById;
