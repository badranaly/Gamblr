\c gamblr

INSERT INTO users (user_name, password, pic, bg, blog_name, blog_desc) VALUES
  ('User_1', '123', 'https://crunchbase-production-res.cloudinary.com/image/upload/c_lpad,h_256,w_256,f_auto,q_auto:eco/v1397187054/a828b608270067b84d6eaa4611f21a7b.jpg', 'bca', 'a', 'b'),
  ('User_2', '124', 'https://crunchbase-production-res.cloudinary.com/image/upload/c_lpad,h_256,w_256,f_auto,q_auto:eco/v1397187054/a828b608270067b84d6eaa4611f21a7b.jpg', 'jhf', 'a', 'b'),
  ('User_3', '563', 'https://crunchbase-production-res.cloudinary.com/image/upload/c_lpad,h_256,w_256,f_auto,q_auto:eco/v1397187054/a828b608270067b84d6eaa4611f21a7b.jpg', 'lko', 'a', 'b'),
  ('chris', '125', 'https://crunchbase-production-res.cloudinary.com/image/upload/c_lpad,h_256,w_256,f_auto,q_auto:eco/v1397187054/a828b608270067b84d6eaa4611f21a7b.jpg', 'lasd', 'a', 'b');


INSERT INTO posts (type, content, user_id, notes) VALUES
  ('text', 'This is a post', '1', '3'),
  ('audio', 'This is not an audio clip', '2', '2'),
  ('text', 'MY POST', '3', '0'),
  ('text', 'Another post??', '4', '1');

INSERT INTO comments (comment, user_id, post_id) VALUES
  ('This is a comment', '2', '1'),
  ('This is a second comment', '3', '1'),
  ('Nice audio', '1', '2'),
  ('Nice text', '1', '4');

INSERT INTO likes (user_id, post_id) VALUES
  ('2', '1'),
  ('3', '2'),
  ('1', '2'),
  ('1', '3');

INSERT INTO followers (follower_id, following_id) VALUES
  ('2', '1'),
  ('1', '3'),
  ('3', '1'),
  ('1', '2'),
  ('1', '4');
