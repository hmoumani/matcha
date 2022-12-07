export default async (server) => {
  try {
    await server.close();
    process.exit();
  } catch (error) {
    process.exit(1);
  }
};
