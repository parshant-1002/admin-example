import { IMAGE_FILE_TYPES, INPUT_TYPES } from "../../../../Shared/constants/index";
import FORM_VALIDATION_MESSAGES from "../../../../Shared/constants/validationMessages";


export const FAQ_CONTENT_FORM_SCHEMA = {
    companyLogo:{
        type: INPUT_TYPES.FILE,
        label: 'Images',
        accept: IMAGE_FILE_TYPES,
        className: 'col-md-12',
        placeholder: 'Images',
        schema: {
            required: FORM_VALIDATION_MESSAGES().REQUIRED,
        }
    },
    title: {
        type: INPUT_TYPES.TEXT,
        label: 'Faqs Title',
        className: 'col-md-12',
        placeholder: 'Title',
        schema: {
            required: FORM_VALIDATION_MESSAGES().REQUIRED,
            minLength: {
                value: 3,
                message: FORM_VALIDATION_MESSAGES(3).MIN_LENGTH
            }
        }
    },
    description: {
        type: INPUT_TYPES.TEXT,
        label: 'Faqs Description',
        className: 'col-md-12',
        placeholder: 'Faqs Description',
        schema: {
            required: FORM_VALIDATION_MESSAGES().REQUIRED,
            minLength: {
                value: 3,
                message: FORM_VALIDATION_MESSAGES(3).MIN_LENGTH
            }
        },
        addHorizontalLine: true,
    },
    isVisible: {
        type: INPUT_TYPES.SWITCH,
        label: 'Show/Hide Partners Content',
        className: 'col-md-12',
    }
};