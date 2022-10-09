// imports for types
import { Images } from ".prisma/client";
//defining types for props
type imgs = Images[];

//props passed down in gallery components
interface galleryProps {
  allImages: imgs,
  setAllImages?: React.Dispatch<React.SetStateAction<imgs | null>>
}


export {
  imgs,
  galleryProps
}