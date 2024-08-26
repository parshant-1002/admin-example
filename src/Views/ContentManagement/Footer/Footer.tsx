/* eslint-disable no-console */
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import {
  useGetContentQuery,
  useUpdateContentMutation,
} from '../../../Services/Api/module/content/index';
import CustomCardWrapper from '../../../Shared/components/CustomCardWrapper/CustomCardWrapper';
import AddContentForm from '../../../Shared/components/form/AddContentForm/AddContentForm';
import { CustomForm } from '../../../Shared/components/index';
import { CONTENT_ENUMS, INPUT_TYPES } from '../../../Shared/constants/index';
import {
  FooterFormData,
  transAPIRequestDataToFormFooter,
  transformAPIRequestDataFooter,
  transfornSectionEntriesData,
} from './helpers/transform';
import { AddContentFormItem } from '../../../Models/common';
import FOOTER_FORM_SCHEMA from './helpers/constants';
import { isErrors } from '../../../Shared/utils/functions';

const initialState: AddContentFormItem = {
  file: [{ fileURL: '' }],
  title: '',
  errors: {},
};
const initialStateSections: AddContentFormItem = {
  title: '',
  content: '',
  errors: {},
};
const fieldTypes = {
  file: INPUT_TYPES.FILE_UPLOAD,
  title: INPUT_TYPES.TEXT,
};
const sectionsFieldType = {
  title: INPUT_TYPES.TEXT,
  content: INPUT_TYPES.TEXT,
};

const labels = {
  file: ' icon',
  title: ' URL',
};
const sectionsLabels = {
  title: ' Label',
  content: 'URL',
};
function Footer() {
  const [socialConnectContent, setSocialConnectContent] = useState<
    AddContentFormItem[]
  >([initialState]);
  const [section1Content, setSection1Content] = useState<AddContentFormItem[]>([
    initialState,
  ]);
  const [section2Content, setSection2Content] = useState<AddContentFormItem[]>([
    initialState,
  ]);
  const [section3Content, setSection3Content] = useState<AddContentFormItem[]>([
    initialState,
  ]);
  const [initialValues, setInitialValues] = useState({});
  const { data: content, refetch } = useGetContentQuery({});
  const [updateContent] = useUpdateContentMutation({});
  useEffect(() => {
    if (content?.data?.[CONTENT_ENUMS.FOOTER]) {
      // Set initial form values
      const initialFormValues = transAPIRequestDataToFormFooter(
        content.data[CONTENT_ENUMS.FOOTER]
      );
      setInitialValues(initialFormValues);
      // Extract and set socialConnectContent values
      const formGetData = content.data[CONTENT_ENUMS.FOOTER][
        CONTENT_ENUMS.SOCIAL_CONNECT
      ]?.map(({ imageURL, url }: { imageURL: string; url: string }) => ({
        title: String(url),
        file: [{ fileURL: String(imageURL) }] || [],
      }));

      const sectionEntries1 = transfornSectionEntriesData(
        content?.data?.[CONTENT_ENUMS.FOOTER],
        'sectionEntries1'
      );
      const sectionEntries2 = transfornSectionEntriesData(
        content?.data?.[CONTENT_ENUMS.FOOTER],
        'sectionEntries2'
      );
      const sectionEntries3 = transfornSectionEntriesData(
        content?.data?.[CONTENT_ENUMS.FOOTER],
        'sectionEntries3'
      );
      setSocialConnectContent(formGetData);
      setSection1Content(sectionEntries1);
      setSection2Content(sectionEntries2);
      setSection3Content(sectionEntries3);
    }
  }, [content]);
  const onSubmit = async (data: Record<string, unknown>) => {
    try {
      if (isErrors(socialConnectContent, setSocialConnectContent, labels))
        return;
      if (isErrors(section1Content, setSection1Content, sectionsLabels)) return;
      if (isErrors(section2Content, setSection2Content, sectionsLabels)) return;
      if (isErrors(section3Content, setSection3Content, sectionsLabels)) return;
      const formData = data as unknown as FooterFormData;
      const mappedRoadMap = socialConnectContent.map((item) => ({
        url: item.title || '',
        imageURL: item.file || [],
      }));
      const payload = {
        [CONTENT_ENUMS.FOOTER]: transformAPIRequestDataFooter(
          formData,
          mappedRoadMap,
          section1Content,
          section2Content,
          section3Content
        ),
      };
      await updateContent({
        payload,
        onSuccess: (res: { message: string }) => {
          toast.success(res.message);
          refetch();
        },
      });
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <CustomCardWrapper>
      <CustomForm
        formData={FOOTER_FORM_SCHEMA}
        id="contactUs-form"
        className="row"
        onSubmit={onSubmit}
        defaultValues={initialValues}
        preSubmitElement={
          <>
            <AddContentForm
              content={socialConnectContent || []}
              setContent={setSocialConnectContent}
              types={fieldTypes}
              labels={labels}
              initialState={initialState}
              title="social contact"
            />
            <AddContentForm
              content={section1Content || []}
              setContent={setSection1Content}
              types={sectionsFieldType}
              labels={sectionsLabels}
              initialState={initialStateSections}
              title="Section 1"
            />
            <AddContentForm
              content={section2Content || []}
              setContent={setSection2Content}
              types={sectionsFieldType}
              labels={sectionsLabels}
              initialState={initialStateSections}
              title="Section 2"
            />
            <AddContentForm
              content={section3Content || []}
              setContent={setSection3Content}
              types={sectionsFieldType}
              labels={sectionsLabels}
              initialState={initialStateSections}
              title="Section 3"
            />
          </>
        }
        submitText="Update Footer Content"
      />
    </CustomCardWrapper>
  );
}

export default Footer;
