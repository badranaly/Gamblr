\c gamblr

INSERT INTO users (user_name, password, pic, bg) VALUES
  ('User_1', '123', 'abc', 'bca'),
  ('User_2', '124', 'efg', 'jhf'),
  ('User_3', '563', 'fdd', 'lko');


INSERT INTO posts (type, content, user_id) VALUES
  ('text', 'This is a post', '1'),
  ('audio', 'This is not an audio clip', '2');

INSERT INTO comments (comment, user_id, post_id) VALUES
  ('This is a comment', '2', '1'),
  ('This is a second comment', '3', '1'),
  ('Nice audio', '1', '2');

INSERT INTO likes (user_id, post_id) VALUES
  ('2', '1'),
  ('3', '2');

INSERT INTO followers (follower_id, following_id) VALUES
  ('2', '1'),
  ('1', '3');
