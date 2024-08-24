import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { AddContentFormItem } from '../../../Models/common';
import {
  useGetContentQuery,
  useUpdateContentMutation,
} from '../../../Services/Api/module/content/index';
import CustomCardWrapper from '../../../Shared/components/CustomCardWrapper/CustomCardWrapper';
import AddContentForm from '../../../Shared/components/form/AddContentForm/AddContentForm';
import { CustomForm } from '../../../Shared/components/index';
import { CONTENT_ENUMS, INPUT_TYPES } from '../../../Shared/constants/index';
import { isErrors } from '../../../Shared/utils/functions';

const initialState: AddContentFormItem = {
  file: [{ fileURL: '' }],
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
      const formGetData = content.data[CONTENT_ENUMS.COMPANIES_SECTION]?.map(
        ({ title, url }: { title: string; url: string }) => ({
          title: String(title),
          file: [{ fileURL: String(url) }],
        })
      );
      setCompaniesData(formGetData);
    }
  }, [content]);
  const onSubmit = async () => {
    if (!isErrors(companiesData, setCompaniesData, labels)) return;
    const mappedCompaniesData = companiesData.map((item) => ({
      title: item.title || '',
      url: item.file?.[0]?.fileURL,
    }));
    const payload = { [CONTENT_ENUMS.COMPANIES_SECTION]: mappedCompaniesData };
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
        id="contactUs-form"
        onSubmit={onSubmit}
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
