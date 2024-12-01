import prisma from "../../prismaClient.js";

const createReview = async ({ userId, propertyId, comment, rating }) => {
  return await prisma.review.create({
    data: {
      userId,
      propertyId,
      comment,
      rating,
    },
  });
};

export default createReview;
