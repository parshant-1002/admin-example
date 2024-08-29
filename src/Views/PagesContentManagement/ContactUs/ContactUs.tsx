import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import {
  useGetContentQuery,
  useUpdateContentMutation,
} from '../../../Services/Api/module/pagescontent/index';
import CustomCardWrapper from '../../../Shared/components/CustomCardWrapper/CustomCardWrapper';
// import AddContentForm from '../../../Shared/components/form/AddContentForm/AddContentForm';
import { CustomForm } from '../../../Shared/components/index';
import { CONTENT_ENUMS } from '../../../Shared/constants/index';
import {
  ContactUsFormData,
  transAPIRequestDataToFormContactUs,
  transformAPIRequestDataContactUs,
} from './helpers/transform';
// import { AddContentFormItem } from '../../../Models/common';
import CONTACT_US_FORM_SCHEMA from './helpers/contactus';

// const initialState: AddContentFormItem = {
//   file: [{ fileURL: '', fileId: '' }],
//   title: '',
//   errors: {},
// };

// const fieldTypes = {
//   file: INPUT_TYPES.FILE_UPLOAD,
//   title: INPUT_TYPES.TEXT,
// };

// const labels = {
//   file: ' icon',
//   title: ' URL',
// };

function ContactUs() {
  // const [socialConnectContent, setSocialConnectContent] = useState<
  //   AddContentFormItem[]
  // >([initialState]);
  const [initialValues, setInitialValues] = useState({});
  const { data: content, refetch } = useGetContentQuery({});
  const [updateContent] = useUpdateContentMutation({});
  useEffect(() => {
    if (content?.data?.[CONTENT_ENUMS.CONTACT_US_SECTION]) {
      // Set initial form values
      const initialFormValues = transAPIRequestDataToFormContactUs(
        content.data[CONTENT_ENUMS.CONTACT_US_SECTION]
      );
      setInitialValues(initialFormValues);
      // Extract and set socialConnectContent values
      // const formGetData = content.data[CONTENT_ENUMS.CONTACT_US_SECTION][
      //   CONTENT_ENUMS.CONTACT_US
      // ][CONTENT_ENUMS.SOCIAL_CONNECT]?.map(
      //   ({ imageURL, url }: { imageURL: string; url: string }) => ({
      //     title: String(url),
      //     file: [{ fileURL: String(imageURL) }],
      //   })
      // );
      // setSocialConnectContent(formGetData);
    }
  }, [content]);
  const onSubmit = async (data: Record<string, unknown>) => {
    const formData = data as unknown as ContactUsFormData;
    // const mappedRoadMap = socialConnectContent.map((item) => ({
    //   url: item.title || '',
    //   imageURL: item.file,
    // }));
    const payload = {
      [CONTENT_ENUMS.CONTACT_US_SECTION]: transformAPIRequestDataContactUs(
        formData
        // mappedRoadMap
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
        formData={CONTACT_US_FORM_SCHEMA}
        id="contactUs-form"
        className="row"
        onSubmit={onSubmit}
        defaultValues={initialValues}
        // preSubmitElement={
        //   <AddContentForm
        //     content={socialConnectContent || []}
        //     setContent={setSocialConnectContent}
        //     types={fieldTypes}
        //     labels={labels}
        //     initialState={initialState}
        //     title="social contact"
        //   />
        // }
        submitText="Update ContactUs Content"
      />
    </CustomCardWrapper>
  );
}

export default ContactUs;
