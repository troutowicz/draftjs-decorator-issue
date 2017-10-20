import React, { Component } from 'react';
import { CompositeDecorator, Editor, EditorState } from 'draft-js';

import 'draft-js/dist/Draft.css';

import Entity from './Entity.js';
import insertCustomEntity from './modifiers/insertCustomEntity.js';

class MyEditor extends Component {
  constructor (props) {
    super(props);

    this.state = {
      editorState: EditorState.createEmpty(new CompositeDecorator([
        {
          strategy: this._findCustomEntities,
          component: Entity,
        },
      ])),
    }
  }

  _findCustomEntities = (contentBlock, callback, contentState) => {
    contentBlock.findEntityRanges((character) => {
      const entityKey = character.getEntity();

      return entityKey !== null && contentState.getEntity(entityKey).getType() === 'CUSTOM';
    }, callback);
  }

  _handleBeforeInput = (chars: string, editorState) => {
    if (chars === '$') {
      let newEditorState = insertCustomEntity(editorState);

      this._handleChange(newEditorState);
      return 'handled';
    }

    return 'not-handled';
  }

  _handleChange = (editorState) => {
    this.setState({ editorState });
  }

  render() {
    return (
      <Editor
        editorState={this.state.editorState}
        handleBeforeInput={this._handleBeforeInput}
        onChange={this._handleChange}
        placeholder="Type something"
      />
    );
  }
}

export default MyEditor;
