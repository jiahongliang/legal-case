import React, { Component } from "react";
import { EditorState, convertToRaw, ContentState } from "draft-js";
import { Editor } from "react-draft-wysiwyg";
import draftToHtml from "draftjs-to-html";
import htmlToDraft from "html-to-draftjs";
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import './index.css';

class ControlledEditor extends Component {
  constructor(props) {
    super(props);
    this.state = {
      editorState: EditorState.createEmpty(),
      initContent: null
    };
  }

  /*
  componentDidMount() {
    const html = this.props.initContent;
    if(!html) return;
    const contentBlock = htmlToDraft(html);
    if(contentBlock) {
        const contentState = ContentState.createFromBlockArray(contentBlock.contentBlocks);
        const editorState = EditorState.createWithContent(contentState);
        this.setState({
            editorState
        });
    }
  }*/

  static getDerivedStateFromProps(props, state) {
    if(!props.initContent) {
      state.editorState = null;
      state.initContent = props.initContent;
    }
    if(props.initContent !== state.initContent) {
      const html = props.initContent;
      state.initContent = props.initContent;
      if(!html) return null;
      const contentBlock = htmlToDraft(html);
      if(contentBlock) {
          const contentState = ContentState.createFromBlockArray(contentBlock.contentBlocks);
          const editorState = EditorState.createWithContent(contentState);
          state.editorState = editorState;
      }
    }
    return null;
  }

  onEditorStateChange = (editorState) => {
    this.setState({
      editorState,
      changeSource: true
    });
    this.props.onEditorContentChange(draftToHtml(convertToRaw(editorState.getCurrentContent())))
  };

  render() {
    const { editorState } = this.state;
    return (
      <Editor
        editorState={editorState}
        localization={{ locale: 'zh' }}
        toolbar={{
            fontFamily: { options: ['宋体', '黑体', '楷体', '微软雅黑','Arial',  'Georgia', 'Impact', 'Tahoma', 'Times New Roman', 'Verdana',]}
          }}
          {...this.props}
        wrapperClassName="demo-wrapper"
        editorClassName="demo-editor"
        onEditorStateChange={this.onEditorStateChange}
      />
    );
  }
}

export default ControlledEditor;
