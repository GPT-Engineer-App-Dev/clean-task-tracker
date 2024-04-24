// Complete the Index page component here
// Use chakra-ui
import React from 'react';
import { Box, VStack, HStack, Input, IconButton, Text, useToast } from '@chakra-ui/react';
import { FaPlus, FaTrash, FaCheck } from 'react-icons/fa';  // FaPlus is already correctly imported

const Index = () => {
  const [todos, setTodos] = React.useState([]);
  const [input, setInput] = React.useState('');
  const toast = useToast();

  const handleAddTodo = () => {
    if (input === '') {
      toast({
        title: 'No input',
        description: "You need to write something to add a todo.",
        status: 'error',
        duration: 2000,
        isClosable: true,
      });
      return;
    }
    const newTodo = { id: Date.now(), text: input, isCompleted: false };
    setTodos([...todos, newTodo]);
    setInput('');
  };

  const handleDeleteTodo = (id) => {
    const filteredTodos = todos.filter(todo => todo.id !== id);
    setTodos(filteredTodos);
  };

  const handleCompleteTodo = (id) => {
    const updatedTodos = todos.map(todo => {
      if (todo.id === id) {
        return { ...todo, isCompleted: !todo.isCompleted };
      }
      return todo;
    });
    setTodos(updatedTodos);
  };

  return (
    <Box p={5}>
      <VStack spacing={4}>
        <HStack>
          <Input
            placeholder="Add a new task"
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />
          <IconButton
            icon={<FaPlus />}
            onClick={handleAddTodo}
            colorScheme="blue"
            aria-label="Add todo"
          />
        </HStack>
        {todos.map((todo) => (
          <HStack key={todo.id}>
            <Text as={todo.isCompleted ? 's' : undefined}>{todo.text}</Text>
            <IconButton
              icon={<FaCheck />}
              onClick={() => handleCompleteTodo(todo.id)}
              colorScheme="green"
              aria-label="Complete todo"
            />
            <IconButton
              icon={<FaTrash />}
              onClick={() => handleDeleteTodo(todo.id)}
              colorScheme="red"
              aria-label="Delete todo"
            />
          </HStack>
        ))}
      </VStack>
    </Box>
  );
};

export default Index;