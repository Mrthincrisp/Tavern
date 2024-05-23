// import React, { useState } from 'react';
// import PropTypes from 'prop-types';

// import { Button, Modal } from 'react-bootstrap';

// export default function SpellModal({ show, handleClose, charObj }) {
//   const [show, setShow] = useState(false);

//   const handleClose = () => setShow(false);
//   const handleShow = () => setShow(true);

//   return (
//     <>
//       <Button variant="primary" onClick={handleShow}>
//         Launch demo modal
//       </Button>

//       <Modal show={show} onHide={handleClose}>
//         <Modal.Header closeButton>
//           <Modal.Title>Modal heading</Modal.Title>
//         </Modal.Header>
//         <Modal.Body>{obj.description}</Modal.Body>
//         <Modal.Footer>
//           <Button variant="secondary" onClick={handleClose}>
//             Close
//           </Button>
//           <Button variant="primary" onClick={handleClose}>
//             Save Changes
//           </Button>
//         </Modal.Footer>
//       </Modal>
//     </>
//   );
// }

// SpellModal.propTypes = {
//   obj: PropTypes.shaape({
//     description: PropTypes.string,
//   }).isRequired,
// };
