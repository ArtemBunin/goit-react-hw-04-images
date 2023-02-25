import { getImage } from 'api/api';
import { useState,useEffect } from 'react';
import { SearchBar } from 'components/Searchbar/Searchbar';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { Box } from './App.styled';
import { Loader } from './Loader/Loader';
import { Button } from './Button/Button';

export const App=()=>{
const [isloading,setIsloading]=useState(false);
const [image,setImage]=useState([]);
const [query,setQuery]=useState('');
const [totalHits,setTotalHits]=useState(null);
const [page,setPage]= useState(1)
const [error,setError]=useState(null)
useEffect(()=>{
 
  const fetch =async()=>{
    if(query!==''){ setIsloading(true)
   
try {
  const res = await getImage(query, page);
  if (!res.hits.length) {
    alert('Шукай щось інше!');
  }
  setImage((prev)=>[...prev,...res.hits])
  setTotalHits(res.totalHits)
  setIsloading(false);
} catch (error) {
  setError(error );
}
  }}
fetch()
},[page,query])

const handleFormSubmit = query => {
  setImage([])
  setTotalHits(null)
  setIsloading(false);
  setPage(1)
  setQuery(query)
  setError(null)

};
const LoadMoreImg = () => {
  setPage((prev)=>prev+1)

};
  return(<Box>
    <SearchBar onSubmit={handleFormSubmit} isSubmiting={isloading} />
    {error && <p>.....Картинка не знайдена</p>}
    {isloading && <Loader />}
    {image && <ImageGallery imageItem={image} />}
    {totalHits > 12 && <Button onClick={LoadMoreImg} />}
  </Box>)
}

// export class AppOld extends Component {
//   state = {
//     isloading: false,
//     image: [],
//     error: null,
//     query: '',
//     totalHits: null,
//     page: 1,
//   };
//   async componentDidUpdate(prevProps, prevState) {
//     const { query, page } = this.state;
//     if (prevState.page !== page || prevState.query !== this.state.query) {
//       this.setState({ isloading: true });

//       try {
//         const res = await getImage(query, page);
//         if (!res.hits.length) {
//           alert('Шукай щось інше!');
//         }
//         this.setState(state => ({
//           image: [...this.state.image, ...res.hits],
//           totalHits: res.totalHits,
//           isloading: false,
//         }));
//       } catch (error) {
//         this.setState({ error });
//       }
//     }
//   }
//   handleFormSubmit = query => {
//     this.setState({
//       query,
//       image: [],
//       page: 1,
//       totalHits: null,
//       isloading: false,
//       error: null,
//     });
//   };

//   LoadMoreImg = () => {
//     this.setState(prevState => ({ page: prevState.page + 1 }));
//   };

//   render() {
//     const { image, isloading, error, totalHits,} = this.state;
//     return (
//       <Box>
//         <SearchBar onSubmit={this.handleFormSubmit} isSubmiting={isloading} />
//         {error && <p>.....Картинка не знайдена</p>}
//         {isloading && <Loader />}
//         {image && <ImageGallery imageItem={image} />}
//         {totalHits > 12 && <Button onClick={this.LoadMoreImg} />}
//       </Box>
//     );
//   }
// }
