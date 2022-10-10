// imports for types
import { Images } from ".prisma/client";
//defining types for props
type imageArr = Images[];
// when passing down individual image
interface image {
  image: Images
}

//props passed down in gallery components
interface galleryProps {
  allImages: imageArr,
  setAllImages?: React.Dispatch<React.SetStateAction<imageArr | null>>,
}



export {
  imageArr,
  galleryProps,
  image
}