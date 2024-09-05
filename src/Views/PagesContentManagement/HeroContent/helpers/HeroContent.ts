import { INPUT_TYPES } from '../../../../Shared/constants/index';

const HERO_CONTENT_FORM_SCHEMA = {
  heroImageIsVisible: {
    type: INPUT_TYPES.SWITCH,
    label: 'Show/Hide Hero Content',
    className: 'col-md-12 notifications',
  },
};

export default HERO_CONTENT_FORM_SCHEMA;
