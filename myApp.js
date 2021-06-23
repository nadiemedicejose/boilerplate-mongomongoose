require('dotenv').config();

/**
 * TODO: Add mongodb and mongoose to the project’s package.json.
 * TODO: Require mongoose as mongoose in myApp.js.
 * TODO: Create a .env file and add a MONGO_URI variable to it. Its value should be your MongoDB Atlas database URI. Be sure to surround the URI with single or double quotes, and remember that you can't use spaces around the = in environment variables. For example, MONGO_URI='VALUE'.
 * TODO: Connect to the database using the following syntax:
 * mongoose.connect(<Your URI>, { useNewUrlParser: true, useUnifiedTopology: true });
 */
const mongoose = require('mongoose');
const MONGO_URI = process.env.MONGO_URI;
mongoose.connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });

/**
 * TODO: Create a person schema called personSchema having this prototype:
 * - Person Prototype -
 * --------------------
 * name : string [required]
 * age :  number
 * favoriteFoods : array of strings (*)
 * 
 * Use the Mongoose basic schema types. If you want you can also add more fields, use simple validators like required or unique, and set default values. See the Mongoose docs.
 * TODO: Create a model called Person from the personSchema.
 */
const Schema = mongoose.Schema;

const personSchema = new Schema({
  name: {type: String, required: true},
  age: Number,
  favoriteFoods: [String]
});

let Person = mongoose.model("Person", personSchema);

/**
 * TODO: Within the createAndSavePerson function, create a document instance using the Person model constructor you built before.
 * TODO: Pass to the constructor an object having the fields name, age, and favoriteFoods.
 * Their types must conform to the ones in the personSchema.
 * TODO: Call the method document.save() on the returned document instance.
 * TODO: Pass to it a callback using the Node convention.
 * This is a common pattern; all the following CRUD methods take a callback function like this as the last argument.
 * @param {*} done 
 */
const createAndSavePerson = (done) => {
  let person = new Person({
    name: 'Jose Estrada',
    age: 26,
    favoriteFoods: ['cereal', 'pasta']
  });

  person.save(function(err, data) {
    if (err) {
      return console.error(err);
    }
    done(null, data);
  });
};

/**
 * TODO: Modify the createManyPeople function to create many people using Model.create() with the argument arrayOfPeople.
 * Note: You can reuse the model you instantiated in the previous exercise.
 * @param {*} arrayOfPeople 
 * @param {*} done 
 */
const createManyPeople = (arrayOfPeople, done) => {
  Person.create(arrayOfPeople, function(err, data) {
    if (err) {
      return console.error(err);
    }
    done(null, data);
  });
};

/**
 * TODO: Modify the findPeopleByName function to find all the people having a given name, using Model.find() -> [Person]
 * Use the function argument personName as the search key.
 * @param {*} personName 
 * @param {*} done 
 */
const findPeopleByName = (personName, done) => {
  Person.find({name: personName}, function(err, data) {
    if (err) {
      return console.error(err);
    }
    done(null, data);
  });
};

/**
 * TODO: Modify the findOneByFood function to find just one person which has a certain food in the person's favorites, using Model.findOne() -> Person. Use the function argument food as search key.
 * @param {*} food 
 * @param {*} done 
 */
const findOneByFood = (food, done) => {
  Person.findOne({favoriteFoods: food}, function(err, data) {
    if (err) {
      return console.error(err);
    }
    done(null, data);
  });
};

/**
 * TODO: Modify the findPersonById to find the only person having a given _id, using Model.findById() -> Person. Use the function argument personId as the search key.
 * @param {*} personId 
 * @param {*} done 
 */
const findPersonById = (personId, done) => {
  Person.findById({_id: personId}, function(err, data) {
    if (err) {
      return console.error(err);
    }
    done(null, data);
  });
};

/**
 * TODO: Modify the findEditThenSave function to find a person by _id (use any of the above methods).
 * TODO: Add "hamburger" to the list of the person's favoriteFoods (you can use Array.push()).
 * TODO: Then - inside the find callback - save() the updated Person.
 * Note: This may be tricky, if in your Schema, you declared favoriteFoods as an Array, without specifying the type (i.e. [String]). In that case, favoriteFoods defaults to Mixed type, and you have to manually mark it as edited using document.markModified('edited-field'). See Mongoose documentation
 * @param {*} personId search key
 * @param {*} done callback
 */
const findEditThenSave = (personId, done) => {
  const foodToAdd = "hamburger";

  Person.findById({_id: personId}, (err, person) => {
    if(err) {
      return console.error(err);
    }

    person.favoriteFoods.push(foodToAdd);

    person.save((err, updatedPerson) => {
      if(err) {
        return console.error(err);
      }
      done(null, updatedPerson);
    });
  });
};

/**
 * TODO: Modify the findAndUpdate function to find a person by Name and set the person's age to 20.
 * Note: You should return the updated document. To do that, you need to pass the options document { new: true } as the 3rd argument to findOneAndUpdate(). By default, these methods return the unmodified object.
 * @param {*} personName search key
 * @param {*} done callback
 */
const findAndUpdate = (personName, done) => {
  const ageToSet = 20;

  Person.findOneAndUpdate({name: personName}, {age: ageToSet}, {new: true}, (err, updatedPerson) => {
    if (err) {
      return console.error(err);
    }
    done(null, updatedPerson);
  });
};

const removeById = (personId, done) => {
  done(null /*, data*/);
};

const removeManyPeople = (done) => {
  const nameToRemove = "Mary";

  done(null /*, data*/);
};

const queryChain = (done) => {
  const foodToSearch = "burrito";

  done(null /*, data*/);
};

/** **Well Done !!**
/* You completed these challenges, let's go celebrate !
 */

//----- **DO NOT EDIT BELOW THIS LINE** ----------------------------------

exports.PersonModel = Person;
exports.createAndSavePerson = createAndSavePerson;
exports.findPeopleByName = findPeopleByName;
exports.findOneByFood = findOneByFood;
exports.findPersonById = findPersonById;
exports.findEditThenSave = findEditThenSave;
exports.findAndUpdate = findAndUpdate;
exports.createManyPeople = createManyPeople;
exports.removeById = removeById;
exports.removeManyPeople = removeManyPeople;
exports.queryChain = queryChain;
