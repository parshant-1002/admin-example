// libs
import { SyntheticEvent } from 'react';

// components
import { toast } from 'react-toastify';
import { useDispatch } from 'react-redux';
import {
  useAddProductMutation,
  useEditProductMutation,
} from '../../Services/Api/module/products';
import CustomForm from '../../Shared/components/form/CustomForm';

// consts
import { BUTTON_LABELS } from '../../Shared/constants';
import ERROR_MESSAGES from '../../Shared/constants/messages';
import { addBaseUrl } from '../../Shared/utils/functions';
import { updateUploadedImages } from '../../Store/UploadedImages';
import { PRODUCT_FORM_SCHEMA } from './helpers/constants';
import { ProductPayload, SelectOption } from './helpers/model';

interface ProductFormTypes {
  initialData: { _id?: string } | null;
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
  // hooks
  const dispatch = useDispatch();
  const [addProduct] = useAddProductMutation();
  const [editProduct] = useEditProductMutation();

  //   const dispatch = useDispatch();
  const onSuccess = (res: { message: string }) => {
    toast.success(res?.message);
    onAdd();
    dispatch(updateUploadedImages([]));
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
          fileId: image?.fileId || image?._id,
          assigned: image?.assigned,
        })),
        specifications: {
          registrationNumber: productData?.registrationNumber,
          modelYear: productData?.modelYear,
          paint: productData?.paint,
          fuel: productData?.fuel?.value,
          motor: productData?.motor,
          gearbox: productData?.gearbox?.value,
          gearCount: productData?.gearCount,
          seatCount: productData?.seatCount,
          security: productData?.security,
          comfort: productData?.comfort,
          appearance: productData?.appearance,
        },
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
      formData={PRODUCT_FORM_SCHEMA(categoryOptions, initialData?._id)}
      onSubmit={onSubmit}
      defaultValues={
        initialData as unknown as Record<string, unknown> | undefined
      }
      submitText={isEdit ? BUTTON_LABELS.EDIT : BUTTON_LABELS.ADD}
    />
  );
}
