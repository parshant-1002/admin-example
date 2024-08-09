// libs
import { SyntheticEvent } from 'react';
import { useNavigate } from 'react-router-dom';

// components
import { toast } from 'react-toastify';
import {
  useAddProductMutation,
  useEditProductMutation,
} from '../../Services/Api/module/products';
import CustomCardWrapper from '../../Shared/components/CustomCardWrapper';
import CustomForm from '../../Shared/components/form/CustomForm';

// consts
import { ErrorResponse } from '../../Models/Apis/Error';
import { BUTTON_LABELS, ROUTES } from '../../Shared/constants';
import ERROR_MESSAGES from '../../Shared/constants/messages';
import { ADD_ON_FORM_SCHEMA } from './helpers/constants';
import { ProductPayload } from './helpers/model';

interface ProductAddTypes {
  initialData: object | null;
  isEdit: boolean;
  onEdit?: () => void;
}
// component
export default function ProductAdd({
  isEdit = false,
  initialData = {},
  onEdit = () => {},
}: ProductAddTypes) {
  // hooks
  console.log('🚀 ~ initialData:', initialData);
  const [addProduct] = useAddProductMutation();
  const [editProduct] = useEditProductMutation();
  //   const dispatch = useDispatch();
  const navigate = useNavigate();
  const onSuccess = (res: { message: string }) => {
    toast.success(res?.message);
    navigate(ROUTES.PRODUCTS_LIST);
  };
  const onFailure = (error: ErrorResponse) => {
    toast.success(error?.data?.message);
  };
  const onSubmit = async (
    data: Record<string, unknown>,
    event: SyntheticEvent,
    reset: () => void
  ) => {
    event.preventDefault();
    try {
      const productData = data as unknown as ProductPayload;
      const payload = {
        title: productData?.title,
        description: productData?.description,
        price: productData?.price,
        stock: productData?.stock,
        images: [
          {
            url: 'https://m.media-amazon.com/images/I/71XsNC0QW+L._AC_SY550_.jpg',
            title: 'pant',
          },
          {
            url: 'https://m.media-amazon.com/images/I/71XsNC0QW+L._AC_SY550_.jpg',
            title: 'pant',
          },
          {
            url: 'https://m.media-amazon.com/images/I/71XsNC0QW+L._AC_SY550_.jpg',
            title: 'pant',
          },
          {
            url: 'https://m.media-amazon.com/images/I/71XsNC0QW+L._AC_SY550_.jpg',
            title: 'pant',
          },
        ],
        // status: productData?.status?.value,
        categoryIds: [productData?.category?.value],
      };
      if (isEdit) {
        // payload.id = initialData?._id;
        await editProduct({
          payload,
          onSuccess: (res: { message: string }) => {
            onSuccess(res);
            onEdit();
            reset();
          },
          onFailure,
        });
        return;
      }
      await addProduct({
        payload,
        onSuccess,
        onFailure,
      });
    } catch (error: unknown) {
      if (error instanceof Error) {
        toast.error(error.message);
      } else {
        toast.error(ERROR_MESSAGES().SOMETHING_WENT_WRONG);
      }
    }
  };
  return !isEdit ? (
    <CustomCardWrapper>
      <CustomForm
        id="products"
        className="row"
        formData={ADD_ON_FORM_SCHEMA}
        onSubmit={onSubmit}
        defaultValues={
          initialData as unknown as Record<string, unknown> | undefined
        }
        submitText={isEdit ? BUTTON_LABELS.EDIT : BUTTON_LABELS.ADD}
      />
    </CustomCardWrapper>
  ) : (
    <CustomForm
      id="products"
      className="row"
      formData={ADD_ON_FORM_SCHEMA}
      onSubmit={onSubmit}
      defaultValues={
        initialData as unknown as Record<string, unknown> | undefined
      }
      submitText={isEdit ? BUTTON_LABELS.EDIT : BUTTON_LABELS.ADD}
    />
  );
}
