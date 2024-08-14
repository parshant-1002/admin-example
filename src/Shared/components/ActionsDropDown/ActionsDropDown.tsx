import CustomDropDown from '../CustomDropDown';
import { actions } from '../../../assets';

interface ActionsDropdownProps<T> {
  row: T;
  handleEdit: (row: T) => void;
  handleDelete: (row: T) => void;
}

function ActionsDropdown<T>({
  row,
  handleEdit,
  handleDelete,
}: ActionsDropdownProps<T>) {
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
