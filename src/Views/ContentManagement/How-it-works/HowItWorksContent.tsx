import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import {
  useGetContentQuery,
  useUpdateContentMutation,
} from '../../../Services/Api/module/content';
import { CustomForm } from '../../../Shared/components';
import CustomCardWrapper from '../../../Shared/components/CustomCardWrapper';
import AddContentForm from '../../../Shared/components/form/AddContentForm/AddContentForm';
import { CONTENT_ENUMS, INPUT_TYPES } from '../../../Shared/constants';
import { transAPIRequestDataToFormFaq } from '../Faqs/helpers/transform';
import { HOW_IT_WORKS_FORM_SCHEMA } from './helpers/howItWorksSchema';
import {
  FormData,
  RoadMapItem,
  transformAPIRequestDataFaq,
} from './helpers/transform';

const initialState: RoadMapItem = {
  companyLogo: '',
  title: '',
  content: '',
  errors: {},
};

const fieldTypes = {
  companyLogo: INPUT_TYPES.FILE_UPLOAD,
  title: INPUT_TYPES.TEXT,
  content: INPUT_TYPES.TEXT,
};

const labels = {
  companyLogo: 'Add Card Icon',
  title: 'Add Card Title',
  content: 'Add Card Description',
};

function HowItWorks() {
  const [roadMap, setRoadMap] = useState<RoadMapItem[]>([initialState]);
  const [initialValues, setInitialValues] = useState({});
  const { data: content, refetch } = useGetContentQuery({});
  const [updateContent] = useUpdateContentMutation({});
  useEffect(() => {
    if (content?.data?.[CONTENT_ENUMS.LANDING_PAGE]) {
      // Set initial form values
      const initialFormValues = transAPIRequestDataToFormFaq(
        content.data[CONTENT_ENUMS.LANDING_PAGE]
      );
      setInitialValues(initialFormValues);

      // Extract and set roadMap values
      const formGetData = content.data[CONTENT_ENUMS.HOW_IT_WORKS_SECTION][
        CONTENT_ENUMS.HOW_IT_WORKS_SECTION
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
          companyLogo: String(imageURL),
        })
      );
      setRoadMap(formGetData);
    }
  }, [content]);

  const onSubmit = async (data: Record<string, unknown>) => {
    const formData = data as unknown as FormData;

    const mappedRoadMap = roadMap.map((item) => ({
      companyLogo: item.companyLogo || '',
      title: item.title || '',
      content: item.content || '',
    }));

    const payload = {
      [CONTENT_ENUMS.HOW_IT_WORKS_SECTION]: transformAPIRequestDataFaq(
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
            roadMap={roadMap}
            setRoadMap={setRoadMap}
            types={fieldTypes}
            labels={labels}
            initialState={initialState}
          />
        }
      />
    </CustomCardWrapper>
  );
}

export default HowItWorks;
