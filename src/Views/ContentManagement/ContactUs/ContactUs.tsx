import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { useGetContentQuery, useUpdateContentMutation } from '../../../Services/Api/module/content/index';
import CustomCardWrapper from '../../../Shared/components/CustomCardWrapper/CustomCardWrapper';
import { CustomForm } from '../../../Shared/components/index';
import { CONTENT_ENUMS } from '../../../Shared/constants/index';
import { CONTACT_US_FORM_SCHEMA } from './helpers/contactus';
import {  ContactUsFormData, transAPIRequestDataToFormContactUs, transformAPIRequestDataContactUs } from './helpers/transform';


const ContactUs = () => {
  const [initialValues, setInitialValues] = useState({});
  const { data: content, refetch } = useGetContentQuery({});
  const [updateContent] = useUpdateContentMutation({});

  useEffect(() => {
    if (content?.data?.[CONTENT_ENUMS.LANDING_PAGE]) {
      // Set initial form values
      const initialFormValues = transAPIRequestDataToFormContactUs(content.data[CONTENT_ENUMS.LANDING_PAGE]);
      setInitialValues(initialFormValues);

        

    }
  }, [content]);
  

  const onSubmit = async (data: Record<string, unknown>) => {
    const formData = data as unknown as ContactUsFormData; 
  

    const payload = {
      [CONTENT_ENUMS.LANDING_PAGE]: transformAPIRequestDataContactUs(formData),
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
        formData={CONTACT_US_FORM_SCHEMA}
        id={'contactUs-form'}
        onSubmit={onSubmit}
        defaultValues={initialValues}
        submitText="Update ContactUs Content"
      />
    </CustomCardWrapper>
  );
};

export default ContactUs;
