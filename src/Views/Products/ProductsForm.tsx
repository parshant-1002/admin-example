// libs
import { SyntheticEvent } from 'react';

// components
import { toast } from 'react-toastify';
import {
  useAddProductMutation,
  useEditProductMutation,
} from '../../Services/Api/module/products';
import CustomForm from '../../Shared/components/form/CustomForm';

// consts
import { BUTTON_LABELS } from '../../Shared/constants';
import ERROR_MESSAGES from '../../Shared/constants/messages';
import { addBaseUrl } from '../../Shared/utils/functions';
import { PRODUCT_FORM_SCHEMA } from './helpers/constants';
import { ProductPayload, SelectOption } from './helpers/model';

interface ProductFormTypes {
  initialData: object | null;
  isEdit: boolean;
  onAdd?: () => void;
  onEdit?: () => void;
  categoryOptions: SelectOption[];
}
// component
export default function ProductForm({
  isEdit = false,
  initialData = {},
  onEdit = () => {},
  onAdd = () => {},
  categoryOptions = [],
}: ProductFormTypes) {
  const handleStateChange = ({
    name,
    value,
    setValue,
  }: {
    name: string;
    value: unknown;
    type: string;
    setValue: (name: string, value: unknown) => void;
    values?: Record<string, unknown>;
  }) => {
    const string = value as unknown as string;
    const validChars = ['title', 'description'];

    if (validChars?.includes(name)) {
      setValue(name, string?.trimStart());
    } else {
      setValue(name, value);
    }
  };
  // hooks
  const [addProduct] = useAddProductMutation();
  const [editProduct] = useEditProductMutation();

  //   const dispatch = useDispatch();
  const onSuccess = (res: { message: string }) => {
    toast.success(res?.message);
    onAdd();
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
          url: addBaseUrl(image?.fileURL || image?.url || ''),
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
        });
        return;
      }
      await addProduct({
        payload,
        onSuccess,
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
      formData={PRODUCT_FORM_SCHEMA(categoryOptions)}
      onSubmit={onSubmit}
      handleStateDataChange={handleStateChange}
      defaultValues={
        initialData as unknown as Record<string, unknown> | undefined
      }
      submitText={isEdit ? BUTTON_LABELS.EDIT : BUTTON_LABELS.ADD}
    />
  );
}
