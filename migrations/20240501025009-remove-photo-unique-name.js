module.exports = {
  async up(db, client) {},

  async down(db, client) {
    //await db.collection("users").dropIndex({ name: 1 });
    await db.collection("users").createIndex(
      { name: 1 },
      {
        type: String,
        required: [true, "Please provide your name"],
      }
    );
    await db.collection("users").createIndex(
      { lastname: 1 },
      {
        type: String,
        required: [true, "Please provide your name"],
      }
    );
    await db.collection("users").dropIndex({ lastname: 1 });
  },
};
