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
import { Spinner } from '@chakra-ui/react'

const Allblogs = () => {
  const [loading, setLoading] = useState(true);
    const { isOpen, onOpen, onClose } = useDisclosure()
  const cancelRef = React.useRef()
  const [blogs, setBlogs] = useState([]);
  const handleDelete = (slug) => async () => {
    await fetch("/api/deleteBlog", {
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
    fetch("/api/getBlogs", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
        user: localStorage.getItem("user"),
      }
    })
      .then((res) => res.json())
      .then((data) => {
        setBlogs(data);
        setLoading(false);
      });
  }, []);

  return (
    <>
      <h1 className="text-3xl lg:font-bold justify-center flex m-10">My Blogs</h1>
      <TableContainer className="text-xl mt-10 max-sm:ml-10 lg:mx-[30rem] lg:w-[50rem] max-sm:text-[9px]">
      {loading && <div className="flex justify-center"><Spinner/></div>}
        <Table variant="simple">
          {blogs.map((item) => {
            return (
              <>
                <Tbody key={item.slug} display={"flex"}>
                  <Tr>
                    <Td>
                      <UnorderedList>
                        <ListItem display={"flex"} justifyContent={"center"} gap={3}>
                          {item.title}
                          <img className="lg:h-[2rem] max-sm:h-4" src="/trash-bin.png" onClick={onOpen} alt="" />
                        </ListItem>
                      </UnorderedList>
                    </Td>
                    <Td>
                    <div className="cursor-pointer hover:opacity-85 transition-all">
                    {/* <Button colorScheme='red' onClick={onOpen}>
        Delete
      </Button> */}
      

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
                          </div>
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

