import CustomDropDown from '../../../../Shared/components/CustomDropDown';
import { actions } from '../../../../assets';
import { UsersResponsePayload } from '../../helpers/model';

interface ActionsDropdownProps {
  row: UsersResponsePayload; // Replace `any` with the appropriate type for `row`
  handleDelete: (row: UsersResponsePayload) => void; // Replace `any` with the appropriate type for `row`
  handleBlock: (row: UsersResponsePayload) => void; // Replace `any` with the appropriate type for `row`
  handleView: (row: UsersResponsePayload) => void;
}

function ActionsDropdown({
  row,
  handleDelete,
  handleBlock,
  handleView,
}: ActionsDropdownProps) {
  const submenu = [
    {
      buttonLabel: 'View',
      buttonAction: () => handleView(row),
      className: 'text-green',
    },
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
