import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import styled from 'styled-components';

const PostBoxContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const PostBox = styled.div`
  border: 2px solid black;
  border-radius: 5px;
  margin-bottom: 20px;
  padding: 10px;
  height: 400px;
  width: 70%;
  max-width: 1000px;
`;

const PostHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 20px;
`;

const PostTitle = styled.h3`
  font-weight: bold;
  margin: 0;
  font-size: 24px;
`;

const PostContent = styled.p`
  margin-top: 20px;
  font-size: 18px;
`;

const PostAuthor = styled.p`
  text-align: right;
  font-size: 12px;
`;

const DeleteButton = styled.button`
  background-color: red;
  color: white;
  border: none;
  padding: 5px 10px;
  border-radius: 3px;
  cursor: pointer;
`;

const Profile = () => {
  const [posts, setPosts] = useState([]);
  const navigate = useNavigate();
  const { username: profileUsername } = useParams();
  const loggedInUser = localStorage.getItem('user');

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await axios.get(`http://10.12.11.194:5000/posts/${profileUsername}`);
        setPosts(response.data);
      } catch (error) {
        console.error('Failed to fetch posts:', error.message);
      }
    };

    fetchPosts();
  }, [profileUsername]);

  useEffect(() => {
    if (!loggedInUser) {
      navigate('/');
    }
  }, [loggedInUser, navigate]);

  const handleDeletePost = async (postId) => {
    try {
      await axios.delete(`http://10.12.11.194:5000/posts/${postId}`, {
        data: { username: loggedInUser }
      });
      setPosts(posts.filter(post => post._id !== postId));
    } catch (error) {
      console.error('Failed to delete post:', error.message);
    }
  };

  console.log('Logged in user:', loggedInUser);

  return (
    <div>
      <h1>{profileUsername}'s Posts</h1>
      <PostBoxContainer>
        {posts.map((post, index) => (
          <PostBox key={index}>
            <PostHeader>
              <div>
                <PostTitle>{post.title}</PostTitle>
                <PostContent>{post.content}</PostContent>
              </div>
              <PostAuthor>Author: {post.author}</PostAuthor>
            </PostHeader>
            {loggedInUser === profileUsername && (
              <DeleteButton onClick={() => handleDeletePost(post._id)}>Delete</DeleteButton>
            )}
          </PostBox>
        ))}
      </PostBoxContainer>
    </div>
  );
};

export default Profile;
