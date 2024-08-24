import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { AddContentFormItem } from '../../../Models/common';
import {
  useGetContentQuery,
  useUpdateContentMutation,
} from '../../../Services/Api/module/content';
import { CustomForm } from '../../../Shared/components';
import CustomCardWrapper from '../../../Shared/components/CustomCardWrapper';
import AddContentForm from '../../../Shared/components/form/AddContentForm/AddContentForm';
import { CONTENT_ENUMS, INPUT_TYPES } from '../../../Shared/constants';
import { isErrors } from '../../../Shared/utils/functions';
import HOW_IT_WORKS_FORM_SCHEMA from './helpers/howItWorksSchema';
import {
  FormData,
  transAPIRequestDataToFormHowItsWork,
  transformAPIRequestDataHowItsWork,
} from './helpers/transform';

const initialState: AddContentFormItem = {
  file: [{ fileURL: '' }],
  title: '',
  content: '',
  errors: {},
};

const fieldTypes = {
  file: INPUT_TYPES.FILE_UPLOAD,
  title: INPUT_TYPES.TEXT,
  content: INPUT_TYPES.TEXT,
};

const labels = {
  file: 'Card Icon',
  title: 'Card Title',
  content: 'Card Description',
};

function HowItWorks() {
  const [howItWorkCardContent, setHowItWorkCardContent] = useState<
    AddContentFormItem[]
  >([initialState]);
  const [initialValues, setInitialValues] = useState({});
  const { data: content, refetch } = useGetContentQuery({});
  const [updateContent] = useUpdateContentMutation({});
  useEffect(() => {
    if (content?.data?.[CONTENT_ENUMS.HOW_IT_WORKS_SECTION]) {
      // Set initial form values
      const initialFormValues = transAPIRequestDataToFormHowItsWork(
        content.data[CONTENT_ENUMS.HOW_IT_WORKS_SECTION]
      );
      setInitialValues(initialFormValues);

      // Extract and set howItWorkCardContent values
      const formGetData = content.data?.[CONTENT_ENUMS.HOW_IT_WORKS_SECTION]?.[
        CONTENT_ENUMS.HOW_IT_WORKS
      ].map(
        ({
          imageURL,
          title,
          description,
        }: {
          imageURL: string;
          title: string;
          description: string;
        }) => ({
          title: String(title),
          content: String(description),
          file: [{ fileURL: String(imageURL) }],
        })
      );
      setHowItWorkCardContent(formGetData);
    }
  }, [content]);

  const onSubmit = async (data: Record<string, unknown>) => {
    if (isErrors(howItWorkCardContent, setHowItWorkCardContent, labels)) return;
    const formData = data as unknown as FormData;

    const mappedRoadMap = howItWorkCardContent.map((item) => ({
      imageURL: item.file,
      title: item.title || '',
      content: item.content || '',
    }));

    const payload = {
      [CONTENT_ENUMS.HOW_IT_WORKS_SECTION]: transformAPIRequestDataHowItsWork(
        formData,
        mappedRoadMap
      ),
    };

    await updateContent({
      payload,
      onSuccess: (res: { message: string }) => {
        toast.success(res.message);
        refetch();
      },
    });
  };

  return (
    <CustomCardWrapper>
      <CustomForm
        formData={HOW_IT_WORKS_FORM_SCHEMA}
        id="how-it-works-form"
        onSubmit={onSubmit}
        defaultValues={initialValues}
        submitText="Update How It Works Content"
        preSubmitElement={
          <AddContentForm
            content={howItWorkCardContent}
            setContent={setHowItWorkCardContent}
            types={fieldTypes}
            title="How it work card"
            labels={labels}
            initialState={initialState}
          />
        }
      />
    </CustomCardWrapper>
  );
}

export default HowItWorks;
