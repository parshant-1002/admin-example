/* eslint-disable jsx-a11y/label-has-associated-control */
import React from 'react';
import { Button } from 'react-bootstrap';
import { Delete } from '../../../../assets/index';
import { RoadMapItem } from '../../../../Views/ContentManagement/Faqs/helpers/transform';
import { IMAGE_FILE_TYPES, INPUT_TYPES } from '../../../constants';
// import { validateField } from '../../../utils/functions';
import FileInput from '../FileUpload/FileUpload';
import RichText from '../RIchText/RitchText';
import CustomSelect from '../Select/Select';
import Switch from '../Switch/Switch';
import TextField from '../TextInput/TextInput';
import './AddContentForm.scss';
import FieldSetWrapper from './FieldSetWrpper';

// The props interface is now using FaqMapItem instead of RoadMapItem
interface AddContentFormProps {
  roadMap: RoadMapItem[];
  setRoadMap: React.Dispatch<React.SetStateAction<RoadMapItem[]>>;
  types: { [key: string]: string };
  labels: { [key: string]: string };
  options?: { [key: string]: unknown[] };
  initialState: RoadMapItem;
  title?: string;
}

function AddContentForm({
  roadMap,
  setRoadMap,
  types,
  labels,
  options,
  initialState,
  title,
}: AddContentFormProps) {
  const addLevel = () => {
    // const currentErrors = validateField(roadMap[roadMap.length - 1]);
    // if (Object.keys(currentErrors).length === 0) {
    setRoadMap([...roadMap, initialState]);
    // }
    // else {
    //   const updatedRoadMap = roadMap.map((item, i) =>
    //     i === roadMap.length - 1 ? { ...item, errors: currentErrors } : item
    //   );
    //   //   setRoadMap(updatedRoadMap);
    // }
  };

  const removeLevel = (index: number) => {
    setRoadMap(roadMap.filter((_, i) => i !== index));
  };

  const updateField = (index: number, field: string, value: unknown) => {
    const updatedRoadMap = roadMap.map((item, i) => {
      if (i === index) {
        const newErrors = { ...item.errors };
        delete newErrors[field];

        return {
          ...item,
          [field]: value,
          errors: newErrors,
        };
      }
      return item;
    });

    console.log('🚀 ~ updatedRoadMap ~ updatedRoadMap:', updatedRoadMap);
    setRoadMap(updatedRoadMap);
  };

  return (
    <FieldSetWrapper title={title}>
      {roadMap.map((item, index) => (
        <div className="common_title_grp" key={`${item.id}-${index}`}>
          {Object.keys(types).map((typeKey) => {
            const inputType = types[typeKey];
            const label = labels[typeKey];
            const value = item[typeKey];
            return (
              <div
                className={`mb-3 col-md-12 ${
                  inputType === INPUT_TYPES.SWITCH && 'custom_switch'
                }`}
                key={typeKey}
              >
                <label>{label}</label>
                {[INPUT_TYPES.TEXT, INPUT_TYPES.NUMBER].includes(inputType) && (
                  <TextField
                    type={inputType}
                    value={value}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                      updateField(index, typeKey, e.target.value)
                    }
                  />
                )}
                {inputType === INPUT_TYPES.RICH_TEXT && (
                  <RichText
                    content={String(value)}
                    onChange={(valueRichText) =>
                      updateField(index, typeKey, valueRichText)
                    }
                  />
                )}
                {inputType === INPUT_TYPES.FILE && (
                  <input
                    className="form-control"
                    type="file"
                    onChange={(e) => {
                      console.log('djfkjhdsjkdhjkdfhs', e.target);

                      updateField(
                        index,
                        typeKey,
                        e.target?.files ? e.target?.files[0] : null
                      );
                    }}
                  />
                )}
                {inputType === INPUT_TYPES.FILE_UPLOAD && (
                  <FileInput
                    className="form-control"
                    accept={IMAGE_FILE_TYPES}
                    value={value}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                      updateField(index, typeKey, e);
                    }}
                  />
                )}
                {inputType === INPUT_TYPES.SELECT && (
                  <CustomSelect
                    value={value}
                    options={options?.[typeKey] || []}
                    onChange={(valueSelect: unknown) =>
                      updateField(index, typeKey, valueSelect)
                    }
                  />
                )}
                {inputType === INPUT_TYPES.SWITCH && (
                  <Switch
                    checked={Boolean(value)}
                    onChange={(valueSwitch) =>
                      updateField(index, typeKey, valueSwitch)
                    }
                  />
                )}

                {item.errors && item.errors[typeKey] && (
                  <span className="d-block error invalid-feedback">
                    {item.errors[typeKey]}
                  </span>
                )}
              </div>
            );
          })}
          {roadMap.length > 1 && (
            <button
              type="button"
              className="btn btn-danger common_title_grp_btn mt-2"
              onClick={() => removeLevel(index)}
            >
              <img src={Delete} alt={'Trash'} width={10} />
            </button>
          )}
        </div>
      ))}
      <div className="mb-2 mt-2">
        <Button type="button" onClick={addLevel}>
          + Add
        </Button>
      </div>
    </FieldSetWrapper>
  );
}

export default AddContentForm;
