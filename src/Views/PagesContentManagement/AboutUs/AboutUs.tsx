import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import {
  useGetContentQuery,
  useUpdateContentMutation,
} from '../../../Services/Api/module/pagescontent/index';
import CustomCardWrapper from '../../../Shared/components/CustomCardWrapper/CustomCardWrapper';
import AddContentForm from '../../../Shared/components/form/AddContentForm/AddContentForm';
import { CustomForm } from '../../../Shared/components/index';
import {
  CONTENT_ENUMS,
  INPUT_TYPES,
  STRINGS,
} from '../../../Shared/constants/index';
import ABOUT_US_FORM_SCHEMA from './helpers/constants';
import {
  AboutUsFormData,
  transAPIRequestDataToFormAboutUs,
  transformAPIRequestDataAboutUs,
} from './helpers/transform';
import { AddContentFormItem } from '../../../Models/common';
import { isErrors } from '../../../Shared/utils/functions';

const initialState: AddContentFormItem = {
  title: '',
  content: '',
  moreInormationTitle: '',
  errors: {},
};

const fieldTypes = {
  content: INPUT_TYPES.RICH_TEXT,
};

const labels = {
  content: 'About Us Section Content',
};

function AboutUs() {
  const [aboutUsSection, setAboutUsSection] = useState<AddContentFormItem[]>([
    initialState,
  ]);
  const [initialValues, setInitialValues] = useState({});
  const { data: content, refetch } = useGetContentQuery({});
  const [updateContent] = useUpdateContentMutation({});

  useEffect(() => {
    if (content?.data?.[CONTENT_ENUMS.ABOUT_US]) {
      // Set initial form values
      const initialFormValues = transAPIRequestDataToFormAboutUs(
        content.data[CONTENT_ENUMS.ABOUT_US]
      );
      setInitialValues(initialFormValues);

      // Extract and set aboutUsSection values
      const formGetData = content.data[CONTENT_ENUMS.ABOUT_US]?.sections.map(
        (section: string) => ({
          content: section,
        })
      );

      setAboutUsSection(formGetData || []);
    }
  }, [content]);

  const onSubmit = async (data: Record<string, unknown>) => {
    if (isErrors(aboutUsSection, setAboutUsSection, labels)) return;
    const formData = data as unknown as AboutUsFormData;

    const mappedRoadMap = aboutUsSection.map((item) => ({
      content: item.content || '',
    }));

    const payload = {
      [CONTENT_ENUMS.ABOUT_US]: transformAPIRequestDataAboutUs(
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
        formData={ABOUT_US_FORM_SCHEMA}
        id="aboutus-form"
        onSubmit={onSubmit}
        defaultValues={initialValues}
        submitText={STRINGS.UPDATE_ABOUT_US}
        preSubmitElement={
          <AddContentForm
            content={aboutUsSection || []}
            setContent={setAboutUsSection}
            title="About Us section"
            types={fieldTypes}
            labels={labels}
            initialState={initialState}
          />
        }
      />
    </CustomCardWrapper>
  );
}

export default AboutUs;
