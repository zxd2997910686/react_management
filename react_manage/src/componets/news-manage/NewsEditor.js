import React, { useEffect, useState } from "react";
import { Editor } from "react-draft-wysiwyg";
import { ContentState, convertToRaw, EditorState } from 'draft-js';
import draftToHtml from 'draftjs-to-html'
import htmlToDraft from 'html-to-draftjs'

import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";

export default function NewsEditor(props){

    const [editorState,setEditorState] = useState('')
    useEffect(()=>{
        const html = props.content;
        if(html === undefined){
            return
        }
        const contentBlock = htmlToDraft(html)
        if(contentBlock){
            const contentState = ContentState.createFromBlockArray(contentBlock.contentBlocks);
            const editorState = EditorState.createWithContent(contentState);
            setEditorState(editorState)
        }
    })
    return (
        <div>
            <Editor
             editorState={editorState}
             toolbarClassName = "aaaaa"
             wrapperClassName="bbbbb"
             editorClassName="cccccc"
             onEditorStateChange={(editorState)=> setEditorState(editorState)}
             onBlur = {()=>{
                props.getContent(draftToHtml(convertToRaw(editorState.getCurrentContent())))

             }}
            />
        </div>
    )
}
