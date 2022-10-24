// imports for types
import { Images, User } from ".prisma/client";
//defining types for props
type imageArr = (Images & { user: User;})[];
// when passing down individual image
interface image {
  image: Images & { user: User;}
}

//props passed down in gallery components
interface galleryProps {
  allImages: (Images & { user: User;})[],
  setAllImages?: React.Dispatch<React.SetStateAction<imageArr | null>>,
}



export {
  imageArr,
  galleryProps,
  image
}