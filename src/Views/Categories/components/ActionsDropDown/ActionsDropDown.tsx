import CustomDropDown from '../../../../Shared/components/CustomDropDown';
import { actions } from '../../../../assets';
import { CategoryResponsePayload } from '../../helpers/model';

interface ActionsDropdownProps {
  row: CategoryResponsePayload; // Replace `any` with the appropriate type for `row`
  handleEdit: (row: CategoryResponsePayload) => void; // Replace `CategoryResponsePayload` with the appropriate type for `row`
  handleDelete: (row: CategoryResponsePayload) => void; // Replace `any` with the appropriate type for `row`
}

function ActionsDropdown({
  row,
  handleEdit,
  handleDelete,
}: ActionsDropdownProps) {
  const submenu = [
    { buttonLabel: 'Edit', buttonAction: () => handleEdit(row) },
    {
      buttonLabel: 'Delete',
      buttonAction: () => handleDelete(row),
      className: 'text-danger',
    },
  ];

  return <CustomDropDown toggleImage={actions} submenu={submenu} />;
}

export default ActionsDropdown;
