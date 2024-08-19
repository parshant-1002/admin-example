import CustomDropDown from '../../../../Shared/components/CustomDropDown';
import { Delete, actions, edit } from '../../../../assets';
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
    {
      buttonLabel: 'Edit',
      buttonAction: () => handleEdit(row),
      icon: edit,
      className: 'btn44 btn btn-primary',
    },
    {
      buttonLabel: 'Delete',
      buttonAction: () => handleDelete(row),
      icon: Delete,
      className: 'btn44 btn btn-danger',
    },
  ];

  return <CustomDropDown toggleImage={actions} submenu={submenu} />;
}

export default ActionsDropdown;
