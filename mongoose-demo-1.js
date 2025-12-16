const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/test', {
  useNewUrlParser: true, 
  useUnifiedTopology: true
});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  // we're connected!
});
const fruitSchema = new mongoose.Schema({
  name: String,
});

const Fruit = mongoose.model('Fruit', fruitSchema);

const apple = new Fruit({ name: 'Apple' });
console.log(apple.name); // 'Apple'
apple.save;

const Cat = mongoose.model('Cat', { name: String });
const kitty = new Cat({ name: 'Zildjian' });
kitty.save().then(() => console.log('meow'));

const blogSchema = new mongoose.Schema({
  title: String,
  author: String,
  body: String,
  comments: [{ body: String, date: Date }],
  date: { type: Date, default: Date.now },
  hidden: Boolean,
  meta: {
    votes: Number,
    favs: Number,
  },    
});

const Blog = mongoose.model('Blog', blogSchema);

// Simple blog post (no comments)
const blog1 = new Blog({
  title: 'Introduction to MongoDB',
  author: 'Chloe Zeng',
  body: 'MongoDB is a NoSQL database that stores data in flexible, JSON-like documents.',
  hidden: false,
  meta: { votes: 10, favs: 3 },
});

blog1.save();

// Blog post with comments
const blog2 = new Blog({
  title: 'Understanding Mongoose Schemas',
  author: 'Chloe Zeng',
  body: 'Schemas define the structure of your documents in Mongose.',
  comments: [
    { body: 'Very helpful explanation!', date: new Date() },
    { body: 'Can you add more examples?', date: new Date() },
  ],
  hidden: false,
  meta: { votes: 25, favs: 10 }, 
});

blog2.save(); 

// Hidden blog post
const blog3 = new Blog({
  title: 'Draft: Advanced MongoDB Internals',
  author: 'Chloe Zeng',
  body: 'This post is not yet ready for public viewing.',
  hidden: true,
  meta: { votes: 0, favs: 0 },
});

blog3.save();

// Blog post relying on default date
const blog4 = new Blog({
  title: 'Why ODMs Matter',
  author: 'Bob Smith',
  body: 'ODMs help enforce structure in schema-less databases. ',
  hidden: false,
  meta: { votes: 7, favs: 2 },
});

blog4.save();
