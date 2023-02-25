import PropTypes from 'prop-types';
import {  useState } from 'react';
import { ImageItem, ImageItemImage } from './ImageGalleryItem.styled';
import { Modal } from 'components/Modal/Modal';

export const ImageGalleryItem=(props)=>{
  const {tags,webformatURL,largeImageURL } = props;
const [showModal,setShowModal]= useState(false)
 const toogleModal = () => {
  setShowModal((state)=>{
    return !state})
  //     this.setState(state => ({ showModal: !state.showModal }));
    };
    
  return ( <>
    <ImageItem>
      <ImageItemImage src={webformatURL} onClick={toogleModal} alt={tags} />
    </ImageItem>
    {showModal && (
      <Modal
        toogModal={toogleModal}
        largeImageURL={largeImageURL}
        tags={tags}
      />
    )}
  </>)
}

// export class ImageGalleryItemOld extends Component {
//   state = {
//     showModal: false,
//   };

//   toogleModal = () => {
//     this.setState(state => ({ showModal: !state.showModal }));
//   };
//   render() {
//     const {tags,webformatURL,largeImageURL } = this.props;
//     const {showModal}=this.state
//     return (
//       <>
//         <ImageItem>
//           <ImageItemImage src={webformatURL} onClick={this.toogleModal} alt={tags} />
//         </ImageItem>
//         {showModal && (
//           <Modal
//             closeModal={this.toogleModal}
//             largeImageURL={largeImageURL}
//             tags={tags}
//           />
//         )}
//       </>
//     );
//   }
// }
ImageGalleryItem.propTypes = {
  tags: PropTypes.string.isRequired,
  webformatURL: PropTypes.string.isRequired,
  largeImageURL: PropTypes.string.isRequired,
};
