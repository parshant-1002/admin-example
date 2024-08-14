import { useEffect, useMemo, useState } from 'react';
import CustomModal from '../../../../Shared/components/CustomModal';
import { PLAN_FORM_FIELDS, PLAN_SCHEMA } from '../../helpers/constants';
import CustomForm from '../../../../Shared/components/form/CustomForm';
import {
  BID_PLAN_TYPES,
  POPUPTYPES,
  STRINGS,
} from '../../../../Shared/constants';
import { calculateDiscountedPrice } from '../../helpers/utils';

interface HandleStateDataChangeProps {
  name: string;
  value: Record<string, unknown> | unknown;
  type: string;
  setValue: (name: string, value: unknown) => void;
  values?: Record<string, unknown>;
}

function AddEditPlan({
  open = false,
  onClose = () => {},
  type,
  initialValues = {},
  handleSubmit = () => {},
}: {
  open: boolean;
  onClose: () => void;
  type: POPUPTYPES;
  initialValues?: Record<string, unknown> | null;
  handleSubmit?: (data: Record<string, unknown>) => void;
}) {
  const [showHotDealSpecificFields, setShowHotDealSpecificFields] =
    useState<boolean>(false);

  const onSubmit = (data: Record<string, unknown>) => {
    handleSubmit(data);
  };

  const handleStateDataChange = ({
    name,
    value,
    setValue,
    values,
  }: HandleStateDataChangeProps) => {
    // If hot deal is selected, show hot deal specific fields
    setShowHotDealSpecificFields(
      (
        values?.[PLAN_FORM_FIELDS.HOT_DEAL] as {
          label: string;
          value: number;
        }
      )?.value === BID_PLAN_TYPES.HOT_DEAL
    );

    if (
      name === PLAN_FORM_FIELDS.HOT_DEAL &&
      (value as { label: string; value: number })?.value ===
        BID_PLAN_TYPES.HOT_DEAL
    ) {
      setShowHotDealSpecificFields(true);
    }

    // If discount percentage is changed, calculate discounted price
    if (name === PLAN_FORM_FIELDS.DISCOUNT_PERCENTAGE) {
      const calculatedValue = calculateDiscountedPrice(
        Number((values as Record<string, unknown>)?.price || 0),
        Number(value || 0)
      );
      setValue(PLAN_FORM_FIELDS.DISCOUNT_PRICE, calculatedValue);
    }
  };

  const formSchema = useMemo(() => {
    return PLAN_SCHEMA(showHotDealSpecificFields);
  }, [showHotDealSpecificFields]);

  useEffect(() => {
    if (
      initialValues &&
      (initialValues[PLAN_FORM_FIELDS.HOT_DEAL] as { value: number })?.value ===
        BID_PLAN_TYPES.HOT_DEAL
    ) {
      setShowHotDealSpecificFields(true);
    }
  }, [initialValues]);

  return (
    <CustomModal
      title={
        type === POPUPTYPES.EDIT
          ? STRINGS.EDIT_REFERRAL_PACK
          : STRINGS.ADD_REFERRAL_PACK
      }
      show={open}
      onClose={onClose}
    >
      <CustomForm
        id="planForm"
        className="row p-4"
        formData={formSchema}
        onSubmit={onSubmit}
        defaultValues={
          initialValues
            ? (initialValues as unknown as Record<string, unknown> | undefined)
            : {}
        }
        submitText={type === POPUPTYPES.EDIT ? STRINGS.UPDATE : STRINGS.ADD}
        handleStateDataChange={handleStateDataChange}
      />
    </CustomModal>
  );
}

export default AddEditPlan;
