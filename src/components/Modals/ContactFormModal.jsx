import React from "react";
import { PropTypes } from "prop-types";
import { withMutation, create } from "cozy-client";
import Modal, { ModalTitle, ModalDescription } from "cozy-ui/react/Modal";
import ContactForm from "../ContactCard/ContactForm";

const ContactFormModal = ({
  onClose,
  title,
  createContact,
  onCreateContact
}) => (
  <Modal
    overflowHidden={true}
    dismissAction={onClose}
    into="body"
    size="xlarge"
  >
    <ModalTitle>{title}</ModalTitle>
    <ModalDescription className="u-mt-half">
      <ContactForm
        onSubmit={contact =>
          createContact({ ...contact, _type: "io.cozy.contacts" }).then(resp =>
            onCreateContact(resp.data[0])
          )
        }
        onCancel={onClose}
      />
    </ModalDescription>
  </Modal>
);
ContactFormModal.propTypes = {
  onClose: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired,
  createContact: PropTypes.func.isRequired,
  onCreateContact: PropTypes.func.isRequired
};

export default withMutation(create, {
  name: "createContact",
  updateQueries: {
    allContacts: (previousData, result) => [...previousData, result.data[0]]
  }
})(ContactFormModal);
