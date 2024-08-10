import CustomDropDown from '../../../../Shared/components/CustomDropDown';
import { actions } from '../../../../assets';
import { UsersResponsePayload } from '../../helpers/model';

interface ActionsDropdownProps {
  row: UsersResponsePayload; // Replace `any` with the appropriate type for `row`
  handleDelete: (row: UsersResponsePayload) => void; // Replace `any` with the appropriate type for `row`
  handleBlock: (row: UsersResponsePayload) => void; // Replace `any` with the appropriate type for `row`
}

function ActionsDropdown({
  row,
  handleDelete,
  handleBlock,
}: ActionsDropdownProps) {
  const submenu = [
    {
      buttonLabel: row?.isBlocked ? 'UnBlock' : 'Block',
      buttonAction: () => handleBlock(row),
      className: row?.isBlocked ? 'text-green' : 'text-danger',
    },
    {
      buttonLabel: 'Delete',
      buttonAction: () => handleDelete(row),
      className: 'text-danger',
    },
  ];

  return <CustomDropDown toggleImage={actions} submenu={submenu} />;
}

export default ActionsDropdown;
