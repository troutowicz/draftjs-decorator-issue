import { EditorState, Modifier } from 'draft-js';

export default function insertCustomEntity (editorState) {
  let contentState = editorState.getCurrentContent();
  let selectionState = editorState.getSelection();
  const endOffset = selectionState.getEndOffset();

  contentState = contentState.createEntity('CUSTOM', 'IMMUTABLE', { entityKey: undefined });
  const entityKey = contentState.getLastCreatedEntityKey();
  contentState.mergeEntityData(entityKey, { entityKey });

  contentState = Modifier.removeRange(
    contentState,
    selectionState.merge({ anchorOffset: endOffset, focusOffset: endOffset }),
    'backward',
  );

  contentState = Modifier.insertText(
    contentState,
    contentState.getSelectionAfter(),
    ' ',
  );

  contentState = Modifier.insertText(
    contentState,
    contentState.getSelectionAfter(),
    ' ',
    undefined,
    entityKey,
  );

  contentState = Modifier.insertText(
    contentState,
    contentState.getSelectionAfter(),
    ' ',
  );

  return EditorState.push(editorState, contentState, 'apply-entity');
}
