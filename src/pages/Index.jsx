import { useState, useEffect } from "react";
import { Container, VStack, Button, Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody, FormControl, FormLabel, Input, useDisclosure, Text, Box, IconButton, Flex, Heading, Textarea, Stack, useToast } from "@chakra-ui/react";
import { FaRocket, FaTrash, FaSmile } from "react-icons/fa";

const Index = () => {
  const [posts, setPosts] = useState([]);
  const [user, setUser] = useState(null);
  const [newPost, setNewPost] = useState({ title: "", body: "" });
  const { isOpen, onOpen, onClose } = useDisclosure();
  const toast = useToast();

  useEffect(() => {
    // This would be replaced with an API call to fetch posts
    setPosts([
      { id: 1, title: "First Post", body: "This is the first post", date: new Date(), author: "User1", reactions: { "👍": 1 } },
      { id: 2, title: "Second Post", body: "This is the second post", date: new Date(), author: "User2", reactions: {} },
    ]);
  }, []);

  const handleLogin = (username) => {
    setUser(username);
    onClose();
    toast({
      title: "Logged in successfully.",
      description: `Welcome ${username}!`,
      status: "success",
      duration: 2000,
      isClosable: true,
    });
  };

  const handleLogout = () => {
    setUser(null);
    toast({
      title: "Logged out successfully.",
      status: "info",
      duration: 2000,
      isClosable: true,
    });
  };

  const handlePost = () => {
    if (!user) {
      onOpen();
      return;
    }
    const newId = posts.length + 1;
    const date = new Date();
    setPosts([...posts, { ...newPost, id: newId, date, author: user, reactions: {} }]);
    setNewPost({ title: "", body: "" });
  };

  const handleDeletePost = (postId) => {
    setPosts(posts.filter((post) => post.id !== postId));
  };

  const handleReaction = (postId, emoji) => {
    if (!user) {
      onOpen();
      return;
    }
    setPosts(
      posts.map((post) => {
        if (post.id === postId) {
          const newReactions = { ...post.reactions };
          newReactions[emoji] = (newReactions[emoji] || 0) + 1;
          return { ...post, reactions: newReactions };
        }
        return post;
      }),
    );
  };

  return (
    <Container maxW="container.md">
      <VStack spacing={4} align="stretch">
        <Flex justifyContent="space-between" alignItems="center">
          <Heading size="md">Public Post Board</Heading>
          <Button onClick={user ? handleLogout : onOpen}>{user ? "Logout" : "Login"}</Button>
        </Flex>
        <Box p={4} borderWidth="1px" borderRadius="lg">
          <FormControl>
            <FormLabel>Title</FormLabel>
            <Input value={newPost.title} onChange={(e) => setNewPost({ ...newPost, title: e.target.value })} />
          </FormControl>
          <FormControl mt={4}>
            <FormLabel>Body</FormLabel>
            <Textarea value={newPost.body} onChange={(e) => setNewPost({ ...newPost, body: e.target.value })} />
          </FormControl>
          <Button mt={4} leftIcon={<FaRocket />} colorScheme="teal" onClick={handlePost}>
            Post
          </Button>
        </Box>
        {posts.map((post) => (
          <Box key={post.id} p={4} borderWidth="1px" borderRadius="lg">
            <Flex justifyContent="space-between" alignItems="center">
              <Text fontWeight="bold">{post.title}</Text>
              {user === post.author && <IconButton aria-label="Delete post" icon={<FaTrash />} onClick={() => handleDeletePost(post.id)} />}
            </Flex>
            <Text mt={2}>{post.body}</Text>
            <Stack direction="row" mt={2}>
              <IconButton aria-label="React with smile" icon={<FaSmile />} onClick={() => handleReaction(post.id, "👍")} />
              <Text>{post.reactions["👍"] || 0}</Text>
            </Stack>
          </Box>
        ))}
      </VStack>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Login</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <FormControl>
              <FormLabel>Username</FormLabel>
              <Input placeholder="Enter username" onKeyDown={(e) => e.key === "Enter" && handleLogin(e.target.value)} />
            </FormControl>
          </ModalBody>
        </ModalContent>
      </Modal>
    </Container>
  );
};

export default Index;
