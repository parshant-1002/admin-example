import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import {
  useGetContentQuery,
  useUpdateContentMutation,
} from '../../../Services/Api/module/pagescontent/index';
import CustomCardWrapper from '../../../Shared/components/CustomCardWrapper/CustomCardWrapper';
import { CustomForm } from '../../../Shared/components/index';
import { CONTENT_ENUMS, STRINGS } from '../../../Shared/constants/index';
import SPECIFICATIONS_FORM_SCHEMA from './helpers/constants';
import {
  SpecificationsFormData,
  transAPIRequestDataToFormSpecifications,
  transformAPIRequestDataSpecifications,
} from './helpers/transform';

function Specifications() {
  const [initialValues, setInitialValues] = useState({});
  const { data: content, refetch } = useGetContentQuery({});
  const [updateContent] = useUpdateContentMutation({});

  useEffect(() => {
    if (content?.data?.[CONTENT_ENUMS.AUCTION_PAGE]) {
      // Set initial form values
      const initialFormValues = transAPIRequestDataToFormSpecifications(
        content.data[CONTENT_ENUMS.AUCTION_PAGE]
      );
      setInitialValues(initialFormValues);
    }
  }, [content]);

  const onSubmit = async (data: Record<string, unknown>) => {
    const formData = data as unknown as SpecificationsFormData;
    const payload = {
      [CONTENT_ENUMS.AUCTION_PAGE]:
        transformAPIRequestDataSpecifications(formData),
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
        formData={SPECIFICATIONS_FORM_SCHEMA}
        className="row"
        id="specifications-form"
        onSubmit={onSubmit}
        defaultValues={initialValues}
        submitText={STRINGS.UPDATE_SPECIFICATIONS}
      />
    </CustomCardWrapper>
  );
}

export default Specifications;
