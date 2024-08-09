/* eslint-disable jsx-a11y/media-has-caption */

interface FileRendererProps {
  fileURL?: string;
  alt?: string;
}

function FileRenderer({ fileURL, alt = '' }: FileRendererProps) {
  if (
    fileURL?.endsWith('.png') ||
    fileURL?.endsWith('.jpg') ||
    fileURL?.endsWith('.svg')
  ) {
    return <img height={100} src={fileURL} alt={alt} />;
  }

  if (fileURL?.endsWith('.mp4') || fileURL?.endsWith('.mov')) {
    return <video src={fileURL} controls />;
  }

  return (
    <small className="text-primary d-block">Unsupported file format</small>
  );
}

export default FileRenderer;
