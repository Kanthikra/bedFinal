import { PrismaClient } from "@prisma/client";
import usersData from "../src/data/users.json" assert { type: "json" };
import hostsData from "../src/data/hosts.json" assert { type: "json" };
import propertiesData from "../src/data/properties.json" assert { type: "json" };
import amenitiesData from "../src/data/amenities.json" assert { type: "json" };
import bookingsData from "../src/data/bookings.json" assert { type: "json" };
import reviewsData from "../src/data/reviews.json" assert { type: "json" };

const prisma = new PrismaClient({ log: ["query", "info", "warn", "error"] });

async function main() {
  // Seed Users
  for (const user of usersData.users) {
    await prisma.user.upsert({
      where: { id: user.id },
      update: user,
      create: user,
    });
    console.log(`Upserted user with ID: ${user.id}`);
  }

  // Seed Hosts
  for (const host of hostsData.hosts) {
    await prisma.host.upsert({
      where: { id: host.id },
      update: host,
      create: host,
    });
    console.log(`Upserted host with ID: ${host.id}`);
  }

  // Seed Properties
  for (const property of propertiesData.properties) {
    await prisma.property.upsert({
      where: { id: property.id },
      update: property,
      create: property,
    });
    console.log(`Upserted property with ID: ${property.id}`);
  }

  // Seed Amenities
  for (const amenity of amenitiesData.amenities) {
    await prisma.amenity.upsert({
      where: { id: amenity.id },
      update: amenity,
      create: amenity,
    });
    console.log(`Upserted amenity with ID: ${amenity.id}`);
  }

  // Seed Bookings
  for (const booking of bookingsData.bookings) {
    await prisma.booking.upsert({
      where: { id: booking.id },
      update: booking,
      create: booking,
    });
    console.log(`Upserted booking with ID: ${booking.id}`);
  }

  // Seed Reviews
  for (const review of reviewsData.reviews) {
    await prisma.review.upsert({
      where: { id: review.id },
      update: review,
      create: review,
    });
    console.log(`Upserted review with ID: ${review.id}`);
  }

  console.log("Seeding completed successfully.");
}

main()
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
