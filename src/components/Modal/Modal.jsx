import { ModalBox, Overlay } from './Modal.styled';
import { createPortal } from 'react-dom';
import { useEffect } from 'react';
import { PropTypes } from 'prop-types';
const modalRoot = document.querySelector('#modal-root');

export const Modal = ({ largeImageURL, tags, toogModal }) => {
  const closeKEyDown = el => {
    if (el.code === 'Escape') {
      toogModal();
      return;
    }
  };
  useEffect(() => {
    window.addEventListener('keydown', closeKEyDown);
    return () => {
      window.removeEventListener('keydown', closeKEyDown);
    };
  });

  const closeModal = element => {
    if (element.currentTarget === element.target) {
      toogModal();
      return;
    }
  };

  return createPortal(
    <Overlay onClick={closeModal}>
      <ModalBox>
        <img src={largeImageURL} alt={tags} />
      </ModalBox>
    </Overlay>,
    modalRoot
  );
};

// export class ModalOld extends Component {
//   componentDidMount() {
//     window.addEventListener('keydown', this.closeKEyDown);
//   }
//   componentWillUnmount() {
//     window.removeEventListener('keydown', this.closeKEyDown);
//   }
//   closeKEyDown = el => {
//     if (el.code === 'Escape') {
//       this.props.closeModal();
//       return;
//     }
//   };
//   closeModal = element => {
//     console.log(element);
//     console.log(element.currentTarget);
//     if (element.currentTarget === element.target) {
//       console.log(element.currentTarget);
//       console.log(element.target);
//       this.props.closeModal();
//       return;
//     }
//   };

//   render() {
//     const { largeImageURL, tags } = this.props;
//     return createPortal(
//       <Overlay onClick={this.closeModal}>
//         <ModalBox>
//           <img src={largeImageURL} alt={tags} />
//         </ModalBox>
//       </Overlay>,
//       modalRoot
//     );
//   }
// }
Modal.propTypes = {
  largeImageURL: PropTypes.string.isRequired,
  tags: PropTypes.string.isRequired,
};
