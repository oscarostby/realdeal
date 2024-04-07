import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styled from 'styled-components';

const PostBoxContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
`;

const PostBox = styled.div`
  border: 2px solid black;
  border-radius: 5px;
  margin: 10px;
  padding: 10px;
  width: 300px;
`;

const PostTitle = styled.h3`
  font-weight: bold;
`;

const PostContent = styled.p``;

const PostAuthor = styled.p`
  font-size: 12px;
`;

const DeleteButton = styled.button`
  background-color: red;
  color: white;
  border: none;
  border-radius: 3px;
  padding: 5px;
  cursor: pointer;
  margin-top: 10px;

  &:hover {
    background-color: darkred;
  }
`;

const UserBox = styled.div`
  border: 2px solid black;
  border-radius: 5px;
  margin: 10px;
  padding: 10px;
  width: 200px;
`;

const UserName = styled.h4`
  font-weight: bold;
`;

const DeleteUserButton = styled.button`
  background-color: red;
  color: white;
  border: none;
  border-radius: 3px;
  padding: 5px;
  cursor: pointer;
  margin-top: 10px;

  &:hover {
    background-color: darkred;
  }
`;

const App = () => {
  const [posts, setPosts] = useState([]);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const postResponse = await axios.get('http://localhost:5000/posts');
        setPosts(postResponse.data);

        const userResponse = await axios.get('http://localhost:5000/users');
        setUsers(userResponse.data);
      } catch (error) {
        console.error('Failed to fetch data:', error.response.data);
      }
    };

    fetchData();
  }, []);

  const handleDeletePost = async (postId) => {
    try {
      await axios.delete(`http://localhost:5000/posts/${postId}`);
      setPosts(posts.filter((post) => post._id !== postId));
    } catch (error) {
      console.error('Failed to delete post:', error.response.data);
    }
  };

  const handleDeleteUser = async (userId) => {
    try {
      await axios.delete(`http://localhost:5000/users/${userId}`);
      setUsers(users.filter((user) => user._id !== userId));
    } catch (error) {
      console.error('Failed to delete user:', error.response.data);
    }
  };

  return (
    <div>
      <h3>Posts:</h3>
      <PostBoxContainer>
        {posts.map((post, index) => (
          <PostBox key={index}>
            <PostTitle>{post.title}</PostTitle>
            <PostContent>{post.content}</PostContent>
            <PostAuthor>Author: {post.author}</PostAuthor>
            <DeleteButton onClick={() => handleDeletePost(post._id)}>
              Delete
            </DeleteButton>
          </PostBox>
        ))}
      </PostBoxContainer>

      <h3>Users:</h3>
      <PostBoxContainer>
        {users.map((user, index) => (
          <UserBox key={index}>
            <UserName>{user.username}</UserName>
            <DeleteUserButton onClick={() => handleDeleteUser(user._id)}>
              Delete
            </DeleteUserButton>
          </UserBox>
        ))}
      </PostBoxContainer>
    </div>
  );
};

export default App;