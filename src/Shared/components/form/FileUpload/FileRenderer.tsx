/* eslint-disable jsx-a11y/media-has-caption */

import { addBaseUrl } from '../../../utils/functions';

interface FileRendererProps {
  fileURL?: string;
  alt?: string;
}

function FileRenderer({ fileURL, alt = '' }: FileRendererProps) {
  if (
    fileURL?.endsWith('.png') ||
    fileURL?.endsWith('.jpg') ||
    fileURL?.endsWith('.svg') ||
    fileURL?.endsWith('.jpeg')
  ) {
    return <img height={100} src={addBaseUrl(fileURL)} alt={alt} />;
  }

  if (fileURL?.endsWith('.mp4') || fileURL?.endsWith('.mov')) {
    return <video src={addBaseUrl(fileURL)} controls />;
  }

  return (
    <small className="text-primary d-block">Unsupported file format</small>
  );
}

export default FileRenderer;
