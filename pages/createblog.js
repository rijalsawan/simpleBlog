import React, { useEffect, useState } from "react";
import { FormControl, FormLabel, Input } from "@chakra-ui/react";
import { Button } from '@chakra-ui/react'
import { useDisclosure } from '@chakra-ui/react'
import { useToast } from '@chakra-ui/react'
import { useRouter } from 'next/router'
import { AlertDialog, AlertDialogBody, AlertDialogFooter,AlertDialogCloseButton, AlertDialogHeader, AlertDialogContent, AlertDialogOverlay } from '@chakra-ui/react'
import { Editor } from '@tinymce/tinymce-react';
import { useRef } from 'react';
import dotenv from 'dotenv'
var Extrator = require("html-extractor");
import { useEditor, EditorContent } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'


const CreateBlog = () => {
    var myExtrator = new Extrator();
    dotenv.config()
    const toast = useToast()
    const router = useRouter()
    const { isOpen, onOpen, onClose } = useDisclosure()
    const cancelRef = React.useRef()
    const [title, setTitle] = useState("");
    const [category, setCategory] = useState("");
    const [user, setUser] = useState("");

    const editorRef = useRef(null);
    const editor = useEditor({
      extensions: [
        StarterKit,
      ],
      content: '<p>Hello World! 🌎️</p>',
    })
  const log = () => {
    if (editorRef.current) {
      console.log(editorRef.current.getContent());
    }
  };

    const handleTitleChange = (e) => {
        if(e.target.name == "title")
        setTitle(e.target.value);
    };

    const handleSubmit = async (e) => {
        const content = editorRef.current.getContent();
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
        const response = await fetch("/api/addBlog", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
            body: JSON.stringify({
                slug: title.toLowerCase().replace(/ /g, "-"),
                title,
                content,
                user
            }),
        });
        const data = await response.json();
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
            router.push("/");
        }
    };
    useEffect(() => {
      const token = localStorage.getItem("user");
      if (!token) {
        toast({
          title: "Login to continue",
          status: "error",
          duration: 1500,
          isClosable: true,
        });
        router.push("/login");
      } else {
        setUser(token);
      }

    }, [router]);
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
            <Editor
        apiKey="j029l8bbej5u8qnfevym04h53xu535vvm3dc66y8eydmf9rd"
        onInit={(evt, editor) => editorRef.current = editor}
        init={{
          height: 500,
          menubar: false,
          plugins: [
            'advlist', 'autolink', 'lists', 'link', 'image', 'charmap', 'preview',
            'anchor', 'searchreplace', 'visualblocks', 'code', 'fullscreen',
            'insertdatetime', 'media', 'table', 'code', 'help', 'wordcount'
          ],
          toolbar: 'undo redo | blocks | ' +
            'bold italic forecolor | alignleft aligncenter ' +
            'alignright alignjustify | bullist numlist outdent indent | ' +
            'removeformat | help',
          content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }'
        }}
      />
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
            <Button type="submit" onClick={handleSubmit}  colorScheme='green' ml={3}>
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
