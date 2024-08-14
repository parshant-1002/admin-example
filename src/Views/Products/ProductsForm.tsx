// libs
import { SyntheticEvent, useMemo } from 'react';

// components
import { toast } from 'react-toastify';
import {
  useAddProductMutation,
  useEditProductMutation,
} from '../../Services/Api/module/products';
import CustomForm from '../../Shared/components/form/CustomForm';

// consts
import { ErrorResponse } from '../../Models/Apis/Error';
import { useGetCategorysQuery } from '../../Services/Api/module/category';
import { BUTTON_LABELS } from '../../Shared/constants';
import ERROR_MESSAGES from '../../Shared/constants/messages';
import { addBaseUrl } from '../../Shared/utils/functions';
import { PRODUCT_FORM_SCHEMA } from './helpers/constants';
import { Category, ProductPayload } from './helpers/model';

interface ProductFormTypes {
  initialData: object | null;
  isEdit: boolean;
  onAdd?: () => void;
  onEdit?: () => void;
}
// component
export default function ProductForm({
  isEdit = false,
  initialData = {},
  onEdit = () => {},
  onAdd = () => {},
}: ProductFormTypes) {
  // hooks
  const [addProduct] = useAddProductMutation();
  const [editProduct] = useEditProductMutation();
  const { data: categoryList } = useGetCategorysQuery({ skip: 0 });
  const cateroryOptions = useMemo(
    () =>
      categoryList?.data?.map((category: Category) => ({
        value: category?._id,
        label: category?.name,
      })),
    [categoryList?.data]
  );
  //   const dispatch = useDispatch();
  const onSuccess = (res: { message: string }) => {
    toast.success(res?.message);
    onAdd();
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
        images: productData?.images?.map((image) => ({
          url: addBaseUrl(image?.fileURL || image?.url),
          title: image?.fileName || image?.title,
        })),
        // status: productData?.status?.value,
        categoryIds: productData?.category?.map((category) => category?.value),
      };
      if (isEdit) {
        // payload.id = initialData?._id;
        const editPayload = { ...payload, productId: data?._id };
        await editProduct({
          payload: editPayload,
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
  return (
    <CustomForm
      id="products"
      className="row"
      formData={PRODUCT_FORM_SCHEMA(cateroryOptions)}
      onSubmit={onSubmit}
      defaultValues={
        initialData as unknown as Record<string, unknown> | undefined
      }
      submitText={isEdit ? BUTTON_LABELS.EDIT : BUTTON_LABELS.ADD}
    />
  );
}
