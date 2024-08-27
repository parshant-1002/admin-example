/* eslint-disable jsx-a11y/tabindex-no-positive */
import JoditEditor, { Jodit } from 'jodit-react';
import { forwardRef, useMemo } from 'react';

// Define types for the props
interface RichTextProps {
  content: string;
  placeholder?: string;
  onChange: (content: string) => void;
}

const RichText = forwardRef<Jodit, RichTextProps>(
  ({ content, placeholder, onChange }, ref) => {
    const config = useMemo(
      () => ({
        readonly: false,
        placeholder: placeholder || '',
        enableDragAndDropFileToEditor: true,
        uploader: {
          url: 'https://xdsoft.net/jodit/connector/index.php?action=fileUpload',
          insertImageAsBase64URI: false,
          imagesExtensions: ['jpg', 'png', 'jpeg', 'gif'],
        },
        image: {
          openOnDblClick: false,
          editSrc: false,
          useImageEditor: false,
          editTitle: true,
          editAlt: true,
          editLink: false,
          editSize: true,
          editBorderRadius: false,
          editMargins: false,
          editClass: true,
          editStyle: false,
          editId: false,
          editAlign: false,
          showPreview: true,
          selectImageAfterClose: true,
        },
        zIndex: 0,
        activeButtonsInReadOnly: ['source', 'fullsize', 'print', 'about'],
        toolbarButtonSize: 'middle' as
          | 'small'
          | 'middle'
          | 'tiny'
          | 'xsmall'
          | 'large',
        theme: 'default',
        saveModeInCookie: false,
        spellcheck: true,
        editorCssClass: '',
        triggerChangeEvent: true,
        height: 220,
        direction: 'ltr' as '' | 'ltr' | 'rtl' | undefined,
        language: 'en',
        debugLanguage: false,
        tabIndex: -1,
        toolbar: true,
        enter: 'p' as 'p' | 'div' | 'br',
        useSplitMode: false,
        colorPickerDefaultTab: 'background' as
          | 'background'
          | 'color'
          | undefined,
        imageDefaultWidth: 100,
        removeButtons: [
          'source',
          'fullsize',
          'about',
          'outdent',
          'indent',
          'video',
          'print',
          'table',
          'fontsize',
          'superscript',
          'subscript',
          'file',
          'cut',
          'selectall',
        ],
        disablePlugins: ['paste', 'stat', 'color'],
        events: {},
        textIcons: false,
        showXPathInStatusbar: false,
      }),
      [placeholder]
    );

    return (
      <JoditEditor
        ref={ref}
        value={content}
        config={config}
        onChange={onChange}
      />
    );
  }
);

RichText.displayName = 'RichText'; // Add display name

export default RichText;
