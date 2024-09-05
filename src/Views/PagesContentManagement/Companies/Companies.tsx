import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { AddContentFormItem } from '../../../Models/common';
import {
  useGetContentQuery,
  useUpdateContentMutation,
} from '../../../Services/Api/module/pagescontent/index';
import CustomCardWrapper from '../../../Shared/components/CustomCardWrapper/CustomCardWrapper';
import AddContentForm from '../../../Shared/components/form/AddContentForm/AddContentForm';
import { CustomForm } from '../../../Shared/components/index';
import { CONTENT_ENUMS, INPUT_TYPES } from '../../../Shared/constants/index';
import { isErrors } from '../../../Shared/utils/functions';
import ERROR_MESSAGES from '../../../Shared/constants/messages';

const initialState: AddContentFormItem = {
  file: [{ fileURL: '', fileId: '' }],
  title: '',
  errors: {},
};

const fieldTypes = {
  file: INPUT_TYPES.FILE_UPLOAD,
  title: INPUT_TYPES.TEXT,
};

const labels = {
  file: 'icon',
  title: 'URL',
};

function Companies() {
  const [companiesData, setCompaniesData] = useState<AddContentFormItem[]>([
    initialState,
  ]);
  const { data: content, refetch } = useGetContentQuery({});
  const [updateContent] = useUpdateContentMutation({});
  useEffect(() => {
    if (content?.data?.[CONTENT_ENUMS.COMPANIES_SECTION]) {
      // Extract and set companiesData values
      const formGetData = content.data[
        CONTENT_ENUMS.COMPANIES_SECTION
      ]?.items?.map(
        ({
          title,
          url,
          fileId,
        }: {
          title: string;
          url: string;
          fileId: string;
        }) => ({
          title: String(title),
          file: [{ fileURL: String(url), fileId: String(fileId) }],
        })
      );
      setCompaniesData(formGetData);
    }
  }, [content]);
  const onSubmit = async (data: Record<string, unknown>) => {
    try {
      if (isErrors(companiesData, setCompaniesData, labels)) return;
      const mappedCompaniesData = companiesData.map((item) => ({
        title: item.title || '',
        url: item.file?.[0]?.fileURL,
      }));
      const payload = {
        [CONTENT_ENUMS.COMPANIES_SECTION]: {
          ...data,
          items: mappedCompaniesData,
        },
      };
      await updateContent({
        payload,
        onSuccess: (res: { message: string }) => {
          toast.success(res.message);
          refetch();
        },
      });
    } catch (error: unknown) {
      if (error instanceof Error) {
        toast.error(error.message);
      } else {
        toast.error(ERROR_MESSAGES().SOMETHING_WENT_WRONG);
      }
    }
  };

  return (
    <CustomCardWrapper>
      <CustomForm
        id="contactUs-form"
        onSubmit={onSubmit}
        formData={{
          isVisible: {
            type: INPUT_TYPES.SWITCH,
            label: 'Show/Hide Header Content',
            className: 'col-md-12 notifications',
          },
        }}
        defaultValues={{}}
        preSubmitElement={
          <AddContentForm
            content={companiesData || []}
            setContent={setCompaniesData}
            types={fieldTypes}
            title="Companies"
            labels={labels}
            initialState={initialState}
          />
        }
        submitText="Update Companies Content"
      />
    </CustomCardWrapper>
  );
}

export default Companies;
