/* eslint-disable jsx-a11y/label-has-associated-control */
import { LegacyRef, ReactNode } from 'react';
import { Button } from 'react-bootstrap';
import { DropzoneInputProps, DropzoneRootProps } from 'react-dropzone';
import { BUTTON_LABELS, STRINGS } from '../../../../constants/constants';
import { FileData } from '../helpers/modal';
import { renderUploadInstructions } from '../helpers/utils';

interface ImageUploadBoxProps {
  label?: string;
  subLabel?: string;
  accept?: string;
  renderSelectedFile: ReactNode;
  fileValue?: FileData[];
  getRootProps: (props?: DropzoneRootProps) => DropzoneRootProps;
  getInputProps: (props?: DropzoneInputProps) => DropzoneInputProps;
  ref: LegacyRef<HTMLInputElement> | undefined;
  ratio?: number[];
  isDragActive: boolean;
  handleFileUpload: (fileList: FileData[]) => void;
}
export default function ImageUploadBox({
  label,
  subLabel,
  accept,
  renderSelectedFile,
  fileValue,
  getRootProps,
  getInputProps,
  ref,
  ratio,
  isDragActive,
  handleFileUpload,
}: ImageUploadBoxProps) {
  return (
    <>
      {label && <label className="form-label">{label}</label>}
      {subLabel && <span>{subLabel}</span>}
      {accept && <p>{renderUploadInstructions(accept, ratio)}</p>}
      <div className="text-center upload-file">
        {fileValue?.length ? (
          <div className="uploaded-pic-grid">{renderSelectedFile}</div>
        ) : (
          <div {...getRootProps()}>
            <input
              ref={ref}
              accept={accept}
              {...getInputProps()}
              className="form-control upl-File"
            />
            {isDragActive ? (
              <div className="upload-text">
                <span>{STRINGS.DROP_FILE_HERE}</span>
              </div>
            ) : (
              <div className="upload-text">
                <span>
                  {STRINGS.DROP_FILE_HERE}, or <br />
                  <small>Click here</small> to browse
                </span>
              </div>
            )}
          </div>
        )}
      </div>
      <div className="text-center mt-3">
        {fileValue?.length ? (
          <Button
            className="btn-md"
            variant="primary"
            onClick={() => handleFileUpload(fileValue)}
          >
            {BUTTON_LABELS.UPLOAD}
          </Button>
        ) : null}
      </div>
    </>
  );
}
