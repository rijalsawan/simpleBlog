import React, { useEffect } from "react";
import { useState } from "react";
import {
  Table,
  Thead,
  Tbody,
  TableContainer,
  Tr,
  Th,
  Td,
  UnorderedList,
  ListItem,
} from "@chakra-ui/react";
import { Button, useDisclosure } from "@chakra-ui/react";
import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
} from "@chakra-ui/react";

const Allblogs = () => {
  const [loading, setLoading] = useState(true);
    const { isOpen, onOpen, onClose } = useDisclosure()
  const cancelRef = React.useRef()
  const [blogs, setBlogs] = useState([]);
  const handleDelete = (slug) => () => {
    fetch("http://localhost:3000/api/deleteBlog", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ slug }),
    }).then(() => {
      setBlogs(blogs.filter((item) => item.slug !== slug));
    });
    onClose()
  };
  useEffect(() => {
    fetch("http://localhost:3000/api/getBlogs")
      .then((res) => res.json())
      .then((data) => {
        setBlogs(data);
      });
  }, []);

  return (
    <>
      <h1 className="text-3xl font-bold justify-center flex m-10">My Blogs</h1>
      <TableContainer w={600} m={"auto"} marginTop={10} className="text-xl">
        <Table variant="simple">
          {blogs.map((item) => {
            return (
              <>
                <Tbody key={item.slug}>
                  <Tr>
                    <Td>
                      <UnorderedList>
                        <ListItem className="flex gap-3">
                          {item.title}{" "}
                        </ListItem>
                      </UnorderedList>
                    </Td>
                    <Td>
                    <span className="cursor-pointer hover:opacity-85 transition-all">
                    {/* <Button colorScheme='red' onClick={onOpen}>
        Delete
      </Button> */}
      <img width={40} src="/trash-bin.png" onClick={onOpen} alt="" />

      <AlertDialog
        isOpen={isOpen}
        leastDestructiveRef={cancelRef}
        onClose={onClose}
      >
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize='lg' fontWeight='bold'>
              Delete This Blog
            </AlertDialogHeader>

            <AlertDialogBody>
              Are you sure? You can&apos;t undo this action afterwards.
            </AlertDialogBody>

            <AlertDialogFooter>
              <Button ref={cancelRef} onClick={onClose}>
                Cancel
              </Button>
              <Button type="submit" colorScheme='red' onClick={handleDelete(item.slug)} ml={3}>
                Delete
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
                          </span>
                    </Td>
                  </Tr>
                </Tbody>
              </>
            );
          })}
        </Table>
      </TableContainer>
    </>
  );
};

export default Allblogs;
