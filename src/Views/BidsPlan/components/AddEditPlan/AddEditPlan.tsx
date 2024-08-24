import { Dispatch, SetStateAction, useEffect, useMemo, useState } from 'react';
import CustomModal from '../../../../Shared/components/CustomModal';
import CustomForm from '../../../../Shared/components/form/CustomForm';
import { POPUPTYPES, STRINGS } from '../../../../Shared/constants';
import { PLAN_FORM_FIELDS, PLAN_SCHEMA } from '../../helpers/constants';
import { calculateAnnualPrice } from '../../helpers/utils';

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
  handleSubmit?: (
    data: Record<string, unknown>,
    setShowHotDealSpecificFields: Dispatch<SetStateAction<number>>
  ) => void;
}) {
  const [showHotDealSpecificFields, setShowHotDealSpecificFields] =
    useState<number>(0);

  const onSubmit = (data: Record<string, unknown>) => {
    handleSubmit(data, setShowHotDealSpecificFields);
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
        values?.[PLAN_FORM_FIELDS.BID_PLAN_TYPE] as {
          label: string;
          value: number;
        }
      )?.value
    );

    if (name === PLAN_FORM_FIELDS.BID_PLAN_TYPE) {
      setShowHotDealSpecificFields(
        (value as { label: string; value: number })?.value
      );
    }
    if (
      name === PLAN_FORM_FIELDS.DISCOUNT_PERCENTAGE ||
      name === PLAN_FORM_FIELDS.MONTHLY_PRICE
    ) {
      const calculatedValue = calculateAnnualPrice(
        Number(
          (values as Record<string, unknown>)?.[
            PLAN_FORM_FIELDS.MONTHLY_PRICE
          ] || 0
        ),
        Number(
          (values as Record<string, unknown>)?.[
            PLAN_FORM_FIELDS.DISCOUNT_PERCENTAGE
          ] || 0
        )
      );
      setValue(PLAN_FORM_FIELDS.YEARLY_PRICE, calculatedValue);
    }
    // If discount percentage is changed, calculate discounted price
    // if (name === PLAN_FORM_FIELDS.DISCOUNT_PERCENTAGE) {
    //   const calculatedValue = calculateDiscountedPrice(
    //     Number((values as Record<string, unknown>)?.price || 0),
    //     Number(value || 0)
    //   );
    //   setValue(PLAN_FORM_FIELDS.DISCOUNT_PRICE, calculatedValue);
    // }
  };

  const formSchema = useMemo(() => {
    return PLAN_SCHEMA(showHotDealSpecificFields);
  }, [showHotDealSpecificFields]);

  useEffect(() => {
    if (
      initialValues &&
      (initialValues[PLAN_FORM_FIELDS.BID_PLAN_TYPE] as { value: number })
        ?.value
    ) {
      setShowHotDealSpecificFields(
        initialValues &&
          (initialValues[PLAN_FORM_FIELDS.BID_PLAN_TYPE] as { value: number })
            ?.value
      );
    }
  }, [initialValues]);

  return (
    <CustomModal
      title={
        type === POPUPTYPES.EDIT ? STRINGS.EDIT_BID_PLAN : STRINGS.ADD_BID_PLAN
      }
      show={open}
      onClose={() => {
        onClose();
        setShowHotDealSpecificFields(0);
      }}
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
