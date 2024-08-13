const Post = require("./Post");
const User = require("./User");

User.hasMany(Post)
Post.belongsTo(User)


