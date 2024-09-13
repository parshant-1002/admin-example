import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { CustomForm } from '../../../Shared/components';
import HEADER_CONTENT_FORM_SCHEMA from './helpers/headerSchema';

import {
  useGetContentQuery,
  useUpdateContentMutation,
} from '../../../Services/Api/module/pagescontent';
import CustomCardWrapper from '../../../Shared/components/CustomCardWrapper';
import {
  CONTENT_ENUMS,
  INPUT_TYPES,
} from '../../../Shared/constants/constants';
import {
  APIData,
  transformAPIData,
  transformAPIRequestData,
} from './helpers/transform';
import { AddContentFormItem } from '../../../Models/common';
import AddContentForm from '../../../Shared/components/form/AddContentForm/AddContentForm';
import { isErrors } from '../../../Shared/utils/functions';

const initialState: AddContentFormItem = {
  title: '',
  file: [{ fileURL: '', fileId: '' }],
  errors: {},
};

const fieldTypes = {
  title: INPUT_TYPES.TEXT,
  file: INPUT_TYPES.FILE_UPLOAD,
};

const labels = {
  title: 'Title',
  file: 'Image',
};
function HeaderContent() {
  const [initialValues, setInitialValues] = useState({});
  const [dropDownItems, setDropDownItems] = useState<AddContentFormItem[]>([
    initialState,
  ]);
  const { data: content, refetch } = useGetContentQuery({});
  const [updateContent] = useUpdateContentMutation({});
  useEffect(() => {
    if (content?.data?.[CONTENT_ENUMS.HEADER]) {
      setInitialValues(
        transformAPIRequestData(content?.data?.[CONTENT_ENUMS.HEADER])
      );
      const formGetData = content.data?.[CONTENT_ENUMS.HEADER]?.menuItems?.map(
        ({
          imageURL,
          title,
          fileId,
        }: {
          imageURL: string;
          title: string;
          fileId: string;
        }) => ({
          title: String(title),
          file: [{ fileURL: String(imageURL), fileId }],
        })
      );
      setDropDownItems(formGetData);
    }
  }, [content]);

  const onSubmit = async (data: Record<string, unknown>) => {
    if (isErrors(dropDownItems, setDropDownItems, labels)) return;

    const payload = {
      [CONTENT_ENUMS.HEADER]: transformAPIData(
        data as unknown as APIData,
        dropDownItems
      ),
    };

    await updateContent({
      payload,
      onSuccess: (res: { message: string }) => {
        toast.success(res?.message);
        refetch();
      },
    });
  };

  return (
    <CustomCardWrapper>
      <CustomForm
        id="headers-content"
        formData={HEADER_CONTENT_FORM_SCHEMA}
        onSubmit={onSubmit}
        className="row"
        defaultValues={initialValues}
        submitText="Update Header Content"
        preSubmitElement={
          <AddContentForm
            content={dropDownItems || []}
            setContent={setDropDownItems}
            types={fieldTypes}
            labels={labels}
            title="Header Drop Down Items"
            initialState={initialState}
          />
        }
      />
    </CustomCardWrapper>
  );
}

export default HeaderContent;
