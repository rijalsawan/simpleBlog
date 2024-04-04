import React, { useState } from "react";
import { FormControl, FormLabel, Input } from "@chakra-ui/react";
import { Textarea } from '@chakra-ui/react'
import { Button } from '@chakra-ui/react'
import { useDisclosure } from '@chakra-ui/react'
import { useToast } from '@chakra-ui/react'
import { useRouter } from 'next/router'
import { AlertDialog, AlertDialogBody, AlertDialogFooter,AlertDialogCloseButton, AlertDialogHeader, AlertDialogContent, AlertDialogOverlay } from '@chakra-ui/react'

const CreateBlog = () => {
    const toast = useToast()
    const router = useRouter()
    const { isOpen, onOpen, onClose } = useDisclosure()
    const cancelRef = React.useRef()
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");

    const handleTitleChange = (e) => {
        if(e.target.name == "title")
        setTitle(e.target.value);
    };

    const handleContentChange = (e) => {
        if(e.target.name == "content")
        setContent(e.target.value);
    }

    const handleSubmit = async (e) => {
        if (!title || !content) {
            toast({
                title: "Please fill in all fields",
                status: "error",
                duration: 1000,
                isClosable: true,
            });
            return;
        }
        e.preventDefault();
        const response = await fetch("http://localhost:3000/api/addBlog", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
            body: JSON.stringify({
                slug: title.toLowerCase().replace(/ /g, "-"),
                title,
                content,
            }),
        });
        const data = await response.json();
        console.log(data);
        if (data.error) {
            alert(data.error);
        } else {
            toast({
                title: "Blog posted successfully",
                status: "success",
                duration: 1000,
                isClosable: true,
            })
            setTitle("");
            setContent("");
            router.push("/");
        }
    };
  return (
    <div>
      <h1 className="text-center my-10 text-3xl lg:font-bold">Compose a new Blog</h1>
    <div className="lg:w-[30rem] mx-auto space-y-10">
    <form action="/" className="max-sm:m-6" onSubmit={handleSubmit} method="POST">
      <FormControl>
        <FormLabel>Title</FormLabel>
        <Input type="text" name="title" onChange={handleTitleChange} value={title} />
      </FormControl>
        <FormControl>
            <FormLabel>Content</FormLabel>
      <Textarea name="content" h={300} onChange={handleContentChange} value={content}/>
        </FormControl>
        <div className="flex justify-center m-10">
        <Button bg={"green"} textColor={"white"} _hover={"green"} onClick={onOpen}>Post</Button>
      <AlertDialog
        motionPreset='slideInBottom'
        leastDestructiveRef={cancelRef}
        onClose={onClose}
        isOpen={isOpen}
        isCentered
      >
        <AlertDialogOverlay />

        <AlertDialogContent>
          <AlertDialogHeader>Post blog?</AlertDialogHeader>
          <AlertDialogCloseButton />
          <AlertDialogBody>
            Are you sure you want to post the blog?
          </AlertDialogBody>
          <AlertDialogFooter>
            <Button ref={cancelRef} onClick={onClose}>
              No
            </Button>
            <Button type="submit" onClick={handleSubmit} colorScheme='green' ml={3}>
              Yes
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
        </div>
    </form>
    </div>
    </div>
   
  );
};

export default CreateBlog;
