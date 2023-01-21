const seeder = require('mongoose-seed');
const admin = require('../firebase-config');

const vars = require('../vars');
const users = require('./users');

const data = [
  {
    model: vars.models.User,
    documents: users,
  },
];
const seedData = [];
const seedDataToFirebase = async () => {
  console.log('Seeding data to Firebase...');
  for (const { model, documents } of data) {
    let modelData = { model, documents: [] };
    for (const document of documents) {
      const { email, password, firstName, lastName, role } = document;
      const newUser = await admin.auth().createUser({
        email,
        password,
      });

      await admin.auth().setCustomUserClaims(newUser.uid, {
        admin: role === vars.roles.admin,
        producer: role === vars.roles.producer,
        user: role === vars.roles.user,
      });
      modelData = {
        ...modelData,
        documents: [
          ...modelData.documents,
          {
            _id: newUser.uid,
            firstName,
            lastName,
            role,
          },
        ],
      };
    }
    seedData.push(modelData);
  }
  console.log('Seeding data to Firebase done!');
};
const seedDataToMongo = async () => {
  await seedDataToFirebase();
  console.log('Seeding data to MongoDB...');
  seeder.connect(vars.mongo.url, function () {
    seeder.loadModels(['models/user.js']);
    seeder.clearModels([vars.models.User], () => {
      seeder.populateModels(seedData, function () {
        seeder.disconnect();
      });
    });
  });
  console.log('Seeding data to MongoDB done!');
};
seedDataToMongo();
