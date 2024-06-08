import React, {
  useState, useRef, useCallback, useEffect,
} from 'react';
import PropTypes from 'prop-types';
import {
  Editor, EditorState, RichUtils, convertFromRaw, convertToRaw, getDefaultKeyBinding,
} from 'draft-js';
import 'draft-js/dist/Draft.css';
import { Button } from 'react-bootstrap';
import { updateNote } from '../api/noteData';

// Custom overrides for "code" style.
const styleMap = {
  CODE: { // uses the following for style that has CODE:
    backgroundColor: 'rgba(0, 0, 0, 0.05)',
    fontFamily: '"Inconsolata", "Menlo", "Consolas", monospace',
    fontSize: 16,
    padding: 2,
  },
};

// assigns 'RichEditor-blockquote' to selected text/next text entered
const getBlockStyle = (block) => {
  switch (block.getType()) {
    case 'blockquote': return 'RichEditor-blockquote';
    default: return null;
  }
};

// called in the block, and in line styling to apply styles
const StyleButton = ({
  label, style, active, onToggle,
}) => {
  const onToggleClick = (e) => {
    e.preventDefault();
    onToggle(style);
  };

  let className = 'RichEditor-styleButton';
  if (active) {
    className += ' RichEditor-activeButton';
  }

  return (
    // eslint-disable-next-line jsx-a11y/no-static-element-interactions
    <span className={className} onMouseDown={onToggleClick}>
      {label}
    </span>
  );
};

StyleButton.propTypes = {
  label: PropTypes.string,
  style: PropTypes.string,
  active: PropTypes.bool,
  onToggle: PropTypes.func,
}.isRequired;

// buttons on the style header, style: is passed onto the style button *** ADD BLOCK STYLES HERE ***
const BLOCK_TYPES = [
  { label: 'H1', style: 'header-one' },
  { label: 'H2', style: 'header-two' },
  { label: 'H3', style: 'header-three' },
  { label: 'H4', style: 'header-four' },
  { label: 'H5', style: 'header-five' },
  { label: 'Blockquote', style: 'blockquote' },
  { label: '⦿', style: 'unordered-list-item' },
  { label: '123', style: 'ordered-list-item' },
];

// establishes a component to be called into the main editor, contains Block text styles.
const BlockStyleControls = ({ editorState, onToggle }) => {
  const selection = editorState.getSelection();
  const blockType = editorState
    .getCurrentContent()
    .getBlockForKey(selection.getStartKey())
    .getType();

  return (
    <div className="RichEditor-controls">
      {BLOCK_TYPES.map((type) => (
        <StyleButton
          key={type.label} // React tool to identifiy button
          active={type.style === blockType} // used to determine if the style is block or inline
          label={type.label} // display text
          onToggle={onToggle} // sets the effect to active or not
          style={type.style} // the style to be used
        />
      ))}
    </div>
  );
};

BlockStyleControls.propTypes = {
  editorState: PropTypes.func,
  onToggle: PropTypes.func,
}.isRequired;

// various styles to be used inline *** ADD INLINE STYLES HERE ***
const INLINE_STYLES = [
  { label: 'Bold', style: 'BOLD' },
  { label: 'Italic', style: 'ITALIC' },
  { label: 'Underline', style: 'UNDERLINE' },
  { label: 'Monospace', style: 'CODE' },
];

// Used to map though the inline styles on the toolbar
const InlineStyleControls = ({ editorState, onToggle }) => {
  const currentStyle = editorState.getCurrentInlineStyle();

  return (
    <div className="RichEditor-controls">
      {INLINE_STYLES.map((type) => (
        <StyleButton
          key={type.label}
          active={currentStyle.has(type.style)}
          label={type.label}
          onToggle={onToggle}
          style={type.style}
        />
      ))}
    </div>
  );
};

InlineStyleControls.propTypes = {
  editorState: PropTypes.func,
  onToggle: PropTypes.func,
}.isRequired;

// ***THE ACTUAL EDITOR COMPONENT IS HERE***

const RichTextEditor = ({ noteID, content, onSave }) => {
  const [editorState, setEditorState] = useState(EditorState.createEmpty()); // Holds the current state of the Editor
  const editorRef = useRef(null); // ref to access the editor DOM node, useRef is used to
  // const [baseContent, setBaseContent] = useState(null);

  const focus = () => editorRef.current.focus(); // focus on the editor when wanted

  const handleKeyCommand = useCallback((command) => {
    const newState = RichUtils.handleKeyCommand(editorState, command); // checks if Draft supports the command via setting editorState to a bool
    if (newState) {
      setEditorState(newState);
      return true;
    }
    return false;
  }, [editorState]);

  const mapKeyToEditorCommand = useCallback((e) => { // Sets tab as an indintation, currently broken on import, can try to fix later
    if (e.keyCode === 9 /* TAB */) {
      const newEditorState = RichUtils.onTab(e, editorState, 4 /* maxDepth */); // tab works on bullet points, and listed order
      if (newEditorState !== editorState) {
        setEditorState(newEditorState);
      }
      return null; // Explicitly return null for eslint
    }
    return getDefaultKeyBinding(e);
  }, [editorState]);

  const toggleBlockType = useCallback((blockType) => { // Toggle for block styles
    setEditorState(RichUtils.toggleBlockType(editorState, blockType));
  }, [editorState]);

  const toggleInlineStyle = useCallback((inlineStyle) => { // Toggle for inline styles
    setEditorState(RichUtils.toggleInlineStyle(editorState, inlineStyle));
  }, [editorState]);

  const handleFocus = useCallback((e) => { // makes the focus the editor on, click, enter key, or space
    if (e.type === 'click' || e.key === 'Enter' || e.key === ' ') {
      focus();
    }
  }, []);

  const contentState = editorState.getCurrentContent(); // checks if the editor has text to display the placeholder
  let className = 'RichEditor-editor';
  if (!contentState.hasText()) {
    if (contentState.getBlockMap().first().getType() !== 'unstyled') {
      className += ' RichEditor-hidePlaceholder';
    }
  }

  useEffect(() => { // converts content from Json to readable/editable data
    if (content) {
      const contentText = convertFromRaw(JSON.parse(content));
      setEditorState(EditorState.createWithContent(contentText));
    } else {
      setEditorState(EditorState.createEmpty());
    }
  }, [content]);

  const updateTextContent = () => { // update function for submitting updated content
    const contentData = editorState.getCurrentContent();
    const rawContentState = JSON.stringify(convertToRaw(contentData));
    const payload = { firebaseKey: noteID, content: rawContentState };
    updateNote(payload).then(onSave);
  };

  return (
    <div className="RichEditor-root">
      <Button onClick={updateTextContent}>save</Button>
      <BlockStyleControls editorState={editorState} onToggle={toggleBlockType} /> {/* import of the functions above */}
      <InlineStyleControls editorState={editorState} onToggle={toggleInlineStyle} /> {/* import of the functions above */}
      <div
        className={className}
        onClick={handleFocus}
        onKeyDown={handleFocus}
        tabIndex={0}
        role="button"
        aria-label="text"
      > {/* import of the Editor Component from Draft */}
        <Editor
          blockStyleFn={getBlockStyle}
          customStyleMap={styleMap}
          editorState={editorState}
          handleKeyCommand={handleKeyCommand}
          keyBindingFn={mapKeyToEditorCommand}
          onChange={setEditorState}
          placeholder="The story unfolds..."
          ref={editorRef}
          spellCheck
        />
      </div>
    </div>
  );
};

RichTextEditor.propTypes = {
  noteID: PropTypes.string,
  onSave: PropTypes.func,
  content: PropTypes.object,
}.isRequired;

export default RichTextEditor;
