import Post from "./Post.js";
import Image from "./Image.js";
import User from './User.js'
import Comment from "./Comment.js";
import Vote from "./Vote.js"


User.hasMany(Post,{
  foreignKey:'user_id',
  sourceKey:'id_user'
})
User.hasMany(Image,{
  foreignKey:'user_id',
  sourceKey:'id_user'
})
User.hasMany(Comment,{
  foreignKey:'user_id',
  sourceKey:'id_user'
})
User.hasMany(Vote,{
  foreignKey:'user_id',
  sourceKey:'id_user'
})


Post.belongsTo(User,{
  foreignKey:'user_id',
  targetKey:'id_user'
})
Post.hasMany(Image, {
  foreignKey: 'post_id',
  sourceKey: 'id_post'
});
Post.hasMany(Comment,{
  foreignKey: 'post_id',
  sourceKey: 'id_post'
})
Post.hasMany(Vote,{
  foreignKey: 'post_id',
  sourceKey: 'id_post'
})


Image.belongsTo(Post, {
  foreignKey: 'post_id',
  targetKey: 'id_post'
});
Image.belongsTo(User,{
  foreignKey:'user_id',
  targetKey: 'id_user'
})
Image.belongsTo(Comment,{
  foreignKey:'comment_id',
  targetKey: 'id_comment'
})


Comment.belongsTo(Post,{
  foreignKey: 'post_id',
  targetKey: 'id_post'
})
Comment.belongsTo(User,{
  foreignKey:'user_id',
  targetKey: 'id_user'
})
Comment.hasMany(Image,{
  foreignKey:'comment_id',
  sourceKey: 'id_comment'
})
Comment.hasMany(Vote,{
  foreignKey:'comment_id',
  sourceKey: 'id_comment'
})
Comment.hasMany(Comment,{
  foreignKey:'comment_parent',
  sourceKey: 'id_comment'
})
Comment.belongsTo(Comment,{
  foreignKey:"comment_parent",
  sourceKey:"id_comment"
})

Vote.belongsTo(Comment,{
  foreignKey: 'comment_id',
  targetKey: 'id_comment'
})
Vote.belongsTo(User,{
  foreignKey:"user_id",
  targetKey:"id_user"
})
Vote.belongsTo(Post,{
  foreignKey:"post_id",
  targetKey:"id_post"
})