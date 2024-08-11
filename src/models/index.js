const Post = require("./Post");
const User = require("./User");

User.hasMany(Post)
Post.belongsTo(User)

User.belongsToMany(Post, {through: "favouritesPivot"})
Post.belongsToMany(User, {through: "favouritesPivot"})
