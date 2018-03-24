\c gamblr

INSERT INTO users (user_name, password, pic, bg, blog_name, blog_desc) VALUES
  ('jace', '123', 'https://crunchbase-production-res.cloudinary.com/image/upload/c_lpad,h_256,w_256,f_auto,q_auto:eco/v1397187054/a828b608270067b84d6eaa4611f21a7b.jpg', 'bca', 'Ace Blog', 'Tennis and life'),
  ('taka', '123', 'https://crunchbase-production-res.cloudinary.com/image/upload/c_lpad,h_256,w_256,f_auto,q_auto:eco/v1397187054/a828b608270067b84d6eaa4611f21a7b.jpg', 'jhf', 'Take Pensamiento', 'Stepping through the array'),
  ('bell', '123', 'https://crunchbase-production-res.cloudinary.com/image/upload/c_lpad,h_256,w_256,f_auto,q_auto:eco/v1397187054/a828b608270067b84d6eaa4611f21a7b.jpg', 'lko', 'The Hog Pit', 'PBR? Yes please!'),
  ('aly', '123', 'https://crunchbase-production-res.cloudinary.com/image/upload/c_lpad,h_256,w_256,f_auto,q_auto:eco/v1397187054/a828b608270067b84d6eaa4611f21a7b.jpg', 'lko', 'Stuck on a bus', 'No, seriously...'),
  ('chris', '123', 'https://crunchbase-production-res.cloudinary.com/image/upload/c_lpad,h_256,w_256,f_auto,q_auto:eco/v1397187054/a828b608270067b84d6eaa4611f21a7b.jpg', 'lasd', 'Chris Blog', 'The house of disrespect');


INSERT INTO posts (type, content, user_id, notes) VALUES
  ('text', 'My name is Taka, and this is my first post!', '2', '2'),
  ('text', 'I <3 Ruby!', '3', '2'),
  ('text', 'It`s in a British Accent...', '1', '1'),
  ('text', 'Another post??', '2', '1'),
  ('text', 'español es lo mío', '2', '0'),
  ('text', 'And rails!', '3','0' );

INSERT INTO comments (comment, user_id, post_id) VALUES
  ('This is a comment', '2', '1'),
  ('This is a second comment', '3', '1'),
  ('Nice audio', '1', '2'),
  ('Nice text', '1', '4'),
  ('Delete me', '4', '4');

INSERT INTO likes (user_id, post_id) VALUES
  ('2', '1'),
  ('3', '2'),
  ('1', '2'),
  ('1', '1'),
  ('1', '4'),
  ('4', '3');

INSERT INTO followers (follower_id, following_id) VALUES
  ('2', '1'),
  ('1', '3'),
  ('3', '1'),
  ('4', '1'),
  ('1', '2'),
  ('1', '4');
